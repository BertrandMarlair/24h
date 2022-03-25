import {anim} from "./anim1.js";
import {dot} from "./dot.js";

window.onload = () => {   
    dot.init('dot', 'curve');
    anim.start(2000);
}