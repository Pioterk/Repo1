import { SvcUser } from "./svc-user";

export class System {

    numberOfRecords: number;
    daysToKeepInDb : number;
    pathForFiles :  string;
    onLineSince : Date;
    userRefreshed : Date;
    dataPointsRefreshed : Date;
    mailAddress: string;
    mailPassword: string;
    smtpPort: number;
    smtpServer: string;
    svcServer: string;
    testEmail: string;
    jobId: number;
    apiUser: SvcUser;
    mailUserName: string;
}
