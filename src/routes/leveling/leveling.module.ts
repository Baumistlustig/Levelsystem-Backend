import { Module } from '@nestjs/common';
import { LevelingController } from './leveling.controller';
import { LeaderboardLevelingService } from './services/leaderboard.leveling.service';
import { GetUserLevelingService } from './services/getUser.leveling.service';
import { MessageLevelingService } from './services/message.leveling.service';
import { LinkLevelingService } from './services/link.leveling.service';
import { SearchLevelingService } from './services/search.leveling.service';

@Module({
  controllers: [LevelingController],
  providers: [
    LeaderboardLevelingService,
    GetUserLevelingService,
    MessageLevelingService,
    LinkLevelingService,
    SearchLevelingService,
  ],
})
export class LevelingModule {}
