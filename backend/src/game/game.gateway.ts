import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    // client connected
  }

  handleDisconnect(client: Socket) {
    // client disconnected
  }

  @SubscribeMessage('joinGame')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { name: string; studentId: string },
  ) {
    const player = this.gameService.joinGame(data.name, data.studentId, client.id);
    client.join('players');
    client.emit('joined', player);

    // Broadcast updated leaderboard to admin and players
    this.broadcastUpdates();
    return player;
  }

  @SubscribeMessage('playerAction')
  handleAction(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
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
    const updated = this.gameService.submitAction(data.playerId, data);
    if (updated) {
      client.emit('playerUpdated', updated);
      this.broadcastUpdates();
    }
    return updated;
  }

  @SubscribeMessage('finishGame')
  handleFinish(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      playerId: string;
      status: 'GAMEOVER' | 'COMPLETED';
      endingId?: string;
      finalTurn?: number;
    },
  ) {
    const updated = this.gameService.finishGame(data.playerId, data);
    if (updated) {
      client.emit('playerFinished', updated);
      this.broadcastUpdates();
    }
    return updated;
  }

  @SubscribeMessage('joinAdmin')
  handleJoinAdmin(@ConnectedSocket() client: Socket) {
    client.join('admin');
    const leaderboard = this.gameService.getLeaderboard(60);
    const classStats = this.gameService.getClassStats();
    client.emit('adminState', { leaderboard, classStats });
  }

  @SubscribeMessage('requestStats')
  handleRequestStats(@ConnectedSocket() client: Socket) {
    const leaderboard = this.gameService.getLeaderboard(60);
    const classStats = this.gameService.getClassStats();
    client.emit('leaderboardUpdate', { leaderboard, classStats });
  }

  broadcastUpdates() {
    const leaderboard = this.gameService.getLeaderboard(60);
    const classStats = this.gameService.getClassStats();
    this.server.emit('leaderboardUpdate', { leaderboard, classStats });
  }
}
