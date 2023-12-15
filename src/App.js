// App.js
import React, {useState} from 'react';
import { Provider } from './components/Context';
import Settings from './components/Settings';
import Timer from './components/Timer';
import './App.css';

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  

  const showSettingsHandler = () => {
    setShowSettings(true);
  };

  const closeSettingsHandler = () => {
    setShowSettings(false);
    
  };

  return (
    <Provider>
      <div className="app-container">
        <div className='heading'>
          <h1>Pomodoro</h1>
          <small>Be productive the right way.</small>
        </div>
        {!showSettings && (
          <div>
            <Timer onSettingsClick={showSettingsHandler} />
          </div>
        )}
        {showSettings && (
          <Settings onCloseSettings={closeSettingsHandler} />
        )}
      </div>
    </Provider>
  );
};

export default App;
