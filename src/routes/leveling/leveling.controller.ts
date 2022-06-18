import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { LeaderboardLevelingService } from "./services/leaderboard.leveling.service";
import { GetUserLevelingService } from "./services/getUser.leveling.service";
import { MessageLevelingService } from "./services/message.leveling.service";
import { LinkLevelingService } from "./services/link.leveling.service";
import { SearchLevelingService } from "./services/search.leveling.service";

@Controller('api/leveling')
export class LevelingController {
  constructor(
    private readonly leaderboardService: LeaderboardLevelingService,
    private readonly getUserService: GetUserLevelingService,
    private readonly messageLevelingService: MessageLevelingService,
    private readonly linkLevelingService: LinkLevelingService,
    private readonly searchLevelingService: SearchLevelingService,
  ) {  }

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

  @Patch('link')
  link(
    @Body('author_id') author_id: string,
    @Body('token') token: string,
    @Body('minecraft_username') minecraft_username:string
  ): any {
    return this.linkLevelingService.linkUser(author_id, token, minecraft_username) ;
  }

  @Get('search/:username')
  search( @Param('username') username: string, ): any {
    return this.searchLevelingService.searchUser(username);
  }
}