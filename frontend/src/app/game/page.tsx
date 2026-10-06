'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DECISION_CARDS, DecisionCard as CardData } from '@/data/cards';
import { StatIndicators, NationalStats, StatDelta, StatPreviewHint } from '@/components/StatIndicators';
import { DecisionCard } from '@/components/DecisionCard';
import { KnowledgeModal } from '@/components/KnowledgeModal';
import { GameOverModal } from '@/components/GameOverModal';
import { VictoryModal } from '@/components/VictoryModal';
import { sound } from '@/lib/sound';
import { Volume2, VolumeX, Trophy, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
  const router = useRouter();

  // Player identity
  const [playerName, setPlayerName] = useState<string>('Chủ tịch nước');
  const [studentId, setStudentId] = useState<string>('SV');
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

    // Gentle start sound, no narrator voice
    sound.playGameStart();

    // Prepare Cards
    const tutorialCards = DECISION_CARDS.filter((c) => c.type === 'TUTORIAL');
    const normalCards = DECISION_CARDS.filter((c) => c.type !== 'TUTORIAL');
    const shuffled = [...normalCards].sort(() => Math.random() - 0.5);

    setCardDeck([...tutorialCards, ...shuffled]);
    setDeckIndex(0);
  }, []);

  const currentCard = useMemo(() => {
    if (!cardDeck.length) return null;
    return cardDeck[deckIndex] || cardDeck[cardDeck.length - 1];
  }, [cardDeck, deckIndex]);

  const handleDecision = (choice: 'left' | 'right') => {
    if (!currentCard || gameStatus !== 'PLAYING') return;

    const selectedChoice = choice === 'left' ? currentCard.leftChoice : currentCard.rightChoice;
    const eff = selectedChoice.effects;

    if (currentCard.isCrisis) {
      setCrisesSolved((prev) => prev + 1);
    }

    const newStats: NationalStats = {
      politics: Math.max(0, Math.min(100, stats.politics + eff.politics)),
      economy: Math.max(0, Math.min(100, stats.economy + eff.economy)),
      people: Math.max(0, Math.min(100, stats.people + eff.people)),
      law: Math.max(0, Math.min(100, stats.law + eff.law)),
    };

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

    const newFlags = { ...flags, ...(selectedChoice.setFlags || {}) };
    setFlags(newFlags);

    setRecentDelta(eff);
    setTimeout(() => setRecentDelta(null), 1600);

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

    // Check Victory
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

  return (
    <div className="relative min-h-screen flex flex-col justify-between py-2.5 px-3 sm:px-6 command-center-bg">
      {/* 6. Compact Game Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between py-1.5 px-2 text-xs border-b border-white/10">
        {/* Left: Back + President Name + Tiny Status Dot */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="p-1 rounded text-slate-400 hover:text-slate-100 transition-colors"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center space-x-1.5">
            {/* Small Connection Dot */}
            <span
              className={`w-2 h-2 rounded-full ${
                backendConnected ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
              title={backendConnected ? 'Kết nối máy chủ trực tuyến' : 'Cục bộ'}
            />
            <span className="font-bold text-slate-200 tracking-wide uppercase text-[11px] truncate max-w-[130px] sm:max-w-none">
              CHỦ TỊCH {playerName}
            </span>
          </div>
        </div>

        {/* Right: Progress + Knowledge Score + Sound */}
        <div className="flex items-center space-x-3">
          {/* Decision Progress */}
          <span className="font-mono text-amber-300 font-bold text-[11px]">
            QUYẾT ĐỊNH {turn} / {MAX_TURNS}
          </span>

          {/* Knowledge Score */}
          <div className="flex items-center space-x-1 text-cyan-400 font-mono text-[11px]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-bold">{knowledgeScore}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </header>

      {/* 5. National Status HUD */}
      <section className="w-full my-2">
        <StatIndicators
          stats={stats}
          previewHints={previewHints}
          recentDelta={recentDelta}
        />
      </section>

      {/* 2 & 3. Main Stage: Decision Card Briefing Center */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-auto py-1">
        {currentCard ? (
          <DecisionCard
            card={currentCard}
            onChoice={handleDecision}
            onPreviewHintChange={(hint) => setPreviewHints(hint)}
            disabled={knowledgeModal.isOpen || gameStatus !== 'PLAYING'}
          />
        ) : (
          <div className="text-center p-6 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
            <p className="text-xs">Đang tải hồ sơ nhiệm kỳ...</p>
          </div>
        )}
      </main>

      {/* Clean Compact Footer */}
      <footer className="w-full max-w-xl mx-auto py-1.5 px-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-white/5">
        <span>Chuyên đề: Nhà nước XHCN & Pháp quyền XHCN</span>
        <div className="flex items-center space-x-3">
          <Link href="/leaderboard" className="hover:text-amber-400 transition-colors">
            Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-amber-400 transition-colors">
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
