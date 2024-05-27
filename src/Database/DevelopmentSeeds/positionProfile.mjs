import { db } from '../FirebaseConfig.mjs';
import { Timestamp, addDoc, collection } from 'firebase/firestore/lite';
import faker from 'faker';


const generateRandomPhotoUrl = () => {
    return faker.image.avatar();
  };

const positions = ['Paciente', 'Psicólogo', 'Administrador', 'Responsável'];

// Função para adicionar usuários
const seedUsers = async () => {
  try {

    // Gerar e adicionar usuários
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        fullName: faker.name.findName(),
        photoUrl: generateRandomPhotoUrl(),
        createdAt: Timestamp.now().toDate().toISOString(),
        // Associar um cargo aleatório ao usuário
        position: faker.random.arrayElement(positions),
      };

      const userRef = await addDoc(collection(db, 'userProfiles'), user);
      if (userRef && userRef.id) {
        users.push({ id: userRef.id, ...user });
      } else {
        console.error('Error seeding data: userRef is undefined or does not have id property');
      }
    }

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding data: ', error);
  }
};

// Função principal para executar o script de seed
const seedData = async () => {
  try {
    await seedUsers(); // Adicionar usuários
  } catch (error) {
    console.error('Error in seed script: ', error);
  }
};

// Executar o script de seed
seedData().catch((error) => {
  console.error('Error in seed script: ', error);
});
