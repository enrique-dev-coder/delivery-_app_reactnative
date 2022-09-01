import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity/sanity';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';

import DishRow from '../components/DishRow';

//NOTE el useRoute es un hook que trae los parametros de navegacion qeu vienen de el componente card, esto esta bien para ya no tener que hacer otra peticion al momento de cargar la pagina de restaurante
const RestaurantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  //console.log(dishes);
  //tener acceso a la navegacion para personalizar
  const navigation = useNavigation();

  //lo usamos parecido  a useEffect, cuando se carge la pantalla has algo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4 "
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-15 p-2 bg-gray-100 rounded-full  right-[300px]"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row space-x-2 my-1 items-center ">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> . {genre}
              </Text>
            </View>
            <View className="flex-row space-x-2 my-1 items-center ">
              <MapPinIcon color="gray" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500 w-3/5">
                <Text className="text-gray-500">{address}</Text>
              </Text>
            </View>
          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-y border-gray-300">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
          <Text className="pl-2 text-md font-bold flex-1">
            Have a food allergy?
          </Text>
          <ChevronRightIcon color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        {/*Disho row o los platillos de los restaurantes*/}
        {/*los dishes ya son un array que vienen desde las propiedades */}
        {dishes.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
