import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database';

@Injectable()
export class GetUserService {
  async getUser(target_id) {
    if (!target_id) {
      return { error: 'no_target_id_provided' };
    }

    const dbResponse = await find({ id: `${target_id}` }, 'users');

    console.log(dbResponse);

    if (dbResponse[0] === undefined) {
      return { experience: false };
    }

    return dbResponse[0];
  }
}
