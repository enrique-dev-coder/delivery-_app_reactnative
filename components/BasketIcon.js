import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

const BasketIcon = () => {
  //acceder a la basket que es el estado global
  //export const selectBasketItems = (state) => state.basket.items; de aqui sale el estado global
  //el useSelector es un hoom que recibe esa funcion de parametros
  const items = useSelector(selectBasketItems);

  //lamamos la navegacion para cambiar de rutas o pantallas
  //usamos el metodo de navigate con el name Basket que se ledio en el Stack view de la aplicacion principal
  const navigation = useNavigation();

  //el total de la canasta que es el array reducido al valor de los precios
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01A296]">
          {items.length}
        </Text>
        <Text className="flex-1 text-center text-lg font-extrabold text-white">
          View Basket
        </Text>
        <Text className="text-lg text-white  font-extrabold">
          <Currency quantity={basketTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
