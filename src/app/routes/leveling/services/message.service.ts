import { Injectable } from '@nestjs/common';
import { find, insert, update } from '../../../utils/database/database';
import { checkToken } from '../../../utils/token/token';
import { userTemplate } from '../../../utils/database/templates/user.template';

@Injectable()
export class MessageService {
  async postMessage(author_id, author_name, token, discord_avatar) {
    if (!checkToken(token)) {
      return { error: 'token_incorrect' };
    }

    if (!author_id || !author_name) {
      return { error: 'no author_id or author_name' };
    }

    const dbResponse = await find({ id: author_id }, 'users', 'levelsystem');

    if (dbResponse[0] === undefined) {
      await insert(
        userTemplate(author_id, author_name, discord_avatar),
        'users',
        'levelsystem',
      );

      return { success: 'new_entry' };
    }

    const keys = Object.keys(dbResponse[0]);
    const values = keys.map(function (key) {
      return dbResponse[0][key];
    });

    const experience = (values[2] += 1);

    await update(
      { id: `${author_id}` },
      { $set: { experience: experience } },
      'users',
      'levelsystem',
    );

    return dbResponse[0];
  }
}
