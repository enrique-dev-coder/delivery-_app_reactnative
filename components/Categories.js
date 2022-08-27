import { View, Text, ScrollView } from 'react-native';
import CategoryCard from './CategoryCard';
import React from 'react';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/*CategoryCard*/}
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing" />
    </ScrollView>
  );
};

export default Categories;
