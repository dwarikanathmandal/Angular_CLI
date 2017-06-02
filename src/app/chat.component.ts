import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message.object';


@Component({
    selector: 'chat-box',
    templateUrl: "./chat.html",
    styleUrls: ["./styles/chat.css"],
    providers: [ChatService]
})

export class ChatComponent implements OnInit, AfterViewChecked {
    inpuData: any;
    wcs_context: any ={};
    wcs_response: any ;

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    messageList: Array<Message> = new Array<Message>();
    inputMessage: string="";
    outputMessage: string;

    constructor(private chatService: ChatService) {
        // let msg = new Message("Hi. Welcome to virtual assistant of your car. What Can I do for you.", false);
        // this.messageList.push(msg);
    }

    sendQuery(query: string): void {

    }

    ngOnInit() {

        // this.chatService.getResponse("").subscribe(res => {
        //     this.outputMessage = res;
        //     let msg = new Message(res, false);
        //     this.messageList.push(msg);
        // })

        this.postDataConversation();
    };

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
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

    postDataConversation(): void {
      
        this.inpuData = {
            "input": {
                "text": this.inputMessage
            },
            "context": this.wcs_context
        }

        let msg = new Message(this.inputMessage, true);
        if(this.inputMessage !=""){
            this.messageList.push(msg);
        }

        this.chatService.postMethod(this.inpuData).subscribe(res => {

            this.wcs_response = res;
            msg = new Message(res.output.text[0].toString(), false);
            this.wcs_context = res.context;
            this.messageList.push(msg);
            this.inputMessage = "";
        })
    }
}


// this.wcs_response = {
//     "intents": [],
//     "entities": [],
//     "input": {},
//     "output": {
//         "text": ["Hi. Welcome to virtual assistant of your car. What Can I do for you?"],
//         "nodes_visited": ["Conversation Start"],
//         "log_messages": []
//     },
//     "context": {
//         "conversation_id": "da7b0ec9-ffe6-4f03-962a-0198a96b5676",
//         "system": {
//             "dialog_stack": [{ "dialog_node": "root" }],
//             "dialog_turn_counter": 1,
//             "dialog_request_counter": 1,
//             "_node_output_map": { "Conversation Start": [0] },
//             "branch_exited": true,
//             "branch_exited_reason": "completed"
//         },
//         "AConoff": "off",
//         "lightonoff": "off",
//         "musiconoff": "off",
//         "appl_action": "",
//         "heateronoff": "off",
//         "volumeonoff": "off",
//         "wipersonoff": "off",
//         "default_counter": 0
//     }
// }
