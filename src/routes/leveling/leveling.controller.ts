import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LeaderboardLevelingService } from "./services/leaderboard.leveling.service";
import { GetUserLevelingService } from "./services/getUser.leveling.service";
import { MessageLevelingService } from "./services/message.leveling.service";

@Controller('api/leveling')
export class LevelingController {
  constructor(
    private readonly leaderboardService: LeaderboardLevelingService,
    private readonly getUserService: GetUserLevelingService,
    private readonly messageLevelingService: MessageLevelingService,
  ) {   }

  @Get('user/:target_id')
  getUser( @Param('target_id') target_id: string, ): any {
    return this.getUserService.getUser(target_id);
  }

  @Get('leaderboard/:count')
  leaderboard( @Param('count') count: number, ): any {
    return this.leaderboardService.getLeaderBoard(count);
  }

  @Post('message')
  message(
    @Body('author_id') author_id: string,
    @Body('author_name') author_name: string,
    @Body('token') token: string,
  ): any {
    return this.messageLevelingService.postMessage(author_id, author_name, token);
  }
}