import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import './Application.less';
import wordBank from '../data/wordbank';
import { startButton, resetButton } from './Buttons'

type Props = {
  title: string;
};

const Application: React.FC<Props> = (props) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [shouldStartTimer, startTimer] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inVal, setInVal] = useState('');
  const [count, setCount] = useState(0);

  // Loop over the words the user has typed and the word bank to display colors
  const checkMatch = () => {
    const userWords = userInput.split(' ');
    let localCount = 0;
    const wordMatches = wordBank.map((word, i) => {
        // display green for the matched word
        if (i < userWords.length && word === userWords[i]) {
            localCount += 1;
            return (<span style={{color:"green"}}>{word} </span>)
        // display green for the partial match
        } else if (i < userWords.length && word.startsWith(userWords[i])) {
            return (<span><span style={{color:"green"}}>{userWords[i]}</span>
                    <span>{word.substring(userWords[i].length)} </span></span>)
        // display red for the non-match
        } else if (i < userWords.length && word !== userWords[i]) {
            return (<span style={{color:"red"}}>{word} </span>)
        // normal for all else
        } else {
            return (<span>{word} </span>)
        }
    })
    return wordMatches
  };

  // count the numbber of matches so far
  const checkCount = () => {
      let matches = 0;
      userInput.split(' ').map((word, i) => {
          if (i === wordBank.length) {
              return
          }
          if (word === wordBank[i]) {
              matches++;
          }
      })
      return matches;
  }

  // state for the words to display on screen
  const [userMatch, setMatch] = useState(checkMatch());

  // handle the space bar and clearing the input box
  const handleUserInput = (value: string) => {
    if (value.slice(-1) === ' ') {
      setInVal('');
    } else {
      setInVal(value);
    }
    setMatch(checkMatch());
    setCount(checkCount());
  };

  // handle backspace and updating user internal input state
  const handleKeyDown = (keyCode: number, value: string) => {
      if( keyCode == 8 || keyCode == 46 ) {
          setUserInput(userInput.substring(0, userInput.length-1));
      } else {
          setUserInput(userInput + value);
      }
  };

  // handle creating and clearing the timer
  useEffect(() => {
    if (shouldStartTimer) {
      const id = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 1) {
            startTimer(false);
            setTimeLeft(60);
            clearTimeout(id);
        }
      }, 1000);
      return () => clearTimeout(id)
    }
  });

  return (
    <React.Fragment>
      <main>
        <div className='main-heading'>
          <h1>{props.title}</h1>
        </div>
        <p className='main-teaser'>
          {userMatch}
        </p>
        <div className='versions'>
          <span>
            Words Matched <span>{count}</span>
          </span>
          <span>
            Time Left <span>{timeLeft}</span>
          </span>
        </div>
        <p className='main-teaser small'>
          <input disabled={!shouldStartTimer} className='main-teaser small' type="text" value={inVal} placeholder="" onKeyDown={(e) => handleKeyDown(e.keyCode || e.charCode, e.key)} onChange={e => handleUserInput(e.target.value)} />
        </p>
        <br />
        {startButton(!shouldStartTimer, () => {
            startTimer(true);
            setCount(0);
            setMatch(checkMatch());
        })}
        {resetButton(shouldStartTimer, () => {
            startTimer(false);
            setTimeLeft(60);
            setCount(checkCount());
            setInVal('');
            setUserInput('');
        })}
      </main>
    </React.Fragment>
  );
};

export default hot(module)(Application);
