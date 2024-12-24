import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import authReducer from '../slices/authSlice';
import orderReducer from '../slices/orderSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
});

export default rootReducer;
