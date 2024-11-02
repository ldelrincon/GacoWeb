import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class HelperService  {
    private message = new BehaviorSubject<boolean>(false);

    public customMessage = this.message.asObservable();
  
    public changeMessage(msg: boolean): void {
      this.message.next(msg);
    }
  }