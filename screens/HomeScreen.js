import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
const HomeScreen = () => {
  //tener acceso a la navegacion para personalizar
  const navigation = useNavigation();

  //lo usamos parecido  a useEffect, cuando se carge la pantalla has algo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //El safeAreaView solo funciona con IOS
  //NOTE: en React native todo es flex por default y aparte es flex-col en vez de row como en web
  //NOTE : en react native la view es como un div
  //NOTE: para hcer un scrollable container se necesita un <ScrollView/>

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="mt-10 flex-row items-center mx-4 pb-3 space-x-2  ">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl ">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/*Search box*/}
      <View className="flex-row items-center space-x-2 py-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-md">
          <MagnifyingGlassIcon color="#00CCBB" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      {/*Body with scrollable container
      para que agarre todo el contenido de la pantalla se le da ese padding bottom
      */}
      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{
          paddingBottom: 200,
        }}
      >
        {/*Categories*/}
        <Categories />
        {/*Featured Rows*/}
        <FeaturedRow
          id="1"
          title="Featured"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="2"
          title="Featured"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="3"
          title="Featured"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="3"
          title="Featured"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="3"
          title="Featured"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
