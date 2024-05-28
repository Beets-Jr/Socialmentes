/* eslint-disable no-unused-vars */
import { db } from '../FirebaseConfig.mjs'
import faker from 'faker';
import * as firebase from 'firebase/app';
import { clearCollection } from './clearCollection.mjs'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';

const generateRandomCPF = () => {
  // Função para gerar um dígito aleatório
  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  // Array para armazenar os dígitos do CPF
  const digits = [];

  // Gera os 9 primeiros dígitos do CPF
  for (let i = 0; i < 9; i++) {
    digits.push(generateRandomDigit());
  }

  // Calcula o primeiro dígito verificador do CPF
  const digit1 = 11 - (digits.map((d, i) => d * (10 - i)).reduce((acc, cur) => acc + cur, 0) % 11);
  digits.push(digit1 >= 10 ? 0 : digit1);

  // Calcula o segundo dígito verificador do CPF
  const digit2 = 11 - (digits.map((d, i) => d * (11 - i)).reduce((acc, cur) => acc + cur, 0) % 11);
  digits.push(digit2 >= 10 ? 0 : digit2);

  // Retorna o CPF formatado como string
  return digits.join('');
};

const generateRandomPhone = () => {
  const ddd = () => Math.floor(Math.random() * (99 - 11 + 1) + 11); // DDD entre 11 e 99
  const firstPart = () => Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Primeira parte do número
  const secondPart = () => Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Segunda parte do número
  return `${ddd()}${firstPart()}${secondPart()}`;
};

const generateRandomGender = () => {
  const genders = ['male', 'female', 'other'];
  return faker.random.arrayElement(genders);
};

const generateRandomPhotoUrl = () => {
  return faker.image.avatar();
};

const generateRandomPosition = () => {
  const positions = ['paciente', 'administrador', 'responsável', 'psicologo'];
  return faker.random.arrayElement(positions);
}
const seedData = async () => {
  await clearCollection('userProfiles');

  try {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.past().toLocaleDateString('pt-BR'),
        cpf: generateRandomCPF(),
        phone: generateRandomPhone(),
        gender: generateRandomGender(),
        photoUrl: generateRandomPhotoUrl(),
        createdAt: Timestamp.now().toDate().toISOString(),
        position: generateRandomPosition()
      };

      const userRef = await addDoc(collection(db, "userProfiles"), user);
      if (userRef && userRef.id) { // Verifica se userRef não é undefined e possui a propriedade id
        users.push({ id: userRef.id, ...user });
      } else {
        console.error('Error seeding data: userRef is undefined or does not have id property');
      }
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data: ', error);
  }
};

seedData().catch((error) => {
  console.error('Error in seed script: ', error);
});
