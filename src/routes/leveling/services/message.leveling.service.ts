import { Injectable } from "@nestjs/common";
import { find, insert, update } from "../../../utils/database/database";
import { checkToken } from "../../../utils/token/token";
import { userTemplate } from "../../../utils/database/templates/user.template";

@Injectable()
export class MessageLevelingService {
  async postMessage(author_id, author_name, token) {

    if (!(checkToken(token))) {
      return { error: "token_incorrect" }
    }

    if (!(author_id) || !(author_name)) {
      return { error: "no author_id or author_name" };
    }

    let dbResponse = await find(
      { id: author_id },
      'users'
    );

    if (dbResponse[0] === undefined) {
      await insert(
        userTemplate(author_id, author_name),
        'users'
      );
    }

    const keys = Object.keys(dbResponse[0]);
    const values = keys.map(function (key) {
      return dbResponse[0][key];
    });

    let experience = (values[2]) += 1;

    await update(
      { id: `${author_id}`},
      { $set: { experience: experience } },
      'users'
    );

    return dbResponse[0];
  }
}