'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft, RefreshCw, Sparkles, BookOpen, Crown, Play } from 'lucide-react';

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

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchLeaderboard = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('http://localhost:4000/api/player/leaderboard?limit=60');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 presidential-pattern">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-amber-500/20">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                BẢNG VINH DANH LỚP HỌC
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-slate-100 mt-0.5">
              BẢNG XẾP HẠNG NHIỆM KỲ NGUYÊN THỦ
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLeaderboard}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all"
            title="Làm mới bảng xếp hạng"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <Link
            href="/game"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Vào Nhiệm Kỳ</span>
          </Link>
        </div>
      </header>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <section className="max-w-4xl mx-auto my-8 grid grid-cols-3 gap-3 items-end">
          {/* Top 2 - Silver */}
          {top2 && (
            <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/90 border border-slate-400/40 shadow-xl text-center">
              <span className="text-2xl mb-1">🥈</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Hạng 2</span>
              <h3 className="text-sm sm:text-base font-black text-slate-200 mt-1 truncate max-w-full">
                {top2.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{top2.studentId}</p>
              <div className="mt-2 px-3 py-0.5 rounded-full bg-slate-800 text-slate-200 font-bold text-xs">
                {top2.totalScore} Điểm
              </div>
            </div>
          )}

          {/* Top 1 - Gold (Elevated) */}
          {top1 && (
            <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-900/95 border-2 border-amber-400 shadow-2xl gold-glow text-center transform -translate-y-2">
              <Crown className="w-8 h-8 text-yellow-300 mb-1 animate-bounce" />
              <span className="text-3xl mb-1">🥇</span>
              <span className="text-xs uppercase font-extrabold text-amber-300">QUÁN QUÂN NHIỆM KỲ</span>
              <h3 className="text-base sm:text-xl font-black text-amber-400 mt-1 truncate max-w-full">
                {top1.name}
              </h3>
              <p className="text-xs text-slate-300 font-mono">{top1.studentId}</p>
              <div className="mt-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-black text-sm">
                {top1.totalScore} Điểm
              </div>
              <span className="text-[10px] text-yellow-200 font-semibold mt-1">
                {top1.rankTitle}
              </span>
            </div>
          )}

          {/* Top 3 - Bronze */}
          {top3 && (
            <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/90 border border-amber-700/50 shadow-xl text-center">
              <span className="text-2xl mb-1">🥉</span>
              <span className="text-[10px] uppercase font-bold text-amber-600">Hạng 3</span>
              <h3 className="text-sm sm:text-base font-black text-slate-200 mt-1 truncate max-w-full">
                {top3.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{top3.studentId}</p>
              <div className="mt-2 px-3 py-0.5 rounded-full bg-slate-800 text-slate-200 font-bold text-xs">
                {top3.totalScore} Điểm
              </div>
            </div>
          )}
        </section>
      )}

      {/* Full Leaderboard Table (1 - 60) */}
      <main className="max-w-5xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden my-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] sm:text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 text-center">Hạng</th>
                <th className="py-3 px-4">Họ và Tên</th>
                <th className="py-3 px-4">MSSV</th>
                <th className="py-3 px-4 text-center">Tiến Độ</th>
                <th className="py-3 px-4 text-center">Lý Luận</th>
                <th className="py-3 px-4 text-center">Điểm Tổng Kết</th>
                <th className="py-3 px-4">Xếp Loại Nhiệm Kỳ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 italic">
                    Chưa có kết quả nào được ghi nhận. Hãy là người đầu tiên tham gia!
                  </td>
                </tr>
              ) : (
                leaderboard.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      item.rank === 1
                        ? 'bg-amber-500/10'
                        : item.rank === 2
                        ? 'bg-slate-300/5'
                        : item.rank === 3
                        ? 'bg-amber-700/5'
                        : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      {item.rank === 1
                        ? '🥇'
                        : item.rank === 2
                        ? '🥈'
                        : item.rank === 3
                        ? '🥉'
                        : item.rank}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-100">{item.name}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-xs">{item.studentId}</td>
                    <td className="py-3 px-4 text-center text-slate-300 font-mono">
                      {item.turn}/{item.maxTurns} lượt
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-cyan-400">
                      {item.knowledgeScore}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-black text-sm border border-amber-500/30">
                        {item.totalScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-xs">
                      <span className="font-semibold">{item.rankTitle}</span>
                      {item.endingTitle && (
                        <span className="block text-[11px] text-slate-400 truncate max-w-xs italic">
                          {item.endingTitle}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
