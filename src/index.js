import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calc from './pages/index.jsx';
//import onKey from './scripts/keypress';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Calc/>
  </React.StrictMode>,
  document.getElementById('root')
);

//document.addEventListener('keydown', onKey.bind(Calc));
serviceWorker.unregister();
