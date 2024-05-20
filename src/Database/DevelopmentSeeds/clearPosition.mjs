import { clearCollection } from './clearCollection.mjs';

// Nome da coleção que você deseja limpar
const collectionName = 'userProfiles'; // Substitua pelo nome da sua coleção

// Chame a função clearCollection e passe o nome da coleção como argumento
clearCollection(collectionName)
  .then(() => {
    console.log(`Collection ${collectionName} cleared successfully.`);
  })
  .catch((error) => {
    console.error(`Error clearing collection ${collectionName}: `, error);
  });