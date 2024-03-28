import { Injectable } from "@nestjs/common";

@Injectable()
export class DevConfigService {
   private DBHOST = 'localhost'

    getDBHost() {
        return this.DBHOST;
    }
}
