import { GenertedReport } from "./generted-report";

export class Message {
        id: number;
        creationDate: Date;
        sentDate: Date;
        text: string;
        subject: string;
        email: string;
        triesWEndedWithError:number;
        generatedReport: GenertedReport;
        errorCode: any;
        userName: string;
        type : number;
        filePath : string;
       
}