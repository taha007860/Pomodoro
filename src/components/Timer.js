import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Timer.css';
import { useAppliedContext } from './Context';

const Timer = ({ onSettingsClick }) => {
  const { pomodoroTime, shortBreakTime, longBreakTime, workTime, setWorkTime, isRunning, setIsRunning, timerKey, setTimerKey, currentMode, setCurrentMode, setButtonColors, setTextColors, buttonColors, textColors } = useAppliedContext();
  

  const startHandler = (time, mode) => {
    setWorkTime(time);
    setIsRunning(false);
    setCurrentMode(mode);
    setTimerKey((prevKey) => prevKey + 1);

    // Update button colors based on the mode
    setButtonColors({
      work: mode === 'pomodoro' ? '#FE6F6B' : '',
      shortBreak: mode === 'shortBreak' ? '#FE6F6B' : '',
      longBreak: mode === 'longBreak' ? '#FE6F6B' : '',
    });
    setTextColors({
      work: mode === 'pomodoro' ? 'black' : '',
      shortBreak: mode === 'shortBreak' ? 'black' : '',
      longBreak: mode === 'longBreak' ? 'black' : '',
    })

  };

  const pauseHandler = () => {
    setIsRunning(false);
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const toggleMode = () => {
    switch (currentMode) {
      case 'pomodoro':
        return pomodoroTime;
      case 'shortBreak':
        return shortBreakTime;
      case 'longBreak':
        return longBreakTime;
      default:
        return currentMode;
    }
  };

  const startBtnHandler = () => {
    setWorkTime(toggleMode() * 60);
    setIsRunning(true);
    setCurrentMode(currentMode);
  };

  const formatTime = (seconds) => {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div className="timer-container">
      <div className="button-container">
      <button
  autoFocus
  className="work-button"
  style={{ backgroundColor: buttonColors.work, color: textColors.work }}
  onClick={() => startHandler(pomodoroTime * 60, 'pomodoro')}
>
  Work
</button>
<button
  className="short-break-button"
  style={{ backgroundColor: buttonColors.shortBreak, color: textColors.shortBreak }}
  onClick={() => startHandler(shortBreakTime * 60, 'shortBreak')}
>
  Short Break
</button>
<button
  className="long-break-button"
  style={{ backgroundColor: buttonColors.longBreak, color: textColors.longBreak }}
  onClick={() => startHandler(longBreakTime * 60, 'longBreak')}
>
  Long Break
</button>
        <button className="settings-button" onClick={handleSettingsClick}>
          Settings
        </button>
      </div>

      <div className='countdown-timer'>
        <div className='countdown-shadow'></div>
        <CountdownCircleTimer
          key={timerKey}
          className='countdown-circle-timer'
          isPlaying={isRunning}
          duration={workTime}
          colors={[['#3498db']]}
          onComplete={() => setIsRunning(false)}
          size={200}
          strokeWidth={0}
        >
          {({ remainingTime }) => (
            <div className='countdown-text'>
              {formatTime(remainingTime)}
            </div>
          )}
        </CountdownCircleTimer>
      </div>

      <div className="start-pause-buttons">
        <button className="start-button" onClick={startBtnHandler} disabled={isRunning}>
          Start/Continue
        </button>
        <button className="pause-button" onClick={pauseHandler} disabled={!isRunning}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Timer;

