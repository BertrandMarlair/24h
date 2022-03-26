import { createContext, useEffect, useReducer } from 'react';
import Race from './components/race/Race';
import UserList from './components/userList/UserList';
import { getLocalstorage, setLocalstorage } from './core/localStorage';
import reducer from './core/reducer';
import "./index.css";

export const config = {
  distance: 2600,
  duration: 300000,
}

const defaultValue = {
  users: [],
  lastRun: {
    velo1: {
      endAt: null,
      name: null,
    },
    velo2: {
      endAt: null,
      name: null,
    },
  }
};

export const RaceContext = createContext();

const App = () => {
  const _defaultValue = getLocalstorage("race");
  const _recuder = useReducer(reducer, _defaultValue ?? defaultValue);

  useEffect(() => {
    setLocalstorage("race", _recuder[0]);
  }, [_recuder])

  return (
    <RaceContext.Provider value={_recuder}>
      <div className="App">
        <div id="svg-container">
          <Race velo="velo2" />
          <Race velo="velo1" />
        </div>
        <UserList />
      </div>
    </RaceContext.Provider>
  );
}

export default App;
