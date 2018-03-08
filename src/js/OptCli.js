import HttpCli from "./HttpCli"
export default class OptCli{
    constructor(){
        this.httpCli = new HttpCli();
        this.uinput = document.getElementById("uinput");
        this.keyInput = document.getElementById("keyInput");
        this.keyInput.addEventListener("keydown", (event)=>{
            if(event.keyCode == 13){
                let msg = this.keyInput.value;
                console.log("msg", msg);
                this.ws.send(JSON.stringify({"code": 3, msg: msg}));
                this.keyInput.value = "";
            }
        }, false);
    }

    onopen(){
        console.log('pc controller connected');
    }

    onmessage(ws, evt){
        this.ws = ws;
        if(evt.data == "inputMethodOn"){
            this.uinput.style.display = "block";
        }else if(evt.data == "inputMethodClose"){
            this.uinput.style.display = "none";
        }
    }

    onclose(){
        console.log("pc controller closed");
    }
}