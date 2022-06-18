import { Module } from "@nestjs/common";
import { LevelingController } from "./leveling.controller";
import { LeaderboardLevelingService } from "./services/leaderboard.leveling.service";
import { GetUserLevelingService } from "./services/getUser.leveling.service";

@Module({
  controllers: [LevelingController],
  providers: [LeaderboardLevelingService, GetUserLevelingService]
})
export class LevelingModule {  }