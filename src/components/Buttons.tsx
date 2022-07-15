import React from 'react';

export const startButton = (shouldDisplay: boolean, handleClick: Function) => {
    return shouldDisplay && (<button onClick={() => handleClick()}>Start</button>)
};

export const resetButton = (shouldDisplay: boolean, handleClick: Function) => {
    return shouldDisplay && (
        <button onClick={() => handleClick()}> Reset</button>
    )
};
