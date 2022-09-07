import { View, Text, TouchableOpacity, Image } from 'react-native';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity/sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  selectBasketItemsWithId,
  selectBasketItems,
  removeFromBasket,
} from '../features/basketSlice';
const Dishrow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  //aqui le estas diciendo que te haga un array por cada id diferente y que te muestre la longiutd de ese array de cada plato agregado a la canasta
  //el use Selector lo que hace es que te da acceso a los datos globales de la canasta
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    //captar el error por si es 0 y le pican un menus
    //cuando esta 3n 0 no te  corre la funcion
    if (items.length === 0) return;
    dispatch(removeFromBasket({ id }));
  };
  console.log(items);
  return (
    <>
      <TouchableOpacity
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && 'border-b-0'
        }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-500">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4 "
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              //tambien puedes hacer un disabled dependiendo de uan condicion
              disabled={items.length === 0}
            >
              <MinusCircleIcon
                size={40}
                color={items.length === 0 ? 'gray' : '#00CCBB'}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={() => addItemToBasket()}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Dishrow;
