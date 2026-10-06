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
import { Volume2, VolumeX, Trophy, ArrowLeft, RefreshCw, BookOpen, HelpCircle, X, ShieldAlert } from 'lucide-react';
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
  const [volume, setVolume] = useState<number>(0.5);

  // Onboarding guidance
  const [showGuide, setShowGuide] = useState<boolean>(true);

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

    setIsMuted(sound.getMuted());
    setVolume(sound.getVolume());

    // Gentle start chime
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
    <div className="relative min-h-screen flex flex-col justify-between py-2.5 px-3 sm:px-6 stationery-living-bg">
      {/* Full-Width Pastel Game Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-2.5 px-2 sm:px-4 border-b border-blush-border/80">
        {/* Left: Back button + President Name + Online Status */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-blush-subtle transition-colors"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                backendConnected ? 'bg-correct animate-pulse' : 'bg-highlight'
              }`}
              title={backendConnected ? 'Đã kết nối trực tiếp giảng viên' : 'Chế độ lưu cục bộ'}
            />
            <span className="font-extrabold text-ink tracking-wide uppercase text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
              CHỦ TỊCH {playerName}
            </span>
          </div>
        </div>

        {/* Right: Progress counter + Theory Score + Sound Toggle */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Decision Counter (Tabular numbers) */}
          <span className="font-mono text-peony-700 font-bold text-xs sm:text-sm bg-blush px-3 py-1 rounded-full border border-blush-border">
            {turn} / {MAX_TURNS} Lượt
          </span>

          {/* Theory Score */}
          <div className="flex items-center space-x-1.5 text-cornflower-700 font-mono text-xs sm:text-sm bg-sky-subtle px-2.5 sm:px-3 py-1 rounded-full border border-sky-border">
            <BookOpen className="w-4 h-4 text-cornflower-600" />
            <span className="font-bold">{knowledgeScore} Điểm</span>
          </div>

          {/* Sound & Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              className="p-2 text-ink-muted hover:text-ink hover:bg-blush-subtle rounded-xl transition-colors"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-wrong" />
              ) : (
                <Volume2 className="w-4 h-4 text-ink-muted" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                sound.setVolume(val);
                if (isMuted && val > 0) {
                  sound.toggleMute();
                  setIsMuted(false);
                }
              }}
              className="w-14 h-1.5 accent-peony-500 bg-blush rounded-lg cursor-pointer hidden sm:block"
              title={`Âm lượng: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              aria-label="Điều chỉnh âm lượng"
            />
          </div>
        </div>
      </header>

      {/* Main Bilateral Situation Room Stage */}
      <div className="w-full max-w-7xl mx-auto my-auto py-3 px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Panel: National Command Dashboard & Telemetry (Visible on large screens) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col space-y-4">
          {/* President Identity Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 border-2 border-blush-border shadow-pastel-card">
            <div className="flex items-center justify-between pb-3 border-b border-blush-border/70">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blush border border-peony-300 flex items-center justify-center text-peony-700 text-xl font-black shadow-xs">
                  ★
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-peony-700 block">
                    CHỦ TỊCH NƯỚC ĐIỀU HÀNH
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-ink">{playerName}</h2>
                  <p className="text-xs text-ink-muted font-mono">{studentId}</p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                  backendConnected
                    ? 'bg-correct-surface text-correct-text border-correct-border'
                    : 'bg-highlight-surface text-highlight-text border-highlight-border'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-correct animate-pulse' : 'bg-highlight'}`} />
                <span>{backendConnected ? 'Trực tuyến' : 'Cục bộ'}</span>
              </span>
            </div>

            {/* Progress & Theory Score Badges */}
            <div className="grid grid-cols-2 gap-3 mt-3.5">
              <div className="p-3 rounded-2xl bg-blush-subtle border border-blush-border/70 text-left">
                <span className="text-xs font-bold text-peony-700 uppercase tracking-wide block">
                  Tiến Độ Nhiệm Kỳ
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl sm:text-2xl font-black font-mono text-peony-700">{turn}</span>
                  <span className="text-xs text-ink-muted font-mono font-bold">/ {MAX_TURNS} Lượt</span>
                </div>
                <div className="w-full h-2 bg-blush rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-peony-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (turn / MAX_TURNS) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-subtle border border-sky-border/70 text-left">
                <span className="text-xs font-bold text-cornflower-700 uppercase tracking-wide block">
                  Lý Luận (CNXHKH)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl sm:text-2xl font-black font-mono text-cornflower-700">{knowledgeScore}</span>
                  <span className="text-xs text-ink-muted font-medium">Điểm</span>
                </div>
                <span className="text-xs text-ink-muted block mt-2 truncate">
                  {crisesSolved} Khủng hoảng đã vượt qua
                </span>
              </div>
            </div>
          </div>

          {/* 4 Pillars National Status */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-ink flex items-center gap-1.5">
                <span>🏛</span>
                <span>4 Trụ Cột Thể Chế Quốc Gia</span>
              </span>
              <span className="text-xs text-ink-muted font-medium">Ngưỡng an toàn &gt; 20</span>
            </div>
            <StatIndicators
              stats={stats}
              previewHints={previewHints}
              recentDelta={recentDelta}
              layout="grid2x2"
            />
          </div>

          {/* Command Directives & Shortcuts Guide */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-blush-border/80 shadow-xs text-left">
            <div className="flex items-center gap-2 mb-2 text-peony-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-peony-500 shrink-0" />
              <span>Chỉ Dẫn Nghị Sự & Phím Tắt</span>
            </div>
            <div className="space-y-1.5 text-xs text-ink leading-relaxed">
              <p className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded-lg bg-cotton border border-blush-border font-mono font-bold text-peony-700 shadow-xs">←</kbd>
                <span>Kéo thẻ sang Trái: Phê duyệt Phương án A</span>
              </p>
              <p className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded-lg bg-cotton border border-sky-border font-mono font-bold text-cornflower-700 shadow-xs">→</kbd>
                <span>Kéo thẻ sang Phải: Bác bỏ Phương án B</span>
              </p>
              <p className="text-ink-muted text-[11px] pt-1 border-t border-blush-border/60">
                ⚠️ Giữ cả 4 chỉ số trên 0 điểm để tránh gián đoạn nhiệm kỳ.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Active Decision Dossier Card & Choice Buttons */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-center w-full">
          {/* Mobile Only: Onboarding Swipe Gesture Guidance Banner */}
          {showGuide && (
            <div className="lg:hidden w-full max-w-xl mx-auto my-1.5 p-3 rounded-2xl bg-white/95 border border-blush-border shadow-xs flex items-center justify-between text-xs sm:text-sm text-ink animate-fade-in">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-peony-500 shrink-0" />
                <span className="leading-relaxed">
                  <strong>Cách chơi:</strong> Kéo thẻ sang <strong>Trái (A)</strong> hoặc <strong>Phải (B)</strong>, hoặc dùng phím <strong>← / →</strong> trên bàn phím.
                </span>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-blush-subtle ml-2 shrink-0"
                aria-label="Đóng hướng dẫn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Only: Compact 4 Pillars National Status Bar */}
          <section className="lg:hidden w-full max-w-xl mx-auto my-2">
            <StatIndicators
              stats={stats}
              previewHints={previewHints}
              recentDelta={recentDelta}
              layout="horizontal"
            />
          </section>

          {/* Active Dossier Card Component */}
          <main className="w-full flex flex-col items-center justify-center my-auto py-1">
            {currentCard ? (
              <DecisionCard
                card={currentCard}
                onChoice={handleDecision}
                onPreviewHintChange={(hint) => setPreviewHints(hint)}
                disabled={knowledgeModal.isOpen || gameStatus !== 'PLAYING'}
              />
            ) : (
              <div className="text-center p-6 text-ink-muted">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-peony-500" />
                <p className="text-sm font-medium">Đang tải hồ sơ nhiệm kỳ...</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Full-Width Stationery Footer */}
      <footer className="w-full max-w-7xl mx-auto py-2.5 px-3 sm:px-4 text-xs text-ink-muted flex items-center justify-between border-t border-blush-border/60">
        <span>Chuyên đề: Nhà nước XHCN & Pháp quyền XHCN</span>
        <div className="flex items-center space-x-4">
          <Link href="/leaderboard" className="hover:text-peony-700 transition-colors font-medium">
            Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-peony-700 transition-colors font-medium">
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
