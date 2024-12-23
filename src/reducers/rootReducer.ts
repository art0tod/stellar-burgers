import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
// import authReducer from './authSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
  // auth: authReducer
});

export default rootReducer;
