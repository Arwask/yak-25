import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
registerServiceWorker();
