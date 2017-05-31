import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message.object';


@Component({
    selector: 'chat-box',
    templateUrl: "./chat.html",
    styleUrls: ["./styles/chat.css"],
    providers: [ChatService]
})

export class ChatComponent implements OnInit, AfterViewChecked  {

@ViewChild('scrollMe') private myScrollContainer: ElementRef;
    messageList: Array<Message> = new Array<Message>();
    inputMessage: string;
    outputMessage: string;

    constructor(private chatService: ChatService) { }

    sendQuery(query: string): void {

    }

    ngOnInit() {

        this.chatService.getResponse("").subscribe(res => {
            this.outputMessage = res;
            let msg = new Message(res, false);
            this.messageList.push(msg);
        })
    };

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

     scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

    sendMessage(): void {

        let msg = new Message(this.inputMessage, true);
        this.messageList.push(msg);
        this.chatService.getResponse(this.inputMessage).subscribe(res => {
            msg = new Message(res[0].toString(), false);
            this.messageList.push(msg);           
            this.inputMessage = "";
        })
    }
}
