import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import {
  selectBasketItems,
  removeFromBasket,
  selectBasketTotal,
} from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity/sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const navigation = useNavigation();
  //llamar el estado global del restaurante
  const restaurant = useSelector(selectRestaurant);
  //llamar a los items que son los platillos
  const items = useSelector(selectBasketItems);
  //console.log(restaurant);
  const dispatch = useDispatch();
  //group items list
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  //calcular el total de la canasta
  const basketTotal = useSelector(selectBasketTotal);

  //agrupar items para que te pongan de a 3 platillos por ejemplos
  //se usa useMemo que devuleve un valor memeorizado osea que tu programa ya tenga antes
  //se supone que useMemo solo sirve para renderizar el rendimiento
  useMemo(() => {
    //aqui haces un objeto que agrupe los platillos
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  console.log(groupedItemsInBasket);
  //console.log(restaurant);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <View className="bg-white">
          {/*titulo de la pantalla*/}
          <View className="justify-center items-center pt-10 pb-5">
            <Text className="text-lg font-bold ">Basket</Text>
            <Text className="text-2xl font-bold  text-[#00CCBB] ">
              {restaurant.title}
            </Text>
          </View>
          {/*boton para regresar*/}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute right-5  top-[50px]"
          >
            <XCircleIcon color={'#00CCBB'} size="40" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center bg-white my-5 p-4">
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full mr-2"
          />
          <Text className="flex-1 font-semibold">Deliver in 50 - 75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        {/*renderizar la data 
        trukazo con divide-y a todos los children es de Tailwind
        */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className=" text-gray-500">
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>
              {/*boton para quitar de la canasta
              recibe como parametro el id del objeto para qutiarlo del estado
               el remove items from basket quita de uno en uno, no quita todos de golpe

              */}
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs ">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="bg-white mt-5 p-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400 font-semibold">Sub Total</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="USD" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 font-semibold">Delivery fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={4.99} currency="USD" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-extrabold">Order Total</Text>
            <Text className="">
              <Currency quantity={basketTotal + 4.99} currency="USD" />
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#00CCBB] rounded-lg p-4"
            onPress={() => navigation.navigate('PreparingOrderScreen')}
          >
            <Text className="text-center text-white font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
