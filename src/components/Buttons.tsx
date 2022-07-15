import React from 'react';

export const startButton = (shouldDisplay: boolean, startTimer: Function) => {
    return shouldDisplay && (<button onClick={() => startTimer(true)}>Start</button>)
};

export const resetButton = (shouldDisplay: boolean, setTimeLeft: Function, startTimer: Function) => {
    const handleClick = () => {
        startTimer(false);
        setTimeLeft(60);
        setCount(checkCount());
    }
    return shouldDisplay && (
        <button onClick={handleClick}>Reset</button>
    )
};
