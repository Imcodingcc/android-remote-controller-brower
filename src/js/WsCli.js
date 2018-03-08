import HttpCli from "./HttpCli"
export default class WsCli{
    constructor(vncFill){
        this.vncFill = vncFill;
        this.httpCli = new HttpCli();
        this.imageBitmap = null;
    }

    onopen(){
        console.log('pc screen connected');
    }

    async onmessage(ws, evt){
        ws.send("continue")
        let s = await this.httpCli.getScreen();
        let wh = { resizeHeight: s.y / 3, resizeWidth: s.x / 3};
        this.imageBitmap = await createImageBitmap(evt.data, 0, 0, s.x, s.y, wh);
        this.vncFill.drawImage(this.imageBitmap, 0, 0, s.x / 3, s.y / 3)
        this.imageBitmap.close();
    }

    onclose(){
        console.log("pc screen closed");
    }
}