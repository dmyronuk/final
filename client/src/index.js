import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
