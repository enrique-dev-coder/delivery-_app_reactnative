import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    //el action.payload es agregarle al final al array viene del dispatch action  y del state se accede a items que se definio arriba
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //findIndex devuelve true cuando encuentra una coincidencia en una rray, en este caso es el id de los items
      //priemro le decimos que encuentre el id que le estamos pasando en la canasta de items
      //index devuelve un numero , si este numero es mayor que cero quiere decir que se encontro en una posicion del arreglo el id que le estamos pasando
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      //creas una nueva basket con los items que quedaron del estado
      let newBasket = [...state.items];

      index >= 0
        ? newBasket.splice(index, 1)
        : `Cant remove product (id:${action.payload.id}) as its not in the basket`;
      //reemplazas la basket vieja por la nueva
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

//el selector te da acceso a la store global
export const selectBasketItems = (state) => state.basket.items;

//seleccionar los platos solo de esa fila
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

//funcion para sumar el total del precio usando el metodo de array de reduce para la sumatoria
//aqui va a sacar un total de ir sumando los prices de cada plato
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
