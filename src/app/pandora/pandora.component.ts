import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pandora',
  templateUrl: './pandora.component.html',
  styleUrls: ['./pandora.component.css']
})
export class PandoraComponent implements OnInit {
  workTime:number = 25;
  breakTime:number = 5;
  state:string;
  min:any='00';
  sec:any='00';
  interval:any;
  sessionSeconds:number;
  breakSeconds:number;

  constructor() { }

  ngOnInit() {
  }
  workMinus(){
    if (this.workTime >= 2) {
      this.workTime -= 1;
    }
  }
  workPlus(){
    this.workTime+=1;
  }
  breakPlus(){
    this.breakTime += 1;
  }
  breakMinus(){
    if (this.breakTime >= 2) {
      this.breakTime -= 1;
    }
  }
  startPro() {
    var s = this.sessionSeconds + 1;
    var b = this.breakSeconds + 1;
    var ss=this.sessionSeconds;
    var bs=this.breakSeconds;

    this.interval = setInterval(()=> {
        var min,sec;
        if (s > 0) {
            s -= 1;
            this.state='Session';
            min=Math.floor(s / 60 % 60).toString();
            sec=(s % 60).toString();
        } else if (b > 0) {
            b -= 1;
            this.state='Break';
            min=Math.floor(b / 60 % 60).toString();
            sec=(b % 60).toString();
        } else if (b === 0) {
            s = ss + 1;
            b = bs + 1;
        }

        
        this.sessionSeconds = s;
        this.breakSeconds = b;
        if (min.length === 1) {
          this.min='0' + min;
        }
        else{
          this.min=min;
        }
        if (sec.length === 1) {
          this.sec='0' + sec;
        }
        else{          
          this.sec=sec;
        }
    }, 1000);

}
pause() {
  clearInterval(this.interval);
}

resume() {
  this.startPro();
}
reset(){
  location.reload();
}
start(){
  this.sessionSeconds=this.workTime*60;
  this.breakSeconds=this.breakTime*60;
  this.startPro();
}
}
