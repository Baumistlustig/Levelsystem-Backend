import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LeaderboardService } from './services/leaderboard.service';
import { GetUserService } from './services/getUser.service';
import { MessageService } from './services/message.service';
import { LinkService } from './services/link.service';
import { SearchService } from './services/search.service';

@Controller('api/leveling')
export class LevelingController {
  constructor(
    private readonly leaderboardService: LeaderboardService,
    private readonly getUserService: GetUserService,
    private readonly messageLevelingService: MessageService,
    private readonly linkLevelingService: LinkService,
    private readonly searchLevelingService: SearchService,
  ) {}

  @Get('user/:target_id')
  getUser(@Param('target_id') target_id: string): any {
    return this.getUserService.getUser(target_id);
  }

  @Get('leaderboard/:count')
  leaderboard(@Param('count') count: number): any {
    return this.leaderboardService.getLeaderBoard(count);
  }

  @Post('message')
  message(
    @Body('author_id') author_id: string,
    @Body('author_name') author_name: string,
    @Body('token') token: string,
    @Body('discord_avatar') avatar: string,
  ): any {
    return this.messageLevelingService.postMessage(
      author_id,
      author_name,
      token,
      avatar,
    );
  }

  @Patch('link')
  link(
    @Body('author_id') author_id: string,
    @Body('token') token: string,
    @Body('minecraft_username') minecraft_username: string,
  ): any {
    return this.linkLevelingService.linkUser(
      author_id,
      token,
      minecraft_username,
    );
  }

  @Get('search/:username')
  search(@Param('username') username: string): any {
    return this.searchLevelingService.searchUser(username);
  }
}
