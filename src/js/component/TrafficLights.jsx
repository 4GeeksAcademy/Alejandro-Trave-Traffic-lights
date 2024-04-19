import React, { useState, useEffect } from "react";

const TrafficLights = () => {
    const [state, setState] = useState("off");
    const [red, setRed] = useState("redOff");
    const [yellow, setYellow] = useState("yellowOff");
    const [green, setGreen] = useState("greenOff");
    const [auto, setAuto] = useState(false);

    useEffect(() => {
        if (auto) {
            const intervalId = setInterval(() => {
                setState(prevState => {
                    if (prevState === "off") {
                        setRed("red");
                        setYellow("yellowOff");
                        setGreen("greenOff");
                        return "stop";
                    }
                    if (prevState === "stop") {
                        setRed("redOff");
                        setYellow("yellow");
                        setGreen("greenOff");
                        return "warning";
                    }
                    if (prevState === "warning") {
                        setRed("redOff");
                        setYellow("yellowOff");
                        setGreen("green");
                        return "go";
                    }
                    setRed("red");
                    setYellow("yellowOff");
                    setGreen("greenOff");
                    return "stop"; // fallback
                });
            }, 1500);


            return () => clearInterval(intervalId);
        }
    }, [auto]);

    const autoBoton = () => {
        if (auto) {
            clearInterval();
            setAuto(false);
        } else {
            setAuto(true);
        }
    };

    return (
        <div className="fondo">
        <div className="d-flex">
            <div className={`ms-5 col-2 ${state}`}>
                <div className={`row m-2 rounded-circle text-center text-light ${red}`} onClick={() => { setState('stop'); setRed('red'); setYellow('yellowOff'); setGreen('greenOff') }}></div>
                <div className={`row m-2 rounded-circle text-center text-light ${yellow}`} onClick={() => { setState('warning'); setRed('redOff'); setYellow('yellow'); setGreen('greenOff') }}></div>
                <div className={`row m-2 rounded-circle text-center text-light ${green}`} onClick={() => { setState('go'); setRed('redOff'); setYellow('yellowOff'); setGreen('green') }}></div>
            </div>
            <div className="col m-3">
                <input value={auto ? "Detener" : "Iniciar"} className="row" type="button" onClick={autoBoton} />
            </div>
        </div>
        </div>
    );
};

export default TrafficLights;
