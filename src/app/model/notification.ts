import { Report } from './report';
import { Strategy } from './strategy';

export class Notification {
    id: number;
    active: boolean;
    hardDrive : boolean;
    email :boolean;
    users: Array<any>;
    messages: Array<any>;
    strategies: Array<any>;
    text: String;
    subject : String;
    report: Report;
}
