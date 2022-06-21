import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database';

@Injectable()
export class LeaderboardLevelingService {
  async getLeaderBoard(count) {
    const response = await find('', 'users');

    if (response[count - 1] === undefined) {
      return { error: 'Not enough users in database!' };
    }

    const experiences = {};

    for (let i = 0; i < response.length; i++) {
      const keys = Object.keys(response[i]);
      const values = keys.map(function (key) {
        return response[i][key];
      });

      experiences[values[1]] = values[2];
    }

    const ids = Object.keys(experiences);
    ids.sort(function (a, b) {
      return experiences[b] - experiences[a];
    });

    const usernames = [];

    for (let i = 0; i < ids.length; i++) {
      const resolution = await find({ id: ids[i] }, 'users');

      usernames.push(resolution[0].discord_name);
    }

    const res = [];

    for (let i = 0; i < count; i++) {
      res.push({
        user_id: ids[i],
        username: usernames[i],
        experience: experiences[ids[i]],
      });
    }

    return res;
  }
}
