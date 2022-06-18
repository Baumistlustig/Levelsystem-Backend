import { Body, Controller, Get } from "@nestjs/common";
import { LeaderboardLevelingService } from "./services/leaderboard.leveling.service";
import { GetUserLevelingService } from "./services/getUser.leveling.service";

@Controller('api/leveling')
export class LevelingController {
  constructor(
    private readonly leaderboardService: LeaderboardLevelingService,
    private readonly getUserService: GetUserLevelingService,
  ) {   }

  @Get('leaderboard')
  leaderboard(): any {
    return this.leaderboardService.getLeaderBoard();
  }

  @Get('user')
  user(
    @Body('author_id') author_id: string,
    @Body('target_id') target_id:string,
  ): any {
    return this.getUserService.getUser(author_id, target_id);
  }
}