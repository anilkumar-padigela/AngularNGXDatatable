import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  servers = ['Server1','Server2'];
  @ViewChild('serverInputName') serverInputName:ElementRef;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    console.log(this.serverInputName);
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverInputName.nativeElement.value;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
