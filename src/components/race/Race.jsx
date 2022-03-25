import { useContext, useRef } from "react";
import { RaceContext } from "../../App";
import moment from "moment";
import {wait} from "../../core/misc";
import Svg1 from "./SvgVelo1";
import Svg2 from "./SvgVelo2";
import EventEmitter from "../../core/eventEmitter";
import { Button } from "@mui/material";

let tens = 0;
let seconds = 0;
let minutes = 0;

const Race = ({velo}) => {
    const [{users, lastRun}, dispatch] = useContext(RaceContext);
    const Interval = useRef(null);

    const stopTimer = () => {
        clearInterval(Interval.current);

        const appendTens = document.querySelector(`#chrono-${velo} .tens`);
        const appendSeconds = document.querySelector(`#chrono-${velo} .seconds`);
        const appendMinutes = document.querySelector(`#chrono-${velo} .minutes`);
        
        appendTens.innerHTML = "00";
        appendSeconds.innerHTML = "00";
        appendMinutes.innerHTML = "00";

        tens = 0;
        seconds = 0;
        minutes = 0;
    };

    const startTimer = () => {
        const appendTens = document.querySelector(`#chrono-${velo} .tens`);
        const appendSeconds = document.querySelector(`#chrono-${velo} .seconds`);
        const appendMinutes = document.querySelector(`#chrono-${velo} .minutes`);
        tens++; 


        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
        }
    
        if (tens > 9){
            appendTens.innerHTML = tens;
        } 
        
        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
    
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

        if (seconds > 59) {
            minutes++
            seconds=0;
            appendSeconds.innerHTML = "0" + 0;
            appendMinutes.innerHTML =  "0" + minutes;
        }
    }

    const handleStartChrono = () => {
        const _interval = setInterval(() => startTimer(), 10);

        Interval.current = _interval;
    }

    const handleRestartChrone = async () => {
        tens = 0;
        seconds = 0;
        minutes = 0;

        clearInterval(Interval.current);
    }

    const handleStart = async () => {
        handleRestartChrone();
        await wait(10);
        handleStartChrono();
        EventEmitter.dispatch(`NEW_RUN-${velo}`);
    }

    const handleFirstStart = () => {
        dispatch({type: "START_RUN", payload: {velo}});
        handleStart();
    }

    const countAllTour = () => {
        let tour = 0;

        for (let user of users) {
            console.log("user", user);
            for (let run of user.run) {
                console.log("run", run);
                tour = tour + run.count;
            }
        }

        return tour;
    }

    const CurrentUserInfo = () => {
        const user = users.find((user) => user.name === lastRun[velo]?.name);

        if (lastRun[velo].name && lastRun[velo].endAt) {
            const totalCount = user.run.reduce((acc, cur) => acc + cur.count, 0);
            const allRunTime = user.run.map((e) => ((e.endAt - e.startAt) / e.count));
            const bestRun = allRunTime.sort((a, b) => a - b)[0];

            return (
                <div className={`svg-content-${velo}`}>
                    <div className="user-info__name">{user.name}</div>
                    <div className="user-info__name">Tour: {totalCount}</div>
                    <div className="user-name">Best: {bestRun ? moment.utc(moment.duration(bestRun, "minutes").asMinutes()).format("mm:ss") : 0}</div>
                    <p id={`chrono-${velo}`}><span className="minutes">00</span>:<span className="seconds">00</span>:<span className="tens">00</span></p>
                    {/* <button onClick={() => stopTimer()}>test</button> */}
                </div>
            )
        } else if (user) {
            return (
                <div className={`svg-content-${velo}`}>
                    <div className="user-info__name">{user.name}</div>
                    <Button onClick={() => handleFirstStart()}>Demarrer</Button>
                </div>
            )
        }

        return <></>
    }

    return (
        <div className="svg-wrapper">
            {velo === "velo1" ? <Svg1 velo={velo} /> : <Svg2 velo={velo} />}
            <CurrentUserInfo />
            <div className="svg-content-tour">Tours totaux: {countAllTour()}</div>
        </div>
    );
}

export default Race;
