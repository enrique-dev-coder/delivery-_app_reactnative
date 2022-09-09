import { createSlice } from '@reduxjs/toolkit';
//el estado incial es un restaurante con los campos vacios
const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  //aqui lo unio que queire decir es que el estado va a ser igual al restaurante que vmaos a seleccionar
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

//el selector te da acceso a la store global
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
