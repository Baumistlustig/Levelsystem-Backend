import { Injectable } from "@nestjs/common";
import { find } from "../../../utils/database/database";

@Injectable()
export class SearchLevelingService {
  async searchUser(username) {
    let dbResponse;
    dbResponse = await find(
      { discord_name: username },
      'users'
    );

    console.log(dbResponse)

    if (dbResponse[0] === undefined) {
      dbResponse = await find(
        { minecraft_name: username },
        'users'
      );
    }

    console.log(dbResponse)

    if (dbResponse[0] === undefined) {
      return { error: "no_user_found" }
    }

    return dbResponse;
  }
}