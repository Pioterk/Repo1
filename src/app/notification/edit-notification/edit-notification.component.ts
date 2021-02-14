import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css']
})
export class EditNotificationComponent implements OnInit {
  checked = true;
  indeterminate = false;
  constructor() { }

  ngOnInit(): void {
  }

}
