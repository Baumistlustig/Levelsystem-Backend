import { Module } from '@nestjs/common';
import { LevelingController } from './leveling.controller';
import { LeaderboardService } from './services/leaderboard.service';
import { GetUserService } from './services/getUser.service';
import { MessageService } from './services/message.service';
import { LinkService } from './services/link.service';
import { SearchService } from './services/search.service';

@Module({
  controllers: [LevelingController],
  providers: [
    LeaderboardService,
    GetUserService,
    MessageService,
    LinkService,
    SearchService,
  ],
})
export class LevelingModule {}
