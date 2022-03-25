import { useEffect } from "react";
import { config } from "../../App";
import {anim} from "./core/anim1";
import {dot} from "./core/dot1";
import EventEmitter from "../../core/eventEmitter";

const Svg = ({velo}) => {
    useEffect(() => {
        dot.init(`dot-${velo}`, `curve-${velo}`);
        dot.move(0);

        EventEmitter.subscribe(`NEW_RUN-${velo}`, (averageTime) => {
            dot.move(0);
            anim.start(!isNaN(averageTime) ? averageTime : config.duration);
        });
    }, [velo]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="634" height="819" fill="none" viewBox="0 0 630 900"
        >
            <path id={`curve-${velo}`} stroke="#000" strokeWidth="6" d="M183.5 3.5c73 8.5 107 15.095 140.5 57.5 39.5 50 96 168 108 250.5C436 409 478 430 513.5 469c39.5 46.5 102 110 117.5 173.5 4 39.5-12 144-169 178-123.431 26.73-243.667-47.833-287-80-78-83-51-173-35-217 74-117-20.405-116.752-69.5-149C19.5 341-20 252.5 21 193c24.858-36.074 38-71 24.5-105.5C166 18 169 3.5 183.5 3.5z"/>
            <path id={`dot-${velo}`} style={{fill: "#f3bb37"}} transform-origin="0 0" d="M56.48,29.333c-0.429,0-0.853,0.023-1.271,0.064l-3.316-13.81c-0.162-0.674-0.766-1.149-1.459-1.149
                h-5.161c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3.979l1.122,4.674H28.005l-1.131-4.068h4.166c0.828,0,1.5-0.672,1.5-1.5
                s-0.672-1.5-1.5-1.5H24.9c-0.469,0-0.91,0.219-1.194,0.593c-0.283,0.373-0.376,0.857-0.251,1.309l1.81,6.512l-6.067,7.679
                c-1.903-1.137-4.118-1.803-6.49-1.803C5.7,29.333,0,35.035,0,42.042s5.7,12.707,12.707,12.707c6.592,0,12.026-5.047,12.646-11.479
                h6.558c0.001,0,0.002,0,0.003,0c0.132,0,0.266-0.017,0.399-0.054c0.037-0.01,0.07-0.028,0.105-0.041
                c0.026-0.009,0.05-0.019,0.076-0.029c0.154-0.065,0.292-0.152,0.411-0.258c0.008-0.007,0.019-0.01,0.027-0.017l18.341-17.014
                l1.01,4.206c-4.947,1.74-8.509,6.446-8.509,11.98c0,7.007,5.7,12.707,12.707,12.707c7.007,0,12.707-5.7,12.707-12.707
                S63.487,29.333,56.48,29.333z M26.26,27.037l3.678,13.232h-4.661c-0.4-2.845-1.735-5.391-3.698-7.309L26.26,27.037z M19.706,35.331
                c1.284,1.339,2.188,3.041,2.54,4.938h-6.441L19.706,35.331z M12.707,51.749C7.354,51.749,3,47.394,3,42.042s4.354-9.708,9.707-9.708
                c1.671,0,3.244,0.425,4.619,1.171l-5.796,7.335c-0.356,0.451-0.424,1.066-0.173,1.584c0.25,0.517,0.774,0.846,1.35,0.846h9.622
                C21.722,48.043,17.643,51.749,12.707,51.749z M32.697,38.994l-3.858-13.881h18.823L32.697,38.994z M56.48,51.749
                c-5.353,0-9.707-4.354-9.707-9.707c0-4.12,2.584-7.64,6.213-9.047l2.035,8.477c0.166,0.688,0.78,1.149,1.458,1.149
                c0.115,0,0.233-0.014,0.352-0.041c0.805-0.193,1.302-1.004,1.108-1.81l-2.019-8.408c0.186-0.011,0.371-0.028,0.56-0.028
                c5.353,0,9.707,4.355,9.707,9.708S61.833,51.749,56.48,51.749z"
            />
        </svg>
    );
}

export default Svg;
