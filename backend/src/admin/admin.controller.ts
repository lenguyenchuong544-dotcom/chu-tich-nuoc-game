import { Controller, Get, Post, Header, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { GameService } from '../game/game.service';
import { GameGateway } from '../game/game.gateway';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameGateway: GameGateway,
  ) {}

  @Get('players')
  getAllPlayers() {
    return {
      success: true,
      players: this.gameService.getAllPlayers(),
      stats: this.gameService.getClassStats(),
    };
  }

  @Get('stats')
  getStats() {
    return {
      success: true,
      stats: this.gameService.getClassStats(),
    };
  }

  @Post('reset')
  reset() {
    this.gameService.resetAll();
    this.gameGateway.broadcastUpdates();
    return { success: true, message: 'Đã xóa toàn bộ dữ liệu phòng thi.' };
  }

  @Get('export')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="bang_diem_nhiem_ky_chu_tich_nuoc.csv"')
  exportCsv(@Res() res: Response) {
    const csv = '\uFEFF' + this.gameService.exportCsv(); // Add BOM for Excel UTF-8 support
    res.send(csv);
  }

  @Post('generate-demo-class')
  generateDemoClass() {
    const vietnameseNames = [
      'Nguyễn Văn An', 'Trần Thị Mai', 'Lê Hoàng Nam', 'Phạm Quốc Việt', 'Vũ Thị Lan',
      'Đặng Minh Khôi', 'Hoàng Đình Trọng', 'Bùi Văn Thắng', 'Đỗ Thị Nga', 'Nguyễn Thị Tâm',
      'Trần Văn Long', 'Lê Tuấn Anh', 'Phạm Minh Tuấn', 'Ngô Thu Hà', 'Đinh Công Lý',
      'Dương Hải Đăng', 'Võ Hoài Nam', 'Lý Gia Bảo', 'Đoàn Thúy Vy', 'Bùi Hồng Nhung',
      'Trịnh Bá Đạt', 'Lưu Quốc Hùng', 'Phan Thanh Thảo', 'Hồ Vĩnh Phúc', 'Trương Diệu Linh',
      'Đào Văn Quyết', 'Mai Thanh Vân', 'Cao Tiến Dũng', 'Lương Đức Huy', 'Tạ Ngọc Bích',
      'Chu Đình Trọng', 'Vũ Quốc Khánh', 'Đỗ Phương Anh', 'Lê Kim Ngân', 'Nguyễn Đức Trọng',
      'Hoàng Minh Trí', 'Vương Đình Huệ', 'Phan Đăng Lưu', 'Tô Ngọc Vân', 'Trần Phú Quý',
      'Vũ Đình Tuyên', 'Nguyễn Hữu Thắng', 'Đặng Thùy Trang', 'Bạch Thái Bưởi', 'Nguyễn Hải Phong',
      'Trần Quang Khải', 'Lê Lợi Đức', 'Phạm Hồng Thái', 'Võ Thị Sáu', 'Nguyễn Thái Học',
      'Lê Hồng Phong', 'Hà Huy Tập', 'Nguyễn Văn Cừ', 'Trường Chinh', 'Phạm Văn Đồng',
      'Võ Nguyên Giáp', 'Văn Tiến Dũng', 'Nguyễn Chí Thanh', 'Lê Duẩn', 'Huỳnh Thúc Kháng'
    ];

    for (let i = 0; i < 60; i++) {
      const name = vietnameseNames[i] || `Sinh viên ${i + 1}`;
      const studentId = `K65_${1000 + i}`;
      const session = this.gameService.joinGame(name, studentId);

      const turn = Math.floor(10 + Math.random() * 21);
      const isComplete = turn >= 30;
      const isGameOver = !isComplete && Math.random() < 0.2;

      const pol = isGameOver ? 0 : Math.floor(40 + Math.random() * 55);
      const eco = Math.floor(35 + Math.random() * 60);
      const peo = Math.floor(40 + Math.random() * 55);
      const law = Math.floor(45 + Math.random() * 50);

      const know = Math.floor(50 + Math.random() * 45);

      this.gameService.submitAction(session.id, {
        turn,
        cardId: 10 + Math.floor(Math.random() * 20),
        choice: Math.random() > 0.5 ? 'right' : 'left',
        effects: { politics: 0, economy: 0, people: 0, law: 0 },
        newStats: { politics: pol, economy: eco, people: peo, law: law },
        newKnowledgeScore: know,
      });

      if (isComplete) {
        this.gameService.finishGame(session.id, { status: 'COMPLETED', finalTurn: 30 });
      } else if (isGameOver) {
        this.gameService.finishGame(session.id, { status: 'GAMEOVER', finalTurn: turn });
      }
    }

    this.gameGateway.broadcastUpdates();
    return {
      success: true,
      message: 'Đã tạo thành công dữ liệu mẫu 60 sinh viên trong lớp học!',
      stats: this.gameService.getClassStats(),
    };
  }
}
