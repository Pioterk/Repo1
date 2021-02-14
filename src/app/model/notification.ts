import { Report } from './report';
import { Strategy } from './strategy';

export class Notification {
    id: number;
    active: Boolean;
    hardDrive : Boolean;
    email :Boolean;
    users: Array<any>;
    messages: Array<any>;
    strategies: Array<any>;
    text: String;
    subject : String;
    report: Report;
}
