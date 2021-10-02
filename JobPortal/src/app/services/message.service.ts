import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface Message {
  text: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesStream = new ReplaySubject<Message>(1);

  constructor() { }

  
  
}
