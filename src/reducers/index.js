"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';
import {contactReducers}  from './contactReducers'

//HERE COMBINE THE REDUCERS
export default combineReducers({
  books: booksReducers,
  cart: cartReducers,
  contact: contactReducers
})
