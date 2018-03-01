import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandoraComponent } from './pandora.component';

describe('PandoraComponent', () => {
  let component: PandoraComponent =new PandoraComponent;
  let fixture: ComponentFixture<PandoraComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ PandoraComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PandoraComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  beforeAll(()=>{
    expect(component.workTime).toEqual(25);
    expect(component.breakTime).toEqual(5);
  });
  it('Invoking on plus of work time should increse work time',()=>{
    var workTime=component.workTime;
    component.workPlus();
    var new_workTime=component.workTime;
    expect(new_workTime).toEqual(workTime+1);
  });
  it('Invoking on minus of work time should decrese work time',()=>{
    var workTime=component.workTime;
    component.workMinus();
    var new_workTime=component.workTime;
    expect(new_workTime).toEqual(workTime-1);
  });
  it('Invoking on plus of break time should increase work time',()=>{
    var breakTime=component.breakTime;
    component.breakPlus();
    var new_breakTime=component.breakTime;
    expect(new_breakTime).toEqual(breakTime+1);
  });
  it('Invoking on minus of work time should decrese work time',()=>{
    var breakTime=component.breakTime;
    component.breakMinus();
    var new_breakTime=component.breakTime;
    expect(new_breakTime).toEqual(breakTime-1);
  });
  it('Clicking on start will create session Duration and Break time of desired seconds',()=>{
    var breakTime=component.breakTime;
    var workTime=component.workTime;
    component.start();
    var new_workTime=component.sessionSeconds;
    var new_breakTime=component.breakSeconds;
    expect(new_workTime).toEqual(workTime*60);
    expect(new_breakTime).toEqual(breakTime*60);
  });
  it('Check if clock is actually going to session state on start', ()=>{
    component.start();
    setTimeout(()=>{
      var state=component.state;
      expect(state).toEqual('Session');
    },2000);
    

  });
  it('Check if clock is actually going to break state on session end', ()=>{
    component.sessionSeconds=1;
    component.breakSeconds=1;
    component.startPro();
    setTimeout(()=>{
      var state=component.state;
      expect(state).toEqual('Break');
    },3000);
    

  });
  it('Check if timer actually pauses during pause',()=>{
    component.start();
    component.pause();
    var x=0;
    var sessionSeconds=component.sessionSeconds;
      var it=setInterval(()=>{
        var new_sessionsSeconds=component.sessionSeconds;
        expect(new_sessionsSeconds).toEqual(sessionSeconds);
        if(x++>5){
          window.clearInterval(this.it);
        }
      },1000)
  });
  it('Check if timer actually resumes after resume',()=>{
    component.start();
    component.pause();
    var x=0;
    var sessionSeconds=component.sessionSeconds;
      var it=setInterval(()=>{
        var new_sessionsSeconds=component.sessionSeconds;
        expect(new_sessionsSeconds).toEqual(sessionSeconds);
        if(x++>3){
          window.clearInterval(this.it);
        }
      },1000);
    component.resume();
    setTimeout(()=>{
      expect(sessionSeconds).toBeLessThan(component.sessionSeconds);
    },2000)
  });
});
