import React, { createContext, useContext, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const TimerContext = createContext();

export const useTimer = () => {
    return useContext(TimerContext);
};

const Timer = ({ time, toggleTimer, start, stop, running }) => {

    return (
        <Draggable>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 100,
                }}>
                    {/* Header */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <button onClick={toggleTimer}>
                            X
                        </button>
                    </div>
                    <div style={{ textAlign: "center", width: "100%", color: "white", fontSize: 24, backgroundColor: 'blue', }}>
                        {time}
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                        <button style={{ flex: 1 }}
                            onClick={running ? stop : start}>
                            {running ? "Stop" : "Start"}
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}


export const TimerProvider = ({ children }) => {

    const [showTimer, setShowTimer] = useState(false);

    const toggleTimer = () => {
        setShowTimer(p => !p);
    }

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        let interval
        if (running) {
            interval = setInterval(() => {
                setTime(p => p + 1)
            }, 1000)
        }
        else if (!running && interval) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)

    }, [running])

    const start = () => {
        setRunning(true);
    }

    const stop = () => {
        setRunning(false);
    }


    return (
        <TimerContext.Provider value={{
            toggleTimer,
            time,
        }}>
            {showTimer &&
                <Timer
                    toggleTimer={toggleTimer}
                    time={time}
                    start={start}
                    stop={stop}
                    running={running}
                />
            }
            {children}
        </TimerContext.Provider>
    );
};

