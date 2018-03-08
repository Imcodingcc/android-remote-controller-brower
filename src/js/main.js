import Ws from "./Ws";
import WsCli from "./WsCli";
import OptCli from "./optCli";
let vncm = document.getElementById("vncm");
let vncFill = vncm.getContext("2d");
new Ws("ws://localhost:8080/pcScreen", new WsCli(vncFill));
let controller = new Ws("ws://localhost:8080/controllerPc", new OptCli());

let lastX, lastY;
let isPress = false;


const mousedown = (evt)=>{
    isPress = true;
    let x = evt.layerX * 3;
    let y = evt.layerY * 3;
    let param = {code: 0, x: x, y: y};
    controller.send(JSON.stringify(param));
}

const mouseup = (evt)=>{
    isPress = false;
    controller.send(JSON.stringify({code: 2}));
}

const mousemove = (evt)=>{
    if(isPress){
        let x = evt.layerX * 3;
        let y = evt.layerY * 3;
        //let cx = x - lastX;
        //let cy = y - lastY;
        let param = {code: 1, x: x, y: y};
        controller.send(JSON.stringify(param));
        lastX = x;
        lastY = y;
    }
}

vncm.addEventListener("mousedown", mousedown, false);
vncm.addEventListener("mouseup", mouseup, false);
vncm.addEventListener("mousemove", mousemove, false);