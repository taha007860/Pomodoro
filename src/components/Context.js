import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [workTime, setWorkTime] = useState(pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [currentMode, setCurrentMode] = useState('');
  const [buttonColors, setButtonColors] = useState({
    work: '#FE6F6B',
    shortBreak: '',
    longBreak: '',
  });
  const [textColors, setTextColors] = useState({
    work: 'black',
    shortBreak: '',
    longBreak: '',
  });

  return (
    <Context.Provider
      value={{
        pomodoroTime,
        setPomodoroTime,
        setShortBreakTime,
        setLongBreakTime,
        shortBreakTime,
        longBreakTime,
        workTime,
        setWorkTime,
        isRunning,
        setIsRunning,
        timerKey,
        setTimerKey,
        currentMode,
        setCurrentMode,
        buttonColors,
        setButtonColors,
        textColors,
        setTextColors,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppliedContext = () => {
  return useContext(Context);
};
