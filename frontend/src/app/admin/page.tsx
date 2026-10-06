'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Trophy,
  Download,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  BarChart3,
  ShieldAlert,
  Flame,
} from 'lucide-react';

interface PlayerRow {
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
  crisesSolved: number;
  status: 'PLAYING' | 'GAMEOVER' | 'COMPLETED';
  rankTitle: string;
  endingTitle: string;
  totalScore: number;
  lastActiveAt: number;
}

interface ClassStats {
  totalPlayers: number;
  playingCount: number;
  completedCount: number;
  gameOverCount: number;
  avgScore: number;
  avgKnowledge: number;
  avgStats: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
}

export default function AdminPage() {
  const [players, setPlayers] = useState<PlayerRow[]>([]);
  const [stats, setStats] = useState<ClassStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [message, setMessage] = useState<string>('');

  const fetchAdminData = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/players');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const sorted = (data.players || []).map((p: any, idx: number) => ({
            ...p,
            rank: idx + 1,
            turn: p.currentTurn ?? p.turn ?? 0,
          }));
          setPlayers(sorted);
          setStats(data.stats);
        }
      }
    } catch (e) {
      console.warn('Backend not responding yet');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(fetchAdminData, 3000); // Polling every 3s
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn làm mới toàn bộ phiên thi? Dữ liệu của tất cả sinh viên sẽ bị xóa.')) {
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/admin/reset', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Đã làm mới phiên thi.');
      fetchAdminData();
    } catch (e) {
      setMessage('Lỗi kết nối máy chủ.');
    }
    setTimeout(() => setMessage(''), 4000);
  };

  const handleGenerateDemo = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/generate-demo-class', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Đã tạo 60 sinh viên demo.');
      fetchAdminData();
    } catch (e) {
      setMessage('Lỗi kết nối máy chủ.');
    }
    setTimeout(() => setMessage(''), 4000);
  };

  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PLAYING' && p.status === 'PLAYING') ||
      (statusFilter === 'COMPLETED' && p.status === 'COMPLETED') ||
      (statusFilter === 'GAMEOVER' && p.status === 'GAMEOVER');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 presidential-pattern">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
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
                BẢNG QUẢN TRỊ GIẢNG VIÊN
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-100 mt-0.5">
              GIÁM SÁT THỜI GIAN THỰC LỚP HỌC (60 SINH VIÊN)
            </h1>
            <p className="text-xs text-slate-400">
              Môn Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN và Nhà nước pháp quyền XHCN
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export CSV */}
          <a
            href="http://localhost:4000/api/admin/export"
            download="bang_diem_chu_tich_nuoc.csv"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Bảng Điểm (Excel)</span>
          </a>

          {/* Generate Demo 60 Students */}
          <button
            onClick={handleGenerateDemo}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-slate-100 font-bold text-xs uppercase tracking-wider transition-all border border-purple-400/40 active:scale-95"
            title="Tạo nhanh 60 sinh viên giả lập để trình chiếu lớp học"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Tạo 60 SV Demo</span>
          </button>

          {/* Reset Session */}
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-200 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Mới</span>
          </button>
        </div>
      </header>

      {/* Notification Banner */}
      {message && (
        <div className="max-w-7xl mx-auto my-3 p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-bold text-center animate-fade-in">
          {message}
        </div>
      )}

      {/* Class Statistics Overview Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Tổng Sinh Viên</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats?.totalPlayers ?? 0}</span>
            <span className="text-xs text-slate-500">/ 60 SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Đang Chơi</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-sky-400">{stats?.playingCount ?? 0}</span>
            <span className="text-xs text-slate-500">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Đã Hoàn Thành</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{stats?.completedCount ?? 0}</span>
            <span className="text-xs text-slate-500">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Game Over</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-rose-400">{stats?.gameOverCount ?? 0}</span>
            <span className="text-xs text-slate-500">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Điểm TB Lớp</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-300">{stats?.avgScore ?? 0}</span>
            <span className="text-xs text-slate-500">/100</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">Lý Luận (CNXHKH)</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-cyan-300">{stats?.avgKnowledge ?? 0}</span>
            <span className="text-xs text-slate-500">Điểm</span>
          </div>
        </div>
      </section>

      {/* Class Average 4 Pillars Bar */}
      {stats && (
        <section className="max-w-7xl mx-auto my-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
            <BarChart3 className="w-4 h-4" />
            <span>Chỉ Số Quốc Gia Bình Quân Cả Lớp (Mức Độ Cân Bằng Toàn Khóa)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-400">🏛 Chính Trị</span>
                <span className="text-slate-200">{stats.avgStats.politics}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${stats.avgStats.politics}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400">💰 Kinh Tế</span>
                <span className="text-slate-200">{stats.avgStats.economy}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.avgStats.economy}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-sky-500/30">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-sky-400">👥 Nhân Dân</span>
                <span className="text-slate-200">{stats.avgStats.people}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${stats.avgStats.people}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/30">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-purple-400">⚖️ Pháp Quyền</span>
                <span className="text-slate-200">{stats.avgStats.law}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${stats.avgStats.law}%` }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Họ Tên hoặc MSSV..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-amber-400 transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </span>
          {(['ALL', 'PLAYING', 'COMPLETED', 'GAMEOVER'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === filter
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {filter === 'ALL'
                ? 'Tất Cả'
                : filter === 'PLAYING'
                ? 'Đang Chơi'
                : filter === 'COMPLETED'
                ? 'Hoàn Thành'
                : 'Game Over'}
            </button>
          ))}
        </div>
      </section>

      {/* Live Table for 60 Students */}
      <main className="max-w-7xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden my-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] sm:text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3 text-center">Hạng</th>
                <th className="py-3 px-3">Họ và Tên</th>
                <th className="py-3 px-3">MSSV</th>
                <th className="py-3 px-3 text-center">Lượt</th>
                <th className="py-3 px-3 text-center">4 Chỉ Số (🏛/💰/👥/⚖️)</th>
                <th className="py-3 px-3 text-center">Lý Luận</th>
                <th className="py-3 px-3 text-center">Điểm Tổng</th>
                <th className="py-3 px-3 text-center">Trạng Thái</th>
                <th className="py-3 px-3">Xếp Loại / Kết Cục</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 italic">
                    Chưa có sinh viên nào tham gia hoặc không khớp bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player) => {
                  const isTop3 = player.rank <= 3;

                  return (
                    <tr
                      key={player.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isTop3 ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 text-center">
                        {player.rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                            🥇
                          </span>
                        ) : player.rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs shadow-md">
                            🥈
                          </span>
                        ) : player.rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-amber-100 font-black text-xs shadow-md">
                            🥉
                          </span>
                        ) : (
                          <span className="text-slate-400 font-bold">{player.rank}</span>
                        )}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3 font-bold text-slate-200">
                        {player.name}
                      </td>

                      {/* Student ID */}
                      <td className="py-3 px-3 text-slate-400 font-mono text-xs">
                        {player.studentId}
                      </td>

                      {/* Turn */}
                      <td className="py-3 px-3 text-center font-mono">
                        <span className="text-amber-400 font-bold">{player.turn}</span>
                        <span className="text-slate-500 text-[11px]">/{player.maxTurns}</span>
                      </td>

                      {/* 4 Stats Mini Bars */}
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono">
                          <span className="text-red-400 font-semibold" title="Chính trị">
                            {Math.round(player.stats.politics)}
                          </span>
                          <span className="text-slate-600">/</span>
                          <span className="text-emerald-400 font-semibold" title="Kinh tế">
                            {Math.round(player.stats.economy)}
                          </span>
                          <span className="text-slate-600">/</span>
                          <span className="text-sky-400 font-semibold" title="Nhân dân">
                            {Math.round(player.stats.people)}
                          </span>
                          <span className="text-slate-600">/</span>
                          <span className="text-purple-400 font-semibold" title="Pháp quyền">
                            {Math.round(player.stats.law)}
                          </span>
                        </div>
                      </td>

                      {/* Knowledge */}
                      <td className="py-3 px-3 text-center font-bold text-cyan-400">
                        {player.knowledgeScore}
                      </td>

                      {/* Total Score */}
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-black text-sm border border-amber-500/30">
                          {player.totalScore}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        {player.status === 'COMPLETED' ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Hoàn thành</span>
                          </span>
                        ) : player.status === 'GAMEOVER' ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            <XCircle className="w-3 h-3" />
                            <span>Game Over</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/40">
                            <Clock className="w-3 h-3 animate-spin" />
                            <span>Đang chơi</span>
                          </span>
                        )}
                      </td>

                      {/* Rank Title & Ending */}
                      <td className="py-3 px-3 text-xs text-slate-300">
                        <div className="font-semibold">{player.rankTitle || 'Nhiệm kỳ đang tiếp diễn'}</div>
                        {player.endingTitle && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs italic">
                            {player.endingTitle}
                          </div>
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
