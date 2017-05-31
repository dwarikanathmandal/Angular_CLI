
export class Message {
    public text: string;
    public isInput: boolean;   
    constructor(text: string, isInput: boolean) {
        this.text = text;
        this.isInput = isInput;
    }
}