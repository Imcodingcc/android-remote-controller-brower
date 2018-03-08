export default class Ws {
    constructor(addr, wsCli){
        this.wsCli = wsCli
        this.ws = new WebSocket(addr);
        this.ws.onopen = ()=>{
            this.wsCli.onopen()
        }

        this.ws.onmessage = (evt)=>{
            this.wsCli.onmessage(this.ws, evt);
        }

        this.ws.onclose = ()=>{
            this.wsCli.onclose()
        }
    }

    send(msg){
        if(this.ws.readyState == WebSocket.OPEN){
            this.ws.send(msg);
        }else{
            console.log('controller is still initializing');
        }
    }
}