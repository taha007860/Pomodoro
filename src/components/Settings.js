import React from 'react';
import './Settings.css';
import { useAppliedContext } from './Context';

const Settings = ({ onCloseSettings }) => {
  const { pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, setTextColors, setButtonColors, setWorkTime } = useAppliedContext();

  const handleInputChange = (value, setter) => {
    if (value === '' || (value >= 1 && value <= 99)) {
      setter(value);
    } else {
      setter('');
    }
  };
  const setTimer = (pomodoro, shortBreak, longBreak) => {
    setPomodoroTime(pomodoro);
    setShortBreakTime(shortBreak);
    setLongBreakTime(longBreak);
    setWorkTime(pomodoroTime * 60);
  };

  const handleSetTimer = () => {
    setButtonColors({
      work: '#FE6F6B',
      shortBreak: '',
      longBreak: ''
    });
    setTextColors({
      shortBreak: '',
      longBreak: '',
    })
    setTimer(pomodoroTime, shortBreakTime, longBreakTime);
    console.log('Timer settings saved:', {
      pomodoro: pomodoroTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
    });
    onCloseSettings(); // Close the settings modal
  };

  return (
    <>
      <div className="settings-container">
        <div className="input-group">
          <input
            type="number"
            value={pomodoroTime}
            onChange={(e) => handleInputChange(parseInt(e.target.value), setPomodoroTime)}
            inputMode="numeric"
          />
          <label>Pomodoro Time (minutes)</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            value={shortBreakTime}
            onChange={(e) => handleInputChange(parseInt(e.target.value), setShortBreakTime)}
            inputMode="numeric"
          />
          <label>Short Break Time (minutes)</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            value={longBreakTime}
            onChange={(e) => handleInputChange(parseInt(e.target.value), setLongBreakTime)}
            inputMode="numeric"
          />
          <label>Long Break Time (minutes)</label>
        </div>
      </div>
      <button id="set" onClick={handleSetTimer}>
        Set Timer
      </button>
    </>
  );
};

export default Settings;
