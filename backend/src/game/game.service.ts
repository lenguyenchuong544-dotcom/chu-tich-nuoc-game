import { Injectable } from '@nestjs/common';
import { DECISION_CARDS, GAME_ENDINGS } from '../data/cards';

export interface PlayerSession {
  id: string;
  name: string;
  studentId: string;
  socketId?: string;
  currentTurn: number;
  maxTurns: number;
  stats: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
  knowledgeScore: number;
  crisesSolved: number;
  status: 'PLAYING' | 'GAMEOVER' | 'COMPLETED';
  endingId?: string;
  endingTitle?: string;
  rankTitle?: string;
  totalScore: number;
  flags: Record<string, any>;
  history: Array<{
    turn: number;
    cardId: number;
    choice: 'left' | 'right';
    effects: { politics: number; economy: number; people: number; law: number };
    knowledgeDelta?: number;
    timestamp: number;
  }>;
  lastActiveAt: number;
  joinedAt: number;
}

@Injectable()
export class GameService {
  private players: Map<string, PlayerSession> = new Map();
  private maxTurnsPerGame = 30;

  joinGame(name: string, studentId: string, socketId?: string): PlayerSession {
    const cleanName = (name || 'Chủ tịch danh dự').trim();
    const cleanStudentId = (studentId || 'SV' + Math.floor(1000 + Math.random() * 9000)).trim();
    
    // Check if player with same studentId exists
    let existingId: string | null = null;
    for (const [id, p] of this.players.entries()) {
      if (p.studentId.toLowerCase() === cleanStudentId.toLowerCase()) {
        existingId = id;
        break;
      }
    }

    if (existingId) {
      const existing = this.players.get(existingId)!;
      existing.socketId = socketId || existing.socketId;
      existing.name = cleanName;
      existing.lastActiveAt = Date.now();
      return existing;
    }

    const id = 'pres_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
    const session: PlayerSession = {
      id,
      name: cleanName,
      studentId: cleanStudentId,
      socketId,
      currentTurn: 0,
      maxTurns: this.maxTurnsPerGame,
      stats: {
        politics: 50,
        economy: 50,
        people: 50,
        law: 50,
      },
      knowledgeScore: 50,
      crisesSolved: 0,
      status: 'PLAYING',
      totalScore: 50,
      flags: {},
      history: [],
      lastActiveAt: Date.now(),
      joinedAt: Date.now(),
    };

    this.players.set(id, session);
    return session;
  }

  submitAction(
    playerId: string,
    payload: {
      turn: number;
      cardId: number;
      choice: 'left' | 'right';
      effects: { politics: number; economy: number; people: number; law: number };
      knowledgeDelta?: number;
      setFlags?: Record<string, any>;
      newStats?: { politics: number; economy: number; people: number; law: number };
      newKnowledgeScore?: number;
    },
  ): PlayerSession | null {
    const player = this.players.get(playerId);
    if (!player) return null;

    player.currentTurn = payload.turn;
    player.lastActiveAt = Date.now();

    if (payload.newStats) {
      player.stats = {
        politics: Math.max(0, Math.min(100, payload.newStats.politics)),
        economy: Math.max(0, Math.min(100, payload.newStats.economy)),
        people: Math.max(0, Math.min(100, payload.newStats.people)),
        law: Math.max(0, Math.min(100, payload.newStats.law)),
      };
    } else {
      player.stats.politics = Math.max(0, Math.min(100, player.stats.politics + (payload.effects.politics || 0)));
      player.stats.economy = Math.max(0, Math.min(100, player.stats.economy + (payload.effects.economy || 0)));
      player.stats.people = Math.max(0, Math.min(100, player.stats.people + (payload.effects.people || 0)));
      player.stats.law = Math.max(0, Math.min(100, player.stats.law + (payload.effects.law || 0)));
    }

    if (typeof payload.newKnowledgeScore === 'number') {
      player.knowledgeScore = Math.max(0, payload.newKnowledgeScore);
    } else if (payload.knowledgeDelta) {
      player.knowledgeScore = Math.max(0, player.knowledgeScore + payload.knowledgeDelta);
    }

    if (payload.setFlags) {
      player.flags = { ...player.flags, ...payload.setFlags };
    }

    const card = DECISION_CARDS.find((c) => c.id === payload.cardId);
    if (card?.isCrisis) {
      player.crisesSolved += 1;
    }

    player.history.push({
      turn: payload.turn,
      cardId: payload.cardId,
      choice: payload.choice,
      effects: payload.effects,
      knowledgeDelta: payload.knowledgeDelta,
      timestamp: Date.now(),
    });

    // Check game over condition
    if (
      player.stats.politics <= 0 ||
      player.stats.economy <= 0 ||
      player.stats.people <= 0 ||
      player.stats.law <= 0
    ) {
      player.status = 'GAMEOVER';
      let endingId = 'ENDING_CRISIS_POLITICS';
      if (player.stats.politics <= 0) endingId = 'ENDING_CRISIS_POLITICS';
      else if (player.stats.economy <= 0) endingId = 'ENDING_CRISIS_ECONOMY';
      else if (player.stats.people <= 0) endingId = 'ENDING_CRISIS_PEOPLE';
      else if (player.stats.law <= 0) endingId = 'ENDING_CRISIS_LAW';

      const ending = GAME_ENDINGS.find((e) => e.id === endingId);
      player.endingId = endingId;
      player.endingTitle = ending?.title || 'GAME OVER';
      player.rankTitle = 'Nhiệm kỳ đầy biến động';
      player.totalScore = Math.max(10, Math.round(player.currentTurn * 2 + player.knowledgeScore * 0.3));
    } else if (player.currentTurn >= player.maxTurns) {
      player.status = 'COMPLETED';
      this.calculateCompletionRating(player);
    } else {
      // Still playing, update interim totalScore
      const avg = (player.stats.politics + player.stats.economy + player.stats.people + player.stats.law) / 4;
      player.totalScore = Math.round(avg * 0.6 + player.knowledgeScore * 0.4);
    }

    return player;
  }

  finishGame(
    playerId: string,
    payload: {
      status: 'GAMEOVER' | 'COMPLETED';
      endingId?: string;
      finalTurn?: number;
    },
  ): PlayerSession | null {
    const player = this.players.get(playerId);
    if (!player) return null;

    player.status = payload.status;
    player.lastActiveAt = Date.now();
    if (payload.finalTurn) {
      player.currentTurn = payload.finalTurn;
    }

    if (payload.status === 'COMPLETED') {
      this.calculateCompletionRating(player, payload.endingId);
    } else {
      const ending = GAME_ENDINGS.find((e) => e.id === (payload.endingId || player.endingId));
      player.endingId = ending?.id || player.endingId;
      player.endingTitle = ending?.title || 'GAME OVER';
      player.rankTitle = 'Nhiệm kỳ đầy biến động';
      player.totalScore = Math.max(10, Math.round(player.currentTurn * 2 + player.knowledgeScore * 0.3));
    }

    return player;
  }

  private calculateCompletionRating(player: PlayerSession, preferredEndingId?: string) {
    const avgStats =
      (player.stats.politics + player.stats.economy + player.stats.people + player.stats.law) / 4;
    const finalScore = Math.min(
      100,
      Math.round(avgStats * 0.55 + player.knowledgeScore * 0.35 + player.crisesSolved * 2.5),
    );
    player.totalScore = finalScore;

    if (finalScore >= 90) player.rankTitle = 'Nhà lãnh đạo xuất sắc';
    else if (finalScore >= 75) player.rankTitle = 'Nhà lãnh đạo vững vàng';
    else if (finalScore >= 60) player.rankTitle = 'Nhà lãnh đạo thận trọng';
    else if (finalScore >= 40) player.rankTitle = 'Đất nước còn nhiều vấn đề';
    else player.rankTitle = 'Nhiệm kỳ đầy biến động';

    if (preferredEndingId) {
      const e = GAME_ENDINGS.find((item) => item.id === preferredEndingId);
      if (e) {
        player.endingId = e.id;
        player.endingTitle = e.title;
        return;
      }
    }

    // Determine ending automatically
    if (
      player.stats.politics >= 75 &&
      player.stats.economy >= 75 &&
      player.stats.people >= 75 &&
      player.stats.law >= 75 &&
      player.knowledgeScore >= 85
    ) {
      player.endingId = 'ENDING_PERFECT_LEADER';
      player.endingTitle = 'NGUYÊN THỦ KIỆT XUẤT - TOÀN DIỆN';
    } else if (player.stats.economy >= 80) {
      player.endingId = 'ENDING_ECONOMIC_POWER';
      player.endingTitle = 'CƯỜNG QUỐC KINH TẾ';
    } else if (player.stats.people >= 80) {
      player.endingId = 'ENDING_PEOPLES_HEART';
      player.endingTitle = 'LÒNG DÂN LÀ GỐC';
    } else if (player.stats.law >= 80) {
      player.endingId = 'ENDING_RULE_OF_LAW';
      player.endingTitle = 'THƯỢNG TÔN PHÁP QUYỀN';
    } else {
      player.endingId = 'ENDING_STRONG_STATE';
      player.endingTitle = 'NHÀ NƯỚC XHCN VỮNG MẠNH';
    }
  }

  getPlayer(playerId: string): PlayerSession | null {
    return this.players.get(playerId) || null;
  }

  getAllPlayers(): PlayerSession[] {
    return Array.from(this.players.values()).sort((a, b) => b.totalScore - a.totalScore);
  }

  getLeaderboard(limit = 60): any[] {
    const list = this.getAllPlayers();
    return list.slice(0, limit).map((p, idx) => ({
      rank: idx + 1,
      id: p.id,
      name: p.name,
      studentId: p.studentId,
      turn: p.currentTurn,
      maxTurns: p.maxTurns,
      stats: p.stats,
      knowledgeScore: p.knowledgeScore,
      crisesSolved: p.crisesSolved,
      status: p.status,
      rankTitle: p.rankTitle || 'Đang thực hiện nhiệm kỳ',
      endingTitle: p.endingTitle || '',
      totalScore: p.totalScore,
      lastActiveAt: p.lastActiveAt,
    }));
  }

  getClassStats(): any {
    const all = this.getAllPlayers();
    const count = all.length;
    if (count === 0) {
      return {
        totalPlayers: 0,
        playingCount: 0,
        completedCount: 0,
        gameOverCount: 0,
        avgScore: 0,
        avgKnowledge: 0,
        avgStats: { politics: 50, economy: 50, people: 50, law: 50 },
      };
    }

    const playingCount = all.filter((p) => p.status === 'PLAYING').length;
    const completedCount = all.filter((p) => p.status === 'COMPLETED').length;
    const gameOverCount = all.filter((p) => p.status === 'GAMEOVER').length;

    const sumScore = all.reduce((acc, p) => acc + p.totalScore, 0);
    const sumKnowledge = all.reduce((acc, p) => acc + p.knowledgeScore, 0);

    const sumPol = all.reduce((acc, p) => acc + p.stats.politics, 0);
    const sumEco = all.reduce((acc, p) => acc + p.stats.economy, 0);
    const sumPeo = all.reduce((acc, p) => acc + p.stats.people, 0);
    const sumLaw = all.reduce((acc, p) => acc + p.stats.law, 0);

    return {
      totalPlayers: count,
      playingCount,
      completedCount,
      gameOverCount,
      avgScore: Math.round(sumScore / count),
      avgKnowledge: Math.round(sumKnowledge / count),
      avgStats: {
        politics: Math.round(sumPol / count),
        economy: Math.round(sumEco / count),
        people: Math.round(sumPeo / count),
        law: Math.round(sumLaw / count),
      },
    };
  }

  resetAll(): void {
    this.players.clear();
  }

  exportCsv(): string {
    const list = this.getAllPlayers();
    const headers = [
      'Xếp hạng',
      'Họ và Tên',
      'Mã Sinh Viên',
      'Lượt Đạt Được',
      'Chính Trị',
      'Kinh Tế',
      'Nhân Dân',
      'Pháp Quyền',
      'Điểm Kiến Thức',
      'Điểm Tổng Kết',
      'Trạng Thái',
      'Xếp Loại Nhiệm Kỳ',
      'Kết Cục Đạt Được',
    ];

    const rows = list.map((p, idx) => [
      idx + 1,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.studentId.replace(/"/g, '""')}"`,
      `${p.currentTurn}/${p.maxTurns}`,
      p.stats.politics,
      p.stats.economy,
      p.stats.people,
      p.stats.law,
      p.knowledgeScore,
      p.totalScore,
      p.status === 'COMPLETED' ? 'Hoàn thành' : p.status === 'GAMEOVER' ? 'Game Over' : 'Đang chơi',
      `"${(p.rankTitle || '').replace(/"/g, '""')}"`,
      `"${(p.endingTitle || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  }
}
