import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [GameModule, AdminModule],
})
export class AppModule {}
