'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DECISION_CARDS, DecisionCard as CardData, GAME_ENDINGS } from '@/data/cards';
import { StatIndicators, NationalStats, StatDelta, StatPreviewHint } from '@/components/StatIndicators';
import { DecisionCard } from '@/components/DecisionCard';
import { KnowledgeModal } from '@/components/KnowledgeModal';
import { GameOverModal } from '@/components/GameOverModal';
import { VictoryModal } from '@/components/VictoryModal';
import { sound } from '@/lib/sound';
import { Volume2, VolumeX, Shield, Award, Trophy, ArrowLeft, RefreshCw, Radio } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
  const router = useRouter();

  // Player identity
  const [playerName, setPlayerName] = useState<string>('Chủ tịch nước');
  const [studentId, setStudentId] = useState<string>('K65_SV');
  const [playerId, setPlayerId] = useState<string>('');
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Sound state
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Game state
  const [stats, setStats] = useState<NationalStats>({
    politics: 50,
    economy: 50,
    people: 50,
    law: 50,
  });
  const [knowledgeScore, setKnowledgeScore] = useState<number>(50);
  const [turn, setTurn] = useState<number>(0);
  const MAX_TURNS = 30;
  const [flags, setFlags] = useState<Record<string, any>>({});
  const [crisesSolved, setCrisesSolved] = useState<number>(0);

  // Indicator hints & delta
  const [previewHints, setPreviewHints] = useState<StatPreviewHint | null>(null);
  const [recentDelta, setRecentDelta] = useState<StatDelta | null>(null);

  // Modals state
  const [knowledgeModal, setKnowledgeModal] = useState<{
    isOpen: boolean;
    isCorrect: boolean;
    explanation: string;
    knowledgeDelta: number;
  }>({
    isOpen: false,
    isCorrect: false,
    explanation: '',
    knowledgeDelta: 0,
  });

  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'GAMEOVER' | 'COMPLETED'>('PLAYING');
  const [endingId, setEndingId] = useState<string>('');
  const [rankTitle, setRankTitle] = useState<string>('Nhà lãnh đạo xuất sắc');

  // Deck sequence
  const [cardDeck, setCardDeck] = useState<CardData[]>([]);
  const [deckIndex, setDeckIndex] = useState<number>(0);

  // Initialize player & build card deck
  useEffect(() => {
    // Load stored player info
    const storedName = localStorage.getItem('president_name') || 'Chủ tịch nước';
    const storedId = localStorage.getItem('president_student_id') || 'SV' + Math.floor(1000 + Math.random() * 9000);
    setPlayerName(storedName);
    setStudentId(storedId);

    // Register with backend
    fetch('http://localhost:4000/api/player/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: storedName, studentId: storedId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.player) {
          setPlayerId(data.player.id);
          setBackendConnected(true);
        }
      })
      .catch(() => {
        setBackendConnected(false);
      });

    // Start background music on user entry
    sound.playBGM();

    // Prepare Cards:
    // 1. Tutorial cards (1-3)
    const tutorialCards = DECISION_CARDS.filter((c) => c.type === 'TUTORIAL');
    
    // 2. In-game cards: shuffle them
    const normalCards = DECISION_CARDS.filter((c) => c.type !== 'TUTORIAL');
    const shuffled = [...normalCards].sort(() => Math.random() - 0.5);

    // 3. Chain: 3 tutorials + 35 shuffled cards (total > 30 turns)
    setCardDeck([...tutorialCards, ...shuffled]);
    setDeckIndex(0);
  }, []);

  // Current Card
  const currentCard = useMemo(() => {
    if (!cardDeck.length) return null;
    return cardDeck[deckIndex] || cardDeck[cardDeck.length - 1];
  }, [cardDeck, deckIndex]);

  // Handle player choice (Left or Right)
  const handleDecision = (choice: 'left' | 'right') => {
    if (!currentCard || gameStatus !== 'PLAYING') return;

    const selectedChoice = choice === 'left' ? currentCard.leftChoice : currentCard.rightChoice;
    const eff = selectedChoice.effects;

    // Check crisis
    if (currentCard.isCrisis) {
      setCrisesSolved((prev) => prev + 1);
    }

    // Calculate new stats
    const newStats: NationalStats = {
      politics: Math.max(0, Math.min(100, stats.politics + eff.politics)),
      economy: Math.max(0, Math.min(100, stats.economy + eff.economy)),
      people: Math.max(0, Math.min(100, stats.people + eff.people)),
      law: Math.max(0, Math.min(100, stats.law + eff.law)),
    };

    // Calculate knowledge delta
    let deltaK = 0;
    let isCorrectChoice = false;
    if (currentCard.type === 'KNOWLEDGE') {
      isCorrectChoice = currentCard.correctChoice === choice;
      deltaK = isCorrectChoice ? 10 : -5;
      if (isCorrectChoice) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }

    const newKnowledgeScore = Math.max(0, knowledgeScore + deltaK);
    const newTurn = turn + 1;

    // Update setFlags
    const newFlags = { ...flags, ...(selectedChoice.setFlags || {}) };
    setFlags(newFlags);

    // Trigger visual delta badge
    setRecentDelta(eff);
    setTimeout(() => setRecentDelta(null), 1800);

    // Sync to backend
    if (playerId) {
      fetch('http://localhost:4000/api/player/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          turn: newTurn,
          cardId: currentCard.id,
          choice,
          effects: eff,
          knowledgeDelta: deltaK,
          newStats,
          newKnowledgeScore,
          setFlags: selectedChoice.setFlags,
        }),
      }).catch(() => {});
    }

    // Update state
    setStats(newStats);
    setKnowledgeScore(newKnowledgeScore);
    setTurn(newTurn);

    // Check Game Over
    if (
      newStats.politics <= 0 ||
      newStats.economy <= 0 ||
      newStats.people <= 0 ||
      newStats.law <= 0
    ) {
      let overEnding = 'ENDING_CRISIS_POLITICS';
      if (newStats.politics <= 0) overEnding = 'ENDING_CRISIS_POLITICS';
      else if (newStats.economy <= 0) overEnding = 'ENDING_CRISIS_ECONOMY';
      else if (newStats.people <= 0) overEnding = 'ENDING_CRISIS_PEOPLE';
      else if (newStats.law <= 0) overEnding = 'ENDING_CRISIS_LAW';

      setEndingId(overEnding);
      setGameStatus('GAMEOVER');
      sound.playCrisis();

      if (playerId) {
        fetch('http://localhost:4000/api/player/finish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerId,
            status: 'GAMEOVER',
            endingId: overEnding,
            finalTurn: newTurn,
          }),
        }).catch(() => {});
      }
      return;
    }

    // Check Victory (End of presidential term)
    if (newTurn >= MAX_TURNS) {
      let victEnding = 'ENDING_STRONG_STATE';
      const avg = (newStats.politics + newStats.economy + newStats.people + newStats.law) / 4;
      const combinedScore = Math.min(
        100,
        Math.round(avg * 0.55 + newKnowledgeScore * 0.35 + crisesSolved * 2.5),
      );

      if (
        newStats.politics >= 75 &&
        newStats.economy >= 75 &&
        newStats.people >= 75 &&
        newStats.law >= 75 &&
        newKnowledgeScore >= 85
      ) {
        victEnding = 'ENDING_PERFECT_LEADER';
      } else if (newStats.economy >= 80) {
        victEnding = 'ENDING_ECONOMIC_POWER';
      } else if (newStats.people >= 80) {
        victEnding = 'ENDING_PEOPLES_HEART';
      } else if (newStats.law >= 80) {
        victEnding = 'ENDING_RULE_OF_LAW';
      }

      let rTitle = 'Nhà lãnh đạo xuất sắc';
      if (combinedScore >= 90) rTitle = 'Nhà lãnh đạo xuất sắc';
      else if (combinedScore >= 75) rTitle = 'Nhà lãnh đạo vững vàng';
      else if (combinedScore >= 60) rTitle = 'Nhà lãnh đạo thận trọng';
      else if (combinedScore >= 40) rTitle = 'Đất nước còn nhiều vấn đề';
      else rTitle = 'Nhiệm kỳ đầy biến động';

      setEndingId(victEnding);
      setRankTitle(rTitle);
      setGameStatus('COMPLETED');

      if (playerId) {
        fetch('http://localhost:4000/api/player/finish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerId,
            status: 'COMPLETED',
            endingId: victEnding,
            finalTurn: newTurn,
          }),
        }).catch(() => {});
      }
      return;
    }

    // Handle Knowledge Modal
    if (currentCard.type === 'KNOWLEDGE') {
      setKnowledgeModal({
        isOpen: true,
        isCorrect: isCorrectChoice,
        explanation: currentCard.explanation || '',
        knowledgeDelta: deltaK,
      });
    } else {
      // Advance to next card
      advanceToNextCard();
    }
  };

  const advanceToNextCard = () => {
    setDeckIndex((prev) => Math.min(cardDeck.length - 1, prev + 1));
  };

  const handleRestart = () => {
    setStats({ politics: 50, economy: 50, people: 50, law: 50 });
    setKnowledgeScore(50);
    setTurn(0);
    setCrisesSolved(0);
    setFlags({});
    setGameStatus('PLAYING');
    setEndingId('');

    const tutorialCards = DECISION_CARDS.filter((c) => c.type === 'TUTORIAL');
    const normalCards = DECISION_CARDS.filter((c) => c.type !== 'TUTORIAL');
    const shuffled = [...normalCards].sort(() => Math.random() - 0.5);

    setCardDeck([...tutorialCards, ...shuffled]);
    setDeckIndex(0);

    // Re-join session in backend
    if (playerName) {
      fetch('http://localhost:4000/api/player/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, studentId }),
      }).catch(() => {});
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Presidential Year Calculation (1 nhiệm kỳ = 5 năm, 30 lượt = 6 lượt/năm)
  const currentYear = Math.min(5, Math.max(1, Math.floor(turn / 6) + 1));

  return (
    <div className="relative min-h-screen flex flex-col justify-between py-2 px-3 sm:px-6">
      {/* Top Presidential Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 border-b border-amber-500/20">
        {/* Presidential Title & Star Emblem */}
        <div className="flex items-center space-x-2.5">
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 transition-all"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-red-600 border border-yellow-400 flex items-center justify-center text-yellow-300 text-xs font-bold shadow-md">
              ★
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-amber-300">
                CHỦ TỊCH NƯỚC
              </h1>
              <p className="text-[10px] text-slate-400 truncate max-w-[150px] sm:max-w-none">
                {playerName} ({studentId})
              </p>
            </div>
          </div>
        </div>

        {/* Turn, Year, Knowledge & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
          {/* Realtime Backend Status Indicator */}
          <div
            className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${
              backendConnected
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={backendConnected ? 'Đang kết nối Bảng xếp hạng Lớp học Realtime' : 'Chế độ Chơi Trực tiếp'}
          >
            <Radio className={`w-3 h-3 ${backendConnected ? 'animate-pulse text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{backendConnected ? 'Trực Tuyến' : 'Cục Bộ'}</span>
          </div>

          {/* Current Year & Turn Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-amber-300 font-bold tracking-wide">
            <span>Năm {currentYear}</span>
            <span className="text-slate-500 mx-1">|</span>
            <span className="text-slate-300">{turn}/{MAX_TURNS}</span>
          </div>

          {/* Leaderboard Link */}
          <Link
            href="/leaderboard"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-all font-semibold"
            title="Xem Bảng Xếp Hạng"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xếp Hạng</span>
          </Link>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 transition-all"
            title={isMuted ? 'Bật Âm Thanh' : 'Tắt Âm Thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* 4 National Stat Indicators Gauge */}
      <section className="w-full my-1">
        <StatIndicators
          stats={stats}
          previewHints={previewHints}
          recentDelta={recentDelta}
        />
      </section>

      {/* Center Main Stage: Interactive Decision Card */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        {currentCard ? (
          <DecisionCard
            card={currentCard}
            onChoice={handleDecision}
            onPreviewHintChange={(hint) => setPreviewHints(hint)}
            disabled={knowledgeModal.isOpen || gameStatus !== 'PLAYING'}
          />
        ) : (
          <div className="text-center p-8 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-400" />
            <p>Đang chuẩn bị hồ sơ nhiệm kỳ...</p>
          </div>
        )}
      </main>

      {/* Footer Info & Admin Shortcut */}
      <footer className="w-full max-w-4xl mx-auto py-2 text-center text-[11px] text-slate-500 border-t border-slate-800/60 flex items-center justify-between">
        <span>Môn học: Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN & Pháp quyền XHCN</span>
        <Link href="/admin" className="hover:text-amber-400 transition-colors">
          Cổng Quản Trị Giảng Viên (Admin) →
        </Link>
      </footer>

      {/* Knowledge Explanation Modal */}
      <KnowledgeModal
        isOpen={knowledgeModal.isOpen}
        isCorrect={knowledgeModal.isCorrect}
        explanation={knowledgeModal.explanation}
        knowledgeDelta={knowledgeModal.knowledgeDelta}
        onContinue={() => {
          setKnowledgeModal((prev) => ({ ...prev, isOpen: false }));
          advanceToNextCard();
        }}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameStatus === 'GAMEOVER'}
        endingId={endingId}
        turnsSurvived={turn}
        knowledgeScore={knowledgeScore}
        stats={stats}
        onRestart={handleRestart}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={gameStatus === 'COMPLETED'}
        endingId={endingId}
        totalScore={Math.min(
          100,
          Math.round(
            ((stats.politics + stats.economy + stats.people + stats.law) / 4) * 0.55 +
              knowledgeScore * 0.35 +
              crisesSolved * 2.5,
          ),
        )}
        rankTitle={rankTitle}
        knowledgeScore={knowledgeScore}
        crisesSolved={crisesSolved}
        stats={stats}
        onRestart={handleRestart}
      />
    </div>
  );
}
