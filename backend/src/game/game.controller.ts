import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { DECISION_CARDS, CHARACTERS, GAME_ENDINGS } from '../data/cards';

@Controller('api/player')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameGateway: GameGateway,
  ) {}

  @Post('join')
  join(@Body() body: { name: string; studentId: string }) {
    const player = this.gameService.joinGame(body.name, body.studentId);
    this.gameGateway.broadcastUpdates();
    return { success: true, player };
  }

  @Post('action')
  action(
    @Body()
    body: {
      playerId: string;
      turn: number;
      cardId: number;
      choice: 'left' | 'right';
      effects: { politics: number; economy: number; people: number; law: number };
      knowledgeDelta?: number;
      setFlags?: Record<string, any>;
      newStats?: { politics: number; economy: number; people: number; law: number };
      newKnowledgeScore?: number;
    },
  ) {
    const player = this.gameService.submitAction(body.playerId, body);
    if (player) {
      this.gameGateway.broadcastUpdates();
    }
    return { success: !!player, player };
  }

  @Post('finish')
  finish(
    @Body()
    body: {
      playerId: string;
      status: 'GAMEOVER' | 'COMPLETED';
      endingId?: string;
      finalTurn?: number;
    },
  ) {
    const player = this.gameService.finishGame(body.playerId, body);
    if (player) {
      this.gameGateway.broadcastUpdates();
    }
    return { success: !!player, player };
  }

  @Get('leaderboard')
  getLeaderboard(@Query('limit') limit?: string) {
    const count = limit ? parseInt(limit, 10) : 60;
    return {
      success: true,
      leaderboard: this.gameService.getLeaderboard(count),
      stats: this.gameService.getClassStats(),
    };
  }

  @Get('info/:id')
  getPlayer(@Param('id') id: string) {
    const player = this.gameService.getPlayer(id);
    return { success: !!player, player };
  }

  @Get('cards')
  getCards() {
    return { success: true, count: DECISION_CARDS.length, cards: DECISION_CARDS };
  }

  @Get('characters')
  getCharacters() {
    return { success: true, characters: CHARACTERS };
  }

  @Get('endings')
  getEndings() {
    return { success: true, endings: GAME_ENDINGS };
  }
}
