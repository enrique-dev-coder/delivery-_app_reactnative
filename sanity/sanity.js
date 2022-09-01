import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  //este dato sale del sanity.json
  projectId: 'dpkbnysa',
  dataset: 'production',
  useCdn: 'true',
  apiVersion: '2021-10-21',
});
//el image builder necesita un cliente para funcionar al parecer
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

//NOTE para delpoyar el proyecto se usa sanity deploy en la termina
//NOTe en localhost en la parte de vision se pueden hacer las querys de cada cosa

/*
link donde explica como hacer un query
https://www.sanity.io/docs/how-queries-work
esto es para ahcer querys en sanity , no es graphql  es un lengauje que se llama GROQ y la idea es que por ejemplo buscas por el nombre featured y los ..., son para que te copie todo antes de el array de restaurantes

*[_type == "featured"]{
  ...,
  restaurants[]->{
    ...,
    dishes[]->,
    type->{
      name
    }
  }
}
*/
