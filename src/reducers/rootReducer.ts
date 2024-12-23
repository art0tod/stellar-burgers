import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import authReducer from '../slices/authSlice';
import orderReducer from '../slices/orderSlice';
import constructorReducer from '../slices/constructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  order: orderReducer,
  constructor: constructorReducer
});

export default rootReducer;
