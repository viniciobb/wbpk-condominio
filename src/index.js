// import React from 'react';
// import ReactDOM from 'react-dom';


// import App from './components/App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


"use strict";
//import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import InitializeActions from './actions/initializeActions';
import App from './components/app';

InitializeActions.initApp();

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    
) , document.getElementById('app'));

// Router.run(routes, function(Handler){
//     React.render(<Handler/>, document.getElementById('app'));
// }); 