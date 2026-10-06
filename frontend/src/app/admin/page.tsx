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
  Tv,
  Maximize2,
  Minimize2,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { m } from 'framer-motion';
import { springs } from '@/lib/motion';
import { apiFetch, getExportUrl } from '@/lib/api';

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
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);

  const fetchAdminData = async () => {
    try {
      const res = await apiFetch('/api/admin/players');
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
      const res = await apiFetch('/api/admin/reset', { method: 'POST' });
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
      const res = await apiFetch('/api/admin/generate-demo-class', { method: 'POST' });
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

  // Dedicated Lecturer Projector View (Large text, ultra-high contrast, visible from 10 meters)
  if (isProjectorMode) {
    const top3 = players.slice(0, 3);
    const rest = players.slice(3, 15);

    return (
      <div className="min-h-screen bg-transparent text-ink p-6 sm:p-10 stationery-living-bg flex flex-col justify-between">
        {/* Projector Header */}
        <header className="flex items-center justify-between pb-6 border-b-2 border-blush-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-peony-500 text-white flex items-center justify-center font-black text-2xl shadow-pastel-pink">
              ★
            </div>
            <div>
              <span className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-peony-700 block">
                TRÌNH CHIẾU HỘI TRƯỜNG GIẢNG ĐƯỜNG • 60 SINH VIÊN
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-ink uppercase tracking-wide">
                BẢNG VINH DANH TRỰC TIẾP
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border-2 border-blush-border shadow-xs text-sm sm:text-base font-bold">
              <span className="w-3.5 h-3.5 rounded-full bg-correct animate-ping" />
              <span>{players.length} Sinh Viên Tham Gia</span>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsProjectorMode(false)}
              leftIcon={<Minimize2 className="w-5 h-5" />}
            >
              Thoát Máy Chiếu
            </Button>
          </div>
        </header>

        {/* Top 3 Giant Podium Cards */}
        <div className="my-8 grid grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-end">
          {/* Top 2 */}
          {top3[1] && (
            <div className="p-6 rounded-3xl bg-white border-2 border-sky-border shadow-pastel-blue text-center">
              <span className="text-4xl mb-2 block">🥈</span>
              <span className="text-xs sm:text-sm uppercase font-extrabold text-cornflower-700 tracking-wider">HẠNG 2 TOÀN KHÓA</span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink mt-1 truncate">{top3[1].name}</h2>
              <p className="text-sm sm:text-base font-mono text-ink-muted">{top3[1].studentId}</p>
              <div className="mt-3 px-5 py-2 rounded-2xl bg-sky-subtle text-cornflower-700 font-black text-xl sm:text-2xl border border-sky-border">
                {top3[1].totalScore} Điểm
              </div>
            </div>
          )}

          {/* Top 1 - Quán Quân Spotlight */}
          {top3[0] && (
            <div className="p-8 rounded-3xl bg-white border-4 border-highlight shadow-dossier text-center transform -translate-y-4">
              <Crown className="w-12 h-12 text-highlight mx-auto mb-1 animate-bounce" />
              <span className="text-xs sm:text-sm uppercase font-black text-highlight-text tracking-widest bg-highlight-surface px-4 py-1 rounded-full border border-highlight">
                QUÁN QUÂN NHIỆM KỲ
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-ink mt-3 truncate">{top3[0].name}</h2>
              <p className="text-base sm:text-lg font-mono text-ink-muted mt-0.5">{top3[0].studentId}</p>
              <div className="mt-4 px-6 py-2.5 rounded-2xl bg-highlight-surface text-highlight-text font-black text-3xl sm:text-4xl border-2 border-highlight">
                {top3[0].totalScore} Điểm
              </div>
              <p className="text-sm font-bold text-ink-muted mt-2">{top3[0].rankTitle}</p>
            </div>
          )}

          {/* Top 3 */}
          {top3[2] && (
            <div className="p-6 rounded-3xl bg-white border-2 border-blush-border shadow-pastel-pink text-center">
              <span className="text-4xl mb-2 block">🥉</span>
              <span className="text-xs sm:text-sm uppercase font-extrabold text-peony-700 tracking-wider">HẠNG 3 TOÀN KHÓA</span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink mt-1 truncate">{top3[2].name}</h2>
              <p className="text-sm sm:text-base font-mono text-ink-muted">{top3[2].studentId}</p>
              <div className="mt-3 px-5 py-2 rounded-2xl bg-blush text-peony-700 font-black text-xl sm:text-2xl border border-blush-border">
                {top3[2].totalScore} Điểm
              </div>
            </div>
          )}
        </div>

        {/* Projector Mini Live Stream Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto w-full my-4">
          {rest.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-2xl bg-white border border-blush-border shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-base text-ink-muted w-6 text-center">
                  #{p.rank}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-ink truncate max-w-[140px]">{p.name}</h4>
                  <span className="text-xs font-mono text-ink-muted">{p.turn}/30 lượt</span>
                </div>
              </div>
              <span className="font-mono font-black text-sm sm:text-base text-peony-700 px-2.5 py-1 rounded-xl bg-blush border border-blush-border">
                {p.totalScore}
              </span>
            </div>
          ))}
        </div>

        {/* Projector Footer */}
        <footer className="text-center text-xs sm:text-sm text-ink-muted pt-4 border-t border-blush-border">
          Môn học: Chủ nghĩa xã hội khoa học – Dữ liệu cập nhật trực tiếp qua WebSocket
        </footer>
      </div>
    );
  }

  // Standard Lecturer Dashboard View
  return (
    <div className="min-h-screen stationery-living-bg text-ink p-4 sm:p-8">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blush-border">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white border border-blush-border hover:border-peony-400 text-ink-muted hover:text-ink transition-all shadow-xs"
            title="Về Trang Chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blush text-peony-700 border border-blush-border text-[10px] font-bold uppercase tracking-wider">
                BẢNG QUẢN TRỊ GIẢNG VIÊN
              </span>
              <span className="w-2 h-2 rounded-full bg-correct animate-ping" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-ink mt-0.5">
              GIÁM SÁT THỜI GIAN THỰC LỚP HỌC (60 SINH VIÊN)
            </h1>
            <p className="text-xs text-ink-muted">
              Môn Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN và Nhà nước pháp quyền XHCN
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Projector Mode CTA */}
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsProjectorMode(true)}
            leftIcon={<Tv className="w-4 h-4 text-cornflower-700" />}
          >
            Chế Độ Máy Chiếu
          </Button>

          {/* Export CSV */}
          <a
            href={getExportUrl()}
            download="bang_diem_chu_tich_nuoc.csv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="w-4 h-4 text-correct" />}
            >
              Xuất Excel
            </Button>
          </a>

          {/* Generate Demo 60 Students */}
          <Button
            variant="outline"
            size="md"
            onClick={handleGenerateDemo}
            leftIcon={<Sparkles className="w-4 h-4 text-peony-500" />}
            title="Tạo nhanh 60 sinh viên giả lập để trình chiếu lớp học"
          >
            Tạo 60 SV Demo
          </Button>

          {/* Reset Session */}
          <Button
            variant="danger"
            size="md"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Làm Mới
          </Button>
        </div>
      </header>

      {/* Notification Banner */}
      {message && (
        <div className="max-w-7xl mx-auto my-3 p-3 rounded-xl bg-blush border border-peony-300 text-peony-800 text-xs font-bold text-center animate-fade-in shadow-xs">
          {message}
        </div>
      )}

      {/* Class Statistics Overview Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-white border border-blush-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-ink-muted uppercase block">Tổng Sinh Viên</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-ink">{stats?.totalPlayers ?? 0}</span>
            <span className="text-xs text-ink-muted font-mono">/ 60 SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-sky-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-cornflower-700 uppercase block">Đang Chơi</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-cornflower-700">{stats?.playingCount ?? 0}</span>
            <span className="text-xs text-ink-muted">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-correct-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-correct-text uppercase block">Đã Hoàn Thành</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-correct">{stats?.completedCount ?? 0}</span>
            <span className="text-xs text-ink-muted">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-wrong-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-wrong-text uppercase block">Game Over</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-wrong">{stats?.gameOverCount ?? 0}</span>
            <span className="text-xs text-ink-muted">SV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-highlight-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-highlight-text uppercase block">Điểm TB Lớp</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-highlight-text">{stats?.avgScore ?? 0}</span>
            <span className="text-xs text-ink-muted font-mono">/100</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-blush-border shadow-pastel-card">
          <span className="text-[11px] font-semibold text-peony-700 uppercase block">Lý Luận (CNXHKH)</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-peony-700">{stats?.avgKnowledge ?? 0}</span>
            <span className="text-xs text-ink-muted">Điểm</span>
          </div>
        </div>
      </section>

      {/* Class Average 4 Pillars Bar */}
      {stats && (
        <section className="max-w-7xl mx-auto my-4 p-4 rounded-2xl bg-white border border-blush-border shadow-pastel-card">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-peony-700 mb-3">
            <BarChart3 className="w-4 h-4" />
            <span>Chỉ Số Quốc Gia Bình Quân Cả Lớp (Mức Độ Cân Bằng Toàn Khóa)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-blush-subtle border border-blush-border">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-peony-700">🏛 Chính Trị</span>
                <span className="text-ink font-mono">{stats.avgStats.politics}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-blush overflow-hidden">
                <div className="h-full bg-peony-500 rounded-full" style={{ width: `${stats.avgStats.politics}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-correct-surface border border-correct-border">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-correct-text">💰 Kinh Tế</span>
                <span className="text-ink font-mono">{stats.avgStats.economy}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-correct-border overflow-hidden">
                <div className="h-full bg-correct rounded-full" style={{ width: `${stats.avgStats.economy}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-subtle border border-sky-border">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-cornflower-700">👥 Nhân Dân</span>
                <span className="text-ink font-mono">{stats.avgStats.people}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-sky overflow-hidden">
                <div className="h-full bg-cornflower-500 rounded-full" style={{ width: `${stats.avgStats.people}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cotton border border-blush-border">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-ink">⚖️ Pháp Quyền</span>
                <span className="text-ink font-mono">{stats.avgStats.law}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-blush-subtle overflow-hidden">
                <div className="h-full bg-cornflower-700 rounded-full" style={{ width: `${stats.avgStats.law}%` }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Họ Tên hoặc MSSV..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-blush-border text-xs sm:text-sm text-ink placeholder:text-ink-faint outline-none focus:border-peony-500 focus:ring-2 focus:ring-peony-200 transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-ink-muted font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </span>
          {(['ALL', 'PLAYING', 'COMPLETED', 'GAMEOVER'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === filter
                  ? 'bg-peony-500 text-white shadow-pastel-pink'
                  : 'bg-white text-ink-muted hover:text-ink border border-blush-border shadow-xs'
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
      <main className="max-w-7xl mx-auto rounded-3xl bg-white border-2 border-blush-border shadow-dossier overflow-hidden my-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-blush-subtle text-ink-muted uppercase text-xs tracking-wider border-b border-blush-border">
              <tr>
                <th className="py-3.5 px-3.5 text-center">Hạng</th>
                <th className="py-3.5 px-3.5">Họ và Tên</th>
                <th className="py-3.5 px-3.5">MSSV</th>
                <th className="py-3.5 px-3.5 text-center">Lượt</th>
                <th className="py-3.5 px-3.5 text-center">4 Chỉ Số (🏛/💰/👥/⚖️)</th>
                <th className="py-3.5 px-3.5 text-center">Lý Luận</th>
                <th className="py-3.5 px-3.5 text-center">Điểm Tổng</th>
                <th className="py-3.5 px-3.5 text-center">Trạng Thái</th>
                <th className="py-3.5 px-3.5">Xếp Loại / Kết Cục</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-border/50 font-medium">
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-ink-muted italic text-sm">
                    Chưa có sinh viên nào tham gia hoặc không khớp bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player) => {
                  const isTop3 = player.rank <= 3;

                  return (
                    <m.tr
                      layout
                      transition={springs.scoreboardRow}
                      key={player.id}
                      className={`hover:bg-blush-subtle/50 transition-colors ${
                        isTop3 ? 'bg-highlight-surface/20' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-3.5 text-center">
                        {player.rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-highlight text-ink font-black text-sm shadow-xs">
                            🥇
                          </span>
                        ) : player.rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky text-cornflower-700 font-black text-sm shadow-xs">
                            🥈
                          </span>
                        ) : player.rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blush text-peony-700 font-black text-sm shadow-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="text-ink-muted font-mono font-bold text-sm sm:text-base">{player.rank}</span>
                        )}
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-3.5 font-bold text-ink">
                        {player.name}
                      </td>

                      {/* Student ID */}
                      <td className="py-3.5 px-3.5 text-ink-muted font-mono text-xs sm:text-sm">
                        {player.studentId}
                      </td>

                      {/* Turn */}
                      <td className="py-3.5 px-3.5 text-center font-mono">
                        <span className="text-peony-700 font-bold text-sm sm:text-base">{player.turn}</span>
                        <span className="text-ink-muted text-xs">/{player.maxTurns}</span>
                      </td>

                      {/* 4 Stats Mini Numbers */}
                      <td className="py-3.5 px-3.5 text-center">
                        <div className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-mono">
                          <span className="text-peony-700 font-bold" title="Chính trị">
                            {Math.round(player.stats.politics)}
                          </span>
                          <span className="text-ink-faint">/</span>
                          <span className="text-correct-text font-bold" title="Kinh tế">
                            {Math.round(player.stats.economy)}
                          </span>
                          <span className="text-ink-faint">/</span>
                          <span className="text-cornflower-700 font-bold" title="Nhân dân">
                            {Math.round(player.stats.people)}
                          </span>
                          <span className="text-ink-faint">/</span>
                          <span className="text-ink font-bold" title="Pháp quyền">
                            {Math.round(player.stats.law)}
                          </span>
                        </div>
                      </td>

                      {/* Knowledge */}
                      <td className="py-3.5 px-3.5 text-center font-bold text-cornflower-700 font-mono text-sm sm:text-base">
                        {player.knowledgeScore}
                      </td>

                      {/* Total Score */}
                      <td className="py-3.5 px-3.5 text-center">
                        <span className="px-3 py-1 rounded-xl bg-blush text-peony-700 font-black text-sm sm:text-base border border-blush-border">
                          {player.totalScore}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3.5 text-center">
                        {player.status === 'COMPLETED' ? (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-correct-surface text-correct-text border border-correct-border">
                            <CheckCircle2 className="w-3.5 h-3.5 text-correct" />
                            <span>Hoàn thành</span>
                          </span>
                        ) : player.status === 'GAMEOVER' ? (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-wrong-surface text-wrong-text border border-wrong-border">
                            <XCircle className="w-3.5 h-3.5 text-wrong" />
                            <span>Game Over</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-subtle text-cornflower-700 border border-sky-border">
                            <Clock className="w-3.5 h-3.5 animate-spin text-cornflower-600" />
                            <span>Đang chơi</span>
                          </span>
                        )}
                      </td>

                      {/* Rank Title & Ending */}
                      <td className="py-3.5 px-3.5 text-ink">
                        <div className="font-bold text-xs sm:text-sm">{player.rankTitle || 'Nhiệm kỳ đang tiếp diễn'}</div>
                        {player.endingTitle && (
                          <div className="text-xs text-ink-muted truncate max-w-xs italic mt-0.5">
                            {player.endingTitle}
                          </div>
                        )}
                      </td>
                    </m.tr>
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
