import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/model/report';


@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {
  @Input() report: Report;
  constructor(public router: Router,) { }

  ngOnInit(): void {

  }
  add(){
    if (this.report!=null){
      this.router.navigate(['/notification/add'],{ queryParams: { reportId: this.report.id}});
    }

  }

}
