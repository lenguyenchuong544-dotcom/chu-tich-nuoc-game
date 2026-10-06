'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DECISION_CARDS, DecisionCard as CardData, GAME_ENDINGS } from '@/data/cards';
import { StatIndicators, NationalStats, StatDelta, StatPreviewHint } from '@/components/StatIndicators';
import { DecisionCard } from '@/components/DecisionCard';
import { KnowledgeModal } from '@/components/KnowledgeModal';
import { GameOverModal } from '@/components/GameOverModal';
import { VictoryModal } from '@/components/VictoryModal';
import { sound } from '@/lib/sound';
import { Volume2, VolumeX, BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
    const storedName = localStorage.getItem('president_name') || 'Chủ tịch nước';
    const storedId = localStorage.getItem('president_student_id') || 'SV' + Math.floor(1000 + Math.random() * 9000);
    setPlayerName(storedName);
    setStudentId(storedId);

    // Register with backend
    fetch(`${API_BASE}/api/player/join`, {
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

    // Start background music
    sound.playBGM();

    // Prepare Cards: Tutorial (1-3) followed by randomized normal cards
    const tutorialCards = DECISION_CARDS.filter((c) => c.type === 'TUTORIAL');
    const normalCards = DECISION_CARDS.filter((c) => c.type !== 'TUTORIAL');
    const shuffled = [...normalCards].sort(() => Math.random() - 0.5);

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

    // Update flags
    const newFlags = { ...flags, ...(selectedChoice.setFlags || {}) };
    setFlags(newFlags);

    // Trigger visual floating delta
    setRecentDelta(eff);
    setTimeout(() => setRecentDelta(null), 1500);

    // Sync to backend
    if (playerId) {
      fetch(`${API_BASE}/api/player/action`, {
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

    // Check Game Over (any stat <= 0)
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
        fetch(`${API_BASE}/api/player/finish`, {
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

    // Check Victory (End of 5-year presidential term: 30 turns)
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
        fetch(`${API_BASE}/api/player/finish`, {
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

    if (playerName) {
      fetch(`${API_BASE}/api/player/join`, {
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

  const displayTitle = playerName.toLowerCase().includes('chủ tịch')
    ? playerName.toUpperCase()
    : `CHỦ TỊCH ${playerName.toUpperCase()}`;

  return (
    <div className="min-h-screen sm:h-screen flex flex-col justify-between py-1.5 px-2 sm:px-4 living-pastel-bg text-ink overflow-x-hidden">
      {/* 1. Pastel Game Header */}
      <header className="w-full max-w-lg mx-auto flex items-center justify-between py-2 px-3 sm:px-4 rounded-2xl bg-cotton/95 border-2 border-blush-deep/80 shadow-tactile backdrop-blur-md">
        {/* President Identity */}
        <div className="flex items-center space-x-2 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              backendConnected ? 'bg-correct ring-2 ring-correct/40' : 'bg-ink-subtle'
            }`}
            title={backendConnected ? 'Máy chủ trực tuyến' : 'Cục bộ'}
          />
          <h1 className="text-xs sm:text-sm font-black uppercase tracking-wide text-ink truncate max-w-[130px] sm:max-w-[190px]">
            {displayTitle}
          </h1>
        </div>

        {/* Turn Progress, Knowledge Score & Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs flex-shrink-0">
          {/* Progress Pill */}
          <div className="px-2.5 py-1 rounded-pill bg-blush-surface border border-blush-deep font-mono tabular-nums text-xs font-bold text-peony-700">
            <span>{turn}</span>
            <span className="text-ink-subtle">/{MAX_TURNS}</span>
          </div>

          {/* Knowledge Score */}
          <div
            className="flex items-center space-x-1 px-2.5 py-1 rounded-pill bg-sky-surface border border-sky-deep font-mono tabular-nums text-xs font-bold text-cornflower-700"
            title="Điểm hiểu biết lý luận"
          >
            <BookOpen className="w-3.5 h-3.5 text-cornflower-700" />
            <span>{knowledgeScore}</span>
          </div>

          {/* Leaderboard Link */}
          <Link
            href="/leaderboard"
            className="p-1.5 rounded-lg text-ink-muted hover:text-peony-700 hover:bg-blush-surface transition-colors"
            title="Bảng Vinh Danh"
          >
            <Trophy className="w-4 h-4" />
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg text-ink-muted hover:text-peony-700 hover:bg-blush-surface transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-wrong-text" /> : <Volume2 className="w-4 h-4 text-correct-text" />}
          </button>
        </div>
      </header>

      {/* 2. National Status HUD */}
      <section className="w-full max-w-lg mx-auto my-0.5">
        <StatIndicators
          stats={stats}
          previewHints={previewHints}
          recentDelta={recentDelta}
        />
      </section>

      {/* 3. Centerpiece: 3D Dossier Decision Card */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-auto py-0.5 max-h-[calc(100vh-140px)]">
        {currentCard ? (
          <DecisionCard
            key={`card-${currentCard.id}-${turn}`}
            card={currentCard}
            onChoice={handleDecision}
            onPreviewHintChange={(hint) => setPreviewHints(hint)}
            disabled={knowledgeModal.isOpen || gameStatus !== 'PLAYING'}
          />
        ) : (
          <div className="text-center p-6 text-ink-muted">
            <p className="text-sm font-medium">Đang nạp hồ sơ chính sách...</p>
          </div>
        )}
      </main>

      {/* 4. Compact Footer */}
      <footer className="w-full max-w-lg mx-auto py-1.5 text-[11px] text-ink-muted flex items-center justify-between gap-1 border-t border-blush-deep/60 text-center">
        <span>Nhà nước pháp quyền XHCN Việt Nam</span>
        <div className="flex items-center space-x-3">
          <Link href="/leaderboard" className="hover:text-peony-700 font-semibold transition-colors">
            Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-peony-700 font-semibold transition-colors">
            Giảng Viên
          </Link>
        </div>
      </footer>

      {/* Modals */}
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

      <GameOverModal
        isOpen={gameStatus === 'GAMEOVER'}
        endingId={endingId}
        turnsSurvived={turn}
        knowledgeScore={knowledgeScore}
        stats={stats}
        onRestart={handleRestart}
      />

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
