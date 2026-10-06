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
  ArrowUpDown,
  Tv,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
  const [sortBy, setSortBy] = useState<'SCORE' | 'TURN' | 'KNOWLEDGE' | 'NAME'>('SCORE');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);

  const fetchAdminData = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/players`);
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
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('projector') === 'true' || params.get('projector') === '1') {
        setIsProjectorMode(true);
      }
    }
    fetchAdminData();
    const interval = setInterval(fetchAdminData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn làm mới toàn bộ phiên thi? Dữ liệu của tất cả sinh viên sẽ bị xóa.')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/reset`, { method: 'POST' });
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
      const res = await fetch(`${API_BASE}/api/admin/generate-demo-class`, { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Đã tạo 60 sinh viên demo.');
      fetchAdminData();
    } catch (e) {
      setMessage('Lỗi kết nối máy chủ.');
    }
    setTimeout(() => setMessage(''), 4000);
  };

  // Filter & Sort
  const processedPlayers = players
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'PLAYING' && p.status === 'PLAYING') ||
        (statusFilter === 'COMPLETED' && p.status === 'COMPLETED') ||
        (statusFilter === 'GAMEOVER' && p.status === 'GAMEOVER');
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'SCORE') return b.totalScore - a.totalScore;
      if (sortBy === 'TURN') return b.turn - a.turn;
      if (sortBy === 'KNOWLEDGE') return b.knowledgeScore - a.knowledgeScore;
      if (sortBy === 'NAME') return a.name.localeCompare(b.name, 'vi');
      return 0;
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
    <div className={`min-h-screen living-pastel-bg text-ink p-3 sm:p-6 transition-all ${isProjectorMode ? 'p-6 sm:p-10' : ''}`}>
      {/* Header - Classroom Mission Control */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-blush-deep/60">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 text-peony-700" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="blush" size="sm">
                TRUNG TÂM ĐIỀU HÀNH LỚP HỌC
              </Badge>
              <span className="w-2 h-2 rounded-full bg-correct animate-pulse" />
              <span className="text-[10px] font-mono text-correct-text font-bold">REALTIME TELEMETRY</span>
            </div>
            <h1 className={`${isProjectorMode ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-2xl'} font-black uppercase tracking-tight text-ink mt-1`}>
              GIÁM SÁT TIẾN ĐỘ & KẾT QUẢ ĐIỀU HÀNH {stats?.totalPlayers !== undefined ? `(${stats.totalPlayers} SINH VIÊN)` : ''}
            </h1>
          </div>
        </div>

        {/* Action Controls & Projector Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Projector Mode Toggle */}
          <Toggle
            checked={isProjectorMode}
            onChange={setIsProjectorMode}
            label={isProjectorMode ? 'Máy chiếu (Bật)' : 'Chế độ Máy Chiếu'}
            icon={<Tv className="w-3.5 h-3.5 text-peony-700" />}
          />

          {/* Export CSV (UTF-8 BOM supported) */}
          <a
            href={`${API_BASE}/api/admin/export`}
            download="bang_diem_chu_tich_nuoc.csv"
          >
            <Button variant="secondary" size="sm">
              <Download className="w-3.5 h-3.5 text-cornflower-700" />
              <span>Xuất Bảng Điểm</span>
            </Button>
          </a>

          {/* Generate Demo 60 Students */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateDemo}
            title="Tạo nhanh 60 sinh viên giả lập để trình chiếu lớp học"
          >
            <Sparkles className="w-3.5 h-3.5 text-peony" />
            <span>Tạo 60 SV Demo</span>
          </Button>

          {/* Reset Session */}
          <Button
            variant="coral"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5 text-wrong-text" />
            <span>Làm Mới Phòng</span>
          </Button>
        </div>
      </header>

      {/* Notification Banner */}
      {message && (
        <div className="max-w-7xl mx-auto my-3 p-3 rounded-xl bg-blush-surface border-2 border-peony text-peony-700 text-xs font-bold text-center animate-fade-in shadow-tactile">
          {message}
        </div>
      )}

      {/* Class Statistics Overview Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-4">
        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-blush-deep/60 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Tổng Sĩ Số</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-peony-700 font-mono tabular-nums`}>{stats?.totalPlayers ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">/ 60 SV</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-sky-deep/60 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Đang Điều Hành</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-cornflower-700 font-mono tabular-nums`}>{stats?.playingCount ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">SV</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-correct/40 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Hoàn Thành (30 Lượt)</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-correct-text font-mono tabular-nums`}>{stats?.completedCount ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">SV</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-wrong/40 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Khủng Hoảng (Over)</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-wrong-text font-mono tabular-nums`}>{stats?.gameOverCount ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">SV</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-highlight/50 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Điểm TB Lớp</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-highlight-text font-mono tabular-nums`}>{stats?.avgScore ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">/ 100</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cotton border-2 border-sky-deep/60 shadow-tactile">
          <span className="text-[10px] font-bold text-ink-muted uppercase block tracking-wider">Lý Luận Mác - Lênin</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className={`${isProjectorMode ? 'text-3xl' : 'text-2xl'} font-black text-cornflower-700 font-mono tabular-nums`}>{stats?.avgKnowledge ?? 0}</span>
            <span className="text-[11px] text-ink-subtle">Điểm</span>
          </div>
        </div>
      </section>

      {/* Class Average 4 Pillars Bar */}
      {stats && (
        <section className="max-w-7xl mx-auto my-3 p-4 rounded-2xl bg-cotton border-2 border-blush-deep/60 shadow-tactile">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-peony-700 mb-2.5">
            <BarChart3 className="w-4 h-4 text-peony" />
            <span>Chỉ Số Quốc Gia Bình Quân Cả Lớp (Mức Độ Cân Bằng Thể Chế)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-blush-surface border border-blush-deep">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-wrong-text text-[11px]">🏛 Chính Trị</span>
                <span className="text-ink font-mono tabular-nums text-[11px]">{stats.avgStats.politics}/100</span>
              </div>
              <div className="w-full h-2 rounded-pill bg-white overflow-hidden border border-blush-deep/40">
                <div className="h-full bg-wrong rounded-pill" style={{ width: `${stats.avgStats.politics}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-correct-surface border border-correct/40">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-correct-text text-[11px]">💰 Kinh Tế</span>
                <span className="text-ink font-mono tabular-nums text-[11px]">{stats.avgStats.economy}/100</span>
              </div>
              <div className="w-full h-2 rounded-pill bg-white overflow-hidden border border-correct/40">
                <div className="h-full bg-correct rounded-pill" style={{ width: `${stats.avgStats.economy}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-surface border border-sky-deep">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-cornflower-700 text-[11px]">👥 Nhân Dân</span>
                <span className="text-ink font-mono tabular-nums text-[11px]">{stats.avgStats.people}/100</span>
              </div>
              <div className="w-full h-2 rounded-pill bg-white overflow-hidden border border-sky-deep/40">
                <div className="h-full bg-cornflower rounded-pill" style={{ width: `${stats.avgStats.people}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blush-surface border border-blush-deep">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-peony-700 text-[11px]">⚖️ Pháp Quyền</span>
                <span className="text-ink font-mono tabular-nums text-[11px]">{stats.avgStats.law}/100</span>
              </div>
              <div className="w-full h-2 rounded-pill bg-white overflow-hidden border border-blush-deep/40">
                <div className="h-full bg-peony rounded-pill" style={{ width: `${stats.avgStats.law}%` }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter, Search & Sort Toolbar */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 my-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Họ Tên hoặc MSSV..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-cotton border-2 border-blush-deep text-xs text-ink placeholder:text-ink-subtle outline-none focus:border-peony transition-all"
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-cotton p-0.5 rounded-lg border-2 border-blush-deep">
            {(['ALL', 'PLAYING', 'COMPLETED', 'GAMEOVER'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  statusFilter === filter
                    ? 'bg-peony text-white shadow-tactile'
                    : 'text-ink-muted hover:text-ink'
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

          {/* Sort Selector */}
          <div className="flex items-center space-x-1 bg-cotton px-2.5 py-1.5 rounded-lg border-2 border-blush-deep text-[11px]">
            <ArrowUpDown className="w-3.5 h-3.5 text-peony" />
            <span className="text-ink-muted font-bold">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-ink font-semibold outline-none cursor-pointer"
            >
              <option value="SCORE">Điểm Tổng (Cao → Thấp)</option>
              <option value="TURN">Số Lượt Đạt (Cao → Thấp)</option>
              <option value="KNOWLEDGE">Điểm Lý Luận</option>
              <option value="NAME">Họ và Tên (A → Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Live Table for 60 Students */}
      <main className="max-w-7xl mx-auto rounded-2xl bg-cotton border-2 border-blush-deep shadow-dossier overflow-hidden my-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blush-surface text-ink-muted uppercase text-[10px] tracking-wider border-b border-blush-deep font-bold">
              <tr>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>Hạng</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'}`}>Họ và Tên</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'}`}>MSSV</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>Tiến Độ</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>4 Trụ Cột</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>Lý Luận</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>Tổng Điểm</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'} text-center`}>Trạng Thái</th>
                <th className={`${isProjectorMode ? 'py-4 px-4 text-xs font-black' : 'py-3 px-3 text-[10px] font-bold'}`}>Xếp Loại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-deep/40 font-medium text-ink">
              {processedPlayers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-ink-muted italic">
                    {loading ? 'Đang cập nhật danh sách sinh viên...' : 'Chưa có sinh viên nào tham gia hoặc không khớp bộ lọc.'}
                  </td>
                </tr>
              ) : (
                processedPlayers.map((player) => {
                  const isTop3 = player.rank <= 3;

                  return (
                    <m.tr
                      layout
                      transition={springs.scoreboardRow}
                      key={player.id}
                      className={`hover:bg-blush-surface/50 transition-colors ${
                        isTop3 ? 'bg-highlight-surface/40' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-base sm:text-lg' : 'py-2.5 px-3 text-xs'} text-center font-bold`}>
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                      </td>

                      {/* Name */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-sm sm:text-base' : 'py-2.5 px-3 text-xs'} font-bold text-ink`}>
                        {player.name}
                      </td>

                      {/* Student ID */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-xs' : 'py-2.5 px-3 text-[11px]'} text-ink-muted font-mono`}>
                        {player.studentId}
                      </td>

                      {/* Turn */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-sm' : 'py-2.5 px-3 text-xs'} text-center font-mono tabular-nums`}>
                        <span className="text-peony-700 font-bold">{player.turn}</span>
                        <span className="text-ink-subtle text-[10px]">/{player.maxTurns}</span>
                      </td>

                      {/* 4 Stats Mini Bars */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-xs' : 'py-2.5 px-3 text-[11px]'} text-center`}>
                        <div className="inline-flex items-center space-x-1 font-mono tabular-nums">
                          <span className="text-wrong-text font-bold" title="Chính trị">
                            {Math.round(player.stats.politics)}
                          </span>
                          <span className="text-ink-subtle">/</span>
                          <span className="text-correct-text font-bold" title="Kinh tế">
                            {Math.round(player.stats.economy)}
                          </span>
                          <span className="text-ink-subtle">/</span>
                          <span className="text-cornflower-700 font-bold" title="Nhân dân">
                            {Math.round(player.stats.people)}
                          </span>
                          <span className="text-ink-subtle">/</span>
                          <span className="text-peony-700 font-bold" title="Pháp quyền">
                            {Math.round(player.stats.law)}
                          </span>
                        </div>
                      </td>

                      {/* Knowledge */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-sm' : 'py-2.5 px-3 text-xs'} text-center font-bold text-cornflower-700 font-mono tabular-nums`}>
                        {player.knowledgeScore}
                      </td>

                      {/* Total Score */}
                      <td className={`${isProjectorMode ? 'py-4 px-4' : 'py-2.5 px-3'} text-center`}>
                        <span className={`${isProjectorMode ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'} rounded-pill bg-blush-surface text-peony-700 font-black font-mono tabular-nums border border-blush-deep`}>
                          {player.totalScore}
                        </span>
                      </td>

                      {/* Status */}
                      <td className={`${isProjectorMode ? 'py-4 px-4' : 'py-2.5 px-3'} text-center`}>
                        {player.status === 'COMPLETED' ? (
                          <span className={`inline-flex items-center space-x-1 ${isProjectorMode ? 'px-3 py-1 text-[11px]' : 'px-2.5 py-0.5 text-[9px]'} rounded-pill font-bold uppercase tracking-wider bg-correct-surface text-correct-text border border-correct/40`}>
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Hoàn thành</span>
                          </span>
                        ) : player.status === 'GAMEOVER' ? (
                          <span className={`inline-flex items-center space-x-1 ${isProjectorMode ? 'px-3 py-1 text-[11px]' : 'px-2.5 py-0.5 text-[9px]'} rounded-pill font-bold uppercase tracking-wider bg-wrong-surface text-wrong-text border border-wrong/40`}>
                            <XCircle className="w-2.5 h-2.5" />
                            <span>Game Over</span>
                          </span>
                        ) : (
                          <span className={`inline-flex items-center space-x-1 ${isProjectorMode ? 'px-3 py-1 text-[11px]' : 'px-2.5 py-0.5 text-[9px]'} rounded-pill font-bold uppercase tracking-wider bg-sky-surface text-cornflower-700 border border-sky-deep`}>
                            <Clock className="w-2.5 h-2.5 animate-spin" />
                            <span>Đang chơi</span>
                          </span>
                        )}
                      </td>

                      {/* Rank Title & Ending */}
                      <td className={`${isProjectorMode ? 'py-4 px-4 text-xs' : 'py-2.5 px-3 text-[11px]'} text-ink`}>
                        <div className="font-semibold">{player.rankTitle || 'Nhiệm kỳ đang tiếp diễn'}</div>
                        {player.endingTitle && (
                          <div className="text-[10px] text-ink-muted truncate max-w-xs italic">
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
