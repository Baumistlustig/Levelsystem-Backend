import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database';
import { closest, distance } from 'fastest-levenshtein';

@Injectable()
export class SearchLevelingService {
  async searchUser(username) {
    let dbResponse;
    dbResponse = await find({ discord_name: username }, 'users');

    if (dbResponse[0] === undefined) {
      dbResponse = await find({ minecraft_name: username }, 'users');
    }

    if (dbResponse[0] === undefined) {
      let dbLevResponse: any[];
      dbLevResponse = await find({}, 'users');

      const dbUsernames = [];

      for (let i = 0; i < dbLevResponse.length; i++) {
        dbUsernames.push(dbLevResponse[i].discord_name);
      }

      const closestUser = closest(username, dbUsernames);

      if (distance(username, closestUser) < 4) {
        dbLevResponse = await find({ discord_name: closestUser }, 'users');
        dbLevResponse.push('closest_result');
        return dbLevResponse;
      }
    }

    if (dbResponse[0] === undefined) {
      return { error: 'no_user_found' };
    }

    return dbResponse;
  }
}
