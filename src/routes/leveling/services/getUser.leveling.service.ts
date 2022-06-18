import { Injectable } from "@nestjs/common";
import { find } from "../../../utils/database/database";

@Injectable()
export class GetUserLevelingService {
  getUser(author_id, target_id): object {
    if (!author_id) {
      return { error: "No author_id provided!",};
    }

    if (target_id) {
      author_id = target_id;
    }

    let result = find (
      { id: `${author_id}` },
      'users'
    );

    if (result[0] === undefined) {
      return { experience: false };
    }

    const keys = Object.keys(result[0]);
    const values = keys.map(function (key) {
      return result[0][key];
    });

    return { experience: values[2] };
  }
}