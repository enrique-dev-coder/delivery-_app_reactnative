import { View, Text, ScrollView } from 'react-native';
import CategoryCard from './CategoryCard';
import React, { useState, useEffect } from 'react';
import client, { urlFor } from '../sanity/sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client.fetch(`*[_type == "category"]`).then((data) => setCategories(data));
  }, []);
  // console.log(categories);
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
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
