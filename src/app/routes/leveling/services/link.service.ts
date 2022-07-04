import { Injectable } from '@nestjs/common';
import { checkToken } from '../../../utils/token/token';
import { find, update } from '../../../utils/database/database';

import fetch from 'node-fetch';

@Injectable()
export class LinkService {
  async linkUser(discord_id, token, minecraft_username) {
    if (!checkToken(token)) {
      return { error: 'invalid_access_token' };
    }

    const response = await fetch(
      `https://api.minecraftservices.com/minecraft/profile/lookup/name/${minecraft_username}`,
    );

    let minecraft_id = await response.json();
    minecraft_id = Object.values(minecraft_id)[0];

    const result = await find({ id: `${discord_id}` }, 'users', 'levelsystem');

    if (result[0] === undefined) {
      return { error: 'user_does_not_exist' };
    }

    await update(
      { id: discord_id },
      { $set: { minecraft_name: minecraft_username } },
      'users',
      'levelsystem',
    );

    return await update(
      { id: `${discord_id}` },
      { $set: { minecraft_id: minecraft_id } },
      'users',
      'levelsystem',
    );
  }
}
