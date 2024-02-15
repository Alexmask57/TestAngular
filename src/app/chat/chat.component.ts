import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "./chat.service";
import {PlaceholderDirective} from "../placeholder.directive";
import {NgForm} from "@angular/forms";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('messagesDiv') messagesDiv: ElementRef;
  @ViewChild('f') messageForm: NgForm;
  messages: string[] = new Array<string>();
  sub: Subscription;

  constructor(
    private chatService: ChatService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.messageForm.valid){
      return;
    }
    let subscription = this.sub;
    let messageSend = this.messageForm.value.message;
    let messages = this.messages;
    messages.push(messageSend);
    this.messageForm.resetForm()
    let responseMessage = '';
    let index = messages.push(responseMessage);
    console.log('index : ' + index);
    subscription = this.chatService.sendMessage(messageSend).subscribe({
      next(x) {
        if (x.type === HttpEventType.DownloadProgress) {
          let i = 0;
          let receivedMessage = '';
          // @ts-ignore
          let result = x.partialText.split('\n').map(s => {
            if (s){
              console.log(i);
              console.log(s);
              let res = JSON.parse(s);
              // @ts-ignore
              receivedMessage = receivedMessage + res.response;
            }
            i++;
          });
          messages[index] = receivedMessage;
          // console.log(receivedMessage);
          // messages[index] = messages[index] + receivedMessage;
        }
        else if (x.type === HttpEventType.Response){
          console.log('HttpEventType.Response');
        }
        // console.log("type " + x.type);
        // console.log(x);
      },
      error(err) {
        console.error('something wrong occurred');
        console.error(err);
      },
      complete() {
        subscription.unsubscribe();
      },
    });
  }

}
