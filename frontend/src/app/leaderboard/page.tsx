'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Crown, RefreshCw, Search, Play } from 'lucide-react';
import io from 'socket.io-client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
  rankTitle: string;
  endingTitle?: string;
  lastActiveAt: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentStudentId, setCurrentStudentId] = useState<string>('');

  useEffect(() => {
    const savedId = localStorage.getItem('president_student_id') || '';
    setCurrentStudentId(savedId);

    fetchLeaderboard();

    // Connect to WebSocket for realtime ranking telemetry
    let socket: any = null;
    try {
      socket = io(API_BASE, { transports: ['websocket', 'polling'] });
      socket.on('leaderboardUpdate', (data: LeaderboardItem[]) => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
          setLoading(false);
        }
      });
    } catch (e) {
      console.warn('Socket connect failed, falling back to HTTP');
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/player/leaderboard?limit=60`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch (e) {
      console.warn('Cannot fetch leaderboard HTTP');
    } finally {
      setLoading(false);
    }
  };

  const filteredList = leaderboard.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="min-h-screen living-pastel-bg text-ink p-3 sm:p-6">
      {/* Top Header */}
      <header className="max-w-5xl mx-auto flex items-center justify-between py-3 border-b border-blush-deep/60">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 text-peony-700" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="blush" size="sm">
                BẢNG VINH DANH QUỐC GIA
              </Badge>
            </div>
            <h1 className="text-base sm:text-xl font-black uppercase tracking-tight text-ink mt-0.5">
              KẾT QUẢ ĐIỀU HÀNH NHIỆM KỲ
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLeaderboard}
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`w-4 h-4 text-peony-700 ${loading ? 'animate-spin' : ''}`} />
          </Button>

          <Link href="/game">
            <Button variant="primary" size="sm">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Vào Nhiệm Kỳ</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Podium Top 3 (🥈 🥇 🥉) in Soft Pastel Cards */}
      {leaderboard.length >= 3 && !searchTerm && (
        <section className="max-w-3xl mx-auto my-6 sm:my-8 grid grid-cols-3 gap-2.5 sm:gap-4 items-end">
          {/* Top 2 - Silver */}
          {top2 && (
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-cotton border-2 border-sky-deep shadow-tactile text-center order-1">
              <span className="text-xl sm:text-2xl mb-1">🥈</span>
              <span className="text-[10px] uppercase font-bold text-cornflower-700">HẠNG 2</span>
              <h3 className="text-xs sm:text-sm font-bold text-ink mt-0.5 line-clamp-2 leading-tight max-w-full text-center min-h-[2rem] flex items-center justify-center">
                {top2.name}
              </h3>
              <p className="text-[10px] text-ink-muted font-mono">{top2.studentId}</p>
              <div className="mt-2 px-3 py-0.5 rounded-pill bg-sky-surface text-cornflower-700 font-bold text-xs font-mono tabular-nums border border-sky-deep">
                {top2.totalScore} Điểm
              </div>
            </div>
          )}

          {/* Top 1 - Gold Honey (Elevated in Center) */}
          {top1 && (
            <div className="flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-highlight-surface border-2 border-highlight shadow-dossier text-center order-2 transform -translate-y-2 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Crown className="w-6 h-6 text-highlight-text animate-bounce" />
              </div>
              <span className="text-2xl sm:text-3xl mb-0.5 mt-1">🥇</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-highlight-text">QUÁN QUÂN</span>
              <h3 className="text-xs sm:text-base font-extrabold text-ink mt-0.5 line-clamp-2 leading-tight max-w-full text-center min-h-[2rem] flex items-center justify-center">
                {top1.name}
              </h3>
              <p className="text-[10px] text-ink-muted font-mono">{top1.studentId}</p>
              <div className="mt-2 px-3 py-1 rounded-pill bg-cotton border-2 border-highlight text-highlight-text font-black text-xs sm:text-sm font-mono tabular-nums shadow-sm">
                {top1.totalScore} Điểm
              </div>
              <span className="text-[9px] sm:text-[10px] text-highlight-text font-semibold mt-1 line-clamp-2 text-center max-w-full leading-tight">
                {top1.rankTitle}
              </span>
            </div>
          )}

          {/* Top 3 - Bronze Blush */}
          {top3 && (
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-cotton border-2 border-blush-deep shadow-tactile text-center order-3">
              <span className="text-xl sm:text-2xl mb-1">🥉</span>
              <span className="text-[10px] uppercase font-bold text-peony-700">HẠNG 3</span>
              <h3 className="text-xs sm:text-sm font-bold text-ink mt-0.5 line-clamp-2 leading-tight max-w-full text-center min-h-[2rem] flex items-center justify-center">
                {top3.name}
              </h3>
              <p className="text-[10px] text-ink-muted font-mono">{top3.studentId}</p>
              <div className="mt-2 px-3 py-0.5 rounded-pill bg-blush-surface text-peony-700 font-bold text-xs font-mono tabular-nums border border-blush-deep">
                {top3.totalScore} Điểm
              </div>
            </div>
          )}
        </section>
      )}

      {/* Main Ranking Table */}
      <main className="max-w-5xl mx-auto rounded-2xl bg-cotton border-2 border-blush-deep shadow-dossier overflow-hidden my-4">
        {/* Search Bar */}
        <div className="p-3 border-b border-blush-deep/60 flex items-center justify-between gap-3 bg-blush-surface/40">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc MSSV..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-cotton border-2 border-blush-deep text-xs text-ink placeholder:text-ink-subtle focus:border-peony outline-none transition-all"
            />
          </div>
          <span className="text-[11px] text-ink-muted">
            Tổng cộng: <strong className="text-ink">{filteredList.length}</strong> sinh viên
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blush-surface text-ink-muted uppercase text-[10px] tracking-wider border-b border-blush-deep font-bold">
              <tr>
                <th className="py-2.5 px-3 text-center w-12">Hạng</th>
                <th className="py-2.5 px-3">Họ và Tên</th>
                <th className="py-2.5 px-3">MSSV</th>
                <th className="py-2.5 px-3 text-center">Nhiệm Kỳ</th>
                <th className="py-2.5 px-3 text-center">Lý Luận</th>
                <th className="py-2.5 px-3 text-center">Tổng Điểm</th>
                <th className="py-2.5 px-3">Xếp Loại Danh Dự</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-deep/40 font-medium text-ink">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-ink-muted italic">
                    {loading ? 'Đang cập nhật bảng vinh danh...' : 'Chưa có kết quả nào phù hợp.'}
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => {
                  const isCurrent = currentStudentId && item.studentId.toLowerCase() === currentStudentId.toLowerCase();

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-blush-surface/60 transition-colors ${
                        isCurrent
                          ? 'bg-blush-surface ring-2 ring-peony'
                          : item.rank === 1
                          ? 'bg-highlight-surface/50'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center font-bold">
                        {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : item.rank}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-ink">
                        <div className="flex items-center space-x-1.5">
                          <span>{item.name}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 rounded-pill text-[9px] font-black uppercase bg-peony text-white flex-shrink-0">
                              BẠN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-ink-muted font-mono text-[11px]">{item.studentId}</td>
                      <td className="py-2.5 px-3 text-center text-ink font-mono tabular-nums whitespace-nowrap">
                        {item.turn}/{item.maxTurns} lượt
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-cornflower-700 font-mono tabular-nums">
                        {item.knowledgeScore}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-pill bg-blush-surface text-peony-700 font-black text-xs font-mono tabular-nums border border-blush-deep">
                          {item.totalScore}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-ink text-[11px]">
                        <span className="font-semibold block">{item.rankTitle}</span>
                        {item.endingTitle && (
                          <span className="text-[10px] text-ink-muted italic block truncate max-w-xs">
                            {item.endingTitle}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
