import { View, Text, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import React, { useEffect, useState } from 'react';
import client from '../sanity/sanity';

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  //hacer un useEffect con la petivion par ael restaurante aunque tambien se podria hacer que se pasen los datos como props
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      }
    }[0]
    
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);
  // console.log(restaurants);
  return (
    <View>
      <View className="mt-4 px-4 flex-row items-center justify-between">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        //inner padding
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/*reataurant cards*/}
        {restaurants.map((res, i) => (
          <RestaurantCard
            key={i}
            imgUrl={res.image}
            title={res.name}
            rating={res.rating}
            genre={res.type?.name}
            address={res.address}
            short_description={res.short_description}
            dishes={res.dishes}
            long={res.long}
            lat={res.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
