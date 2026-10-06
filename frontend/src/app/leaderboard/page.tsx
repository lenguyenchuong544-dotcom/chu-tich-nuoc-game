'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft, RefreshCw, Crown, Play, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { apiFetch } from '@/lib/api';

interface LeaderboardItem {
  rank: number;
  id: string;
  name: string;
  studentId: string;
  turn: number;
  maxTurns: number;
  stats: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
  knowledgeScore: number;
  totalScore: number;
  status: 'PLAYING' | 'GAMEOVER' | 'COMPLETED';
  rankTitle: string;
  endingTitle: string;
}

import { m } from 'framer-motion';
import { springs } from '@/lib/motion';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchLeaderboard = async () => {
    setIsRefreshing(true);
    try {
      const res = await apiFetch('/api/player/leaderboard?limit=60');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch (e) {
      console.warn('Backend offline');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 4000);
    return () => clearInterval(interval);
  }, []);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="min-h-screen stationery-living-bg text-ink p-4 sm:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-blush-border">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="p-2.5 rounded-2xl bg-white border border-blush-border hover:border-peony-400 text-ink-muted hover:text-ink transition-all shadow-xs"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-blush text-peony-700 border border-blush-border text-xs font-bold uppercase tracking-wider">
                BẢNG VINH DANH LỚP HỌC
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-ink mt-0.5">
              BẢNG XẾP HẠNG NHIỆM KỲ NGUYÊN THỦ
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLeaderboard}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl bg-white border border-blush-border hover:border-peony-400 text-ink-muted hover:text-ink transition-all shadow-xs"
            title="Làm mới bảng xếp hạng"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-peony-600' : ''}`} />
          </button>

          <Link href="/game">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play className="w-5 h-5 fill-white" />}
            >
              Vào Nhiệm Kỳ
            </Button>
          </Link>
        </div>
      </header>

      {/* Bilateral Layout: Podium on Left, Full Table on Right */}
      <div className="max-w-7xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Top 3 Honor Podium & Class Insights */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-ink flex items-center gap-1.5">
              <span>👑</span>
              <span>BỤC VINH DANH XUẤT SẮC</span>
            </h3>
            <span className="text-xs text-ink-muted font-mono">{leaderboard.length} Sinh viên</span>
          </div>

          {/* Top 1 - Quán Quân Spotlight */}
          {top1 && (
            <div className="p-6 rounded-3xl bg-white border-4 border-highlight shadow-dossier text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 text-2xl">🥇</div>
              <Crown className="w-10 h-10 text-highlight mx-auto mb-1 animate-bounce" />
              <span className="text-xs uppercase font-black text-highlight-text tracking-wider bg-highlight-surface px-3 py-0.5 rounded-full border border-highlight">
                QUÁN QUÂN NHIỆM KỲ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-ink mt-2 truncate">
                {top1.name}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted font-mono font-medium">{top1.studentId}</p>
              <div className="mt-3 px-5 py-2 rounded-2xl bg-highlight-surface border-2 border-highlight text-highlight-text font-black text-xl">
                {top1.totalScore} Điểm
              </div>
              <span className="text-xs sm:text-sm text-ink-muted font-bold block mt-2">
                {top1.rankTitle}
              </span>
            </div>
          )}

          {/* Top 2 & Top 3 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {/* Top 2 */}
            {top2 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-sky-border shadow-pastel-blue text-left flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🥈</span>
                    <span className="text-xs uppercase font-extrabold text-cornflower-700">Hạng 2 Toàn Khóa</span>
                  </div>
                  <h4 className="text-base font-black text-ink mt-1 truncate max-w-[170px]">
                    {top2.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-mono">{top2.studentId}</p>
                </div>
                <div className="px-3.5 py-1.5 rounded-2xl bg-sky-subtle text-cornflower-700 font-black text-base border border-sky-border">
                  {top2.totalScore} Đ
                </div>
              </div>
            )}

            {/* Top 3 */}
            {top3 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-blush-border shadow-pastel-card text-left flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🥉</span>
                    <span className="text-xs uppercase font-extrabold text-peony-700">Hạng 3 Toàn Khóa</span>
                  </div>
                  <h4 className="text-base font-black text-ink mt-1 truncate max-w-[170px]">
                    {top3.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-mono">{top3.studentId}</p>
                </div>
                <div className="px-3.5 py-1.5 rounded-2xl bg-blush text-peony-700 font-black text-base border border-blush-border">
                  {top3.totalScore} Đ
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Full Leaderboard Table (1 - 60) */}
        <main className="lg:col-span-8 xl:col-span-8 rounded-3xl bg-white border-2 border-blush-border shadow-dossier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-blush-subtle text-ink-muted uppercase text-xs tracking-wider border-b border-blush-border">
                <tr>
                  <th className="py-3.5 px-4 text-center">Hạng</th>
                  <th className="py-3.5 px-4">Họ và Tên</th>
                  <th className="py-3.5 px-4">MSSV</th>
                  <th className="py-3.5 px-4 text-center">Tiến Độ</th>
                  <th className="py-3.5 px-4 text-center">Lý Luận</th>
                  <th className="py-3.5 px-4 text-center">Điểm Tổng</th>
                  <th className="py-3.5 px-4">Xếp Loại Nhiệm Kỳ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush-border/60 font-medium">
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-ink-muted italic text-sm">
                      Chưa có kết quả nào được ghi nhận. Hãy là người đầu tiên tham gia!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((item) => (
                    <m.tr
                      layout
                      transition={springs.scoreboardRow}
                      key={item.id}
                      className={`hover:bg-blush-subtle/60 transition-colors ${
                        item.rank === 1
                          ? 'bg-highlight-surface/40'
                          : item.rank === 2
                          ? 'bg-sky-subtle/40'
                          : item.rank === 3
                          ? 'bg-blush-subtle/40'
                          : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-black text-sm sm:text-base">
                        {item.rank === 1
                          ? '🥇'
                          : item.rank === 2
                          ? '🥈'
                          : item.rank === 3
                          ? '🥉'
                          : item.rank}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-ink">{item.name}</td>
                      <td className="py-3.5 px-4 text-ink-muted font-mono text-xs sm:text-sm">{item.studentId}</td>
                      <td className="py-3.5 px-4 text-center text-ink font-mono text-sm sm:text-base">
                        {item.turn}/{item.maxTurns} lượt
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-cornflower-700 text-sm sm:text-base">
                        {item.knowledgeScore}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-3 py-1 rounded-xl bg-blush text-peony-700 font-black text-sm sm:text-base border border-blush-border">
                          {item.totalScore}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-ink">
                        <span className="font-bold text-xs sm:text-sm block">{item.rankTitle}</span>
                        {item.endingTitle && (
                          <span className="block text-xs text-ink-muted truncate max-w-xs italic mt-0.5">
                            {item.endingTitle}
                          </span>
                        )}
                      </td>
                    </m.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
