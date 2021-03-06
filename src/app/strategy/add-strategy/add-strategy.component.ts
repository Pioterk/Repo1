import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Strategy } from 'src/app/model/strategy';
import { StrategyService } from '../../services/strategy.service';
import { NgbDatepicker, NgbDatepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-strategy',
  templateUrl: './add-strategy.component.html',
  styleUrls: ['./add-strategy.component.css']
})

export class AddStrategyComponent implements OnInit {
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  choosenPeriod: string = 'daily';
  choosenDayOfWeek: string = 'Poniedziałek';
  reportId:number;
  notificationId : number;
  @ViewChild(NgbDatepicker, {static: true}) datepicker: NgbDatepicker;

  periods: string[] = ['daily', 'weekly', 'monthly'];
  dayOfWeek: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  time = {hour: 13, minute: 30};
  dayOfMonth : number;
  
  
  constructor(
    private strategyService : StrategyService,
    public router: Router,
    private route: ActivatedRoute,
    public i18n: NgbDatepickerI18n) { }
 
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.reportId = params.reportId;
      this.notificationId = params.notificationId;
    });
  }
  onDateSelection(date: NgbDate) {  
    this.dayOfMonth = date.day;
  }
  submit(){
    let str : Strategy = new Strategy();
    let date : Date = new Date();
    let tzo = (date.getTimezoneOffset()/60)*(-1);

    date.setHours(this.time.hour+tzo);
    date.setMinutes(this.time.minute);
    str.time = date;
    if (this.choosenPeriod=='daily'){
     
      str.daily = true;
  
    
    }else if (this.choosenPeriod == 'monthly'){
    
      str.monthly = true;
      str.dayOfMonth = this.dayOfMonth;
  
    
    }else if (this.choosenPeriod == 'weekly'){
     
      str.weakly = true;
      if (this.choosenDayOfWeek=='Poniedziałek'){
        str.dayOfWeek = 1;
      } else if (this.choosenDayOfWeek=='Wtorek'){
        str.dayOfWeek = 2;
      } else if (this.choosenDayOfWeek=='Środa'){
        str.dayOfWeek = 3;
      } else if (this.choosenDayOfWeek=='Czwartek'){
        str.dayOfWeek = 4;
      } else if (this.choosenDayOfWeek=='Piątek'){
        str.dayOfWeek = 5;
      } else if (this.choosenDayOfWeek=='Sobota'){
        str.dayOfWeek = 6;
      } else if (this.choosenDayOfWeek=='Niedziela'){
        str.dayOfWeek = 7;
      }
  
    } 
    this.strategyService.save(this.serverURL, str).subscribe(data=>{
      if (this.reportId!=null){
        this.router.navigate(['/notification/add'],{ queryParams: { reportId: this.reportId}});
      }else if (this.notificationId!=null){
        this.router.navigate(['/notification/edit'],{ queryParams: { notificationId: this.notificationId}});

      }
     
    });
  }
}
