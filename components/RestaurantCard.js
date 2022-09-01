import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity/sanity';
import { useNavigation } from '@react-navigation/native';

//Review en este componente se hara lña navegacion a cada pagina del restaurante medainte el useNavigation

//NOTE aqui no existe el link ni el <a> entonces se manejan con evento de onPress en el touchable opacity
// NOTE onPress={()=>navigation.navigate('Restaurant')} aqui al picarle se navega al componente que marque el name de Stack Screen de App.js
//Para pasar props a donde se navega se pasan como parametros en el argumento de navigation
//REVIEW aqui usaremos la helperfunction de nuestro archivo de sanity para hacer un url usable par alas iamgenes
const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() =>
        navigation.navigate('Restaurant', {
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
        })
      }
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className=" text-green-500">{rating}</Text>. {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1  w-56">
          <MapPinIcon color={'gray'} opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500  w-4/5">
            {' '}
            Nearby . {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
