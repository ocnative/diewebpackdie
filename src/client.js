"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
// STEP 1 create the store
const middleware =applyMiddleware(thunk, logger());
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
import ContactForm from './components/pages/contact';
import AboutPage from './components/pages/about';

const Routes = (
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={BooksList}/>
            <Route path="/admin" component={BooksForm}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/contact" component={ContactForm} />
            <Route path="/about" component={AboutPage} />            
        </Route>
      </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);
