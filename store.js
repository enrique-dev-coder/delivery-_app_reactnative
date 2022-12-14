import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice';
import restaurantReducer from './features/restaurantSlice';
export const store = configureStore({
  reducer: {
    //se supone que aqui ponemos los slices que se usaran en la store de la aplicacion
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
