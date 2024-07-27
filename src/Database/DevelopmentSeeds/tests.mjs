import { Timestamp, getDocs, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../FirebaseConfig.mjs';
import { clearCollection } from './clearCollection.mjs';
import { denver } from '../../Utils/denver.mjs';

let id = 1;

// Function to get a random patient document
async function getRandomPatient() {
    try {
        const patientsSnapshot = await getDocs(collection(db, "patients"));
        const patients = patientsSnapshot.docs;

        if (patients.length === 0) {
            console.log("No patients found");
            return null;
        }

        const randomIndex = Math.floor(Math.random() * patients.length);
        const randomPatient = patients[randomIndex];

        const randomPatientData = {
            id: randomPatient.id,
            data: randomPatient.data()
        };
        return randomPatientData;
    } catch (error) {
        console.error("Error getting random patient: ", error);
    }
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Função para selecionar um número aleatório de categorias para um determinado nível
const selectRandomCategories = (level) => {
    if (level < 1 || level > denver.length) {
        console.error(`Nível ${level} fora do intervalo.`);
        return [];
    }

    const categories = denver[level - 1].categorias;
    const numCategories = categories.length;

    // Gerar um número aleatório de categorias entre 1 e numCategories
    const numSelectedCategories = getRandomNumber(1, numCategories);

    // Selecionar aleatoriamente as categorias
    const selectedCategories = [];
    const usedIndexes = new Set();

    while (selectedCategories.length < numSelectedCategories) {
        const randomIndex = getRandomNumber(0, numCategories - 1);
        if (!usedIndexes.has(randomIndex)) {
            selectedCategories.push(categories[randomIndex]);
            usedIndexes.add(randomIndex);
        }
    }

    return selectedCategories;
};

// Função principal para selecionar aleatoriamente nível e categorias
const selectRandomLevelAndCategories = () => {
    const randomLevel = getRandomNumber(1, denver.length);
    const randomCategories = selectRandomCategories(randomLevel);
    return { level: randomLevel, categories: randomCategories };
};
// Function to add a test
async function addTest() {
    const patient = await getRandomPatient();  // Use await here

    if (patient) {
        const { level, categories } = selectRandomLevelAndCategories();
        // Construir objeto de perguntas dinamicamente
        const questions = {};
        questions[`level_${level}`] = {};

        categories.forEach(category => {
            questions[`level_${level}`][`category_${category.id}`] = {};

            // Iterar sobre as perguntas da categoria
            category.perguntas.forEach(pergunta => {
                questions[`level_${level}`][`category_${category.id}`][`question_${pergunta.id}`] = getRandomNumber(0, 3);
            });
        });

        const test = {
            questions: questions,
            timestamp: Timestamp.now().toDate().toISOString(),
            id: id,
            testType: "denver",
            situation: 0,
            patientId: patient.id,
            patientName: patient.data.children.name,
        };

        id++;
        console.log("Test data: ", test);

        // Add the test to the Firestore collection
        try {
            await addDoc(collection(db, "tests"), test);
            console.log("Test added successfully");
            const patientDocRef = doc(db, "patients", patient.id);
            await updateDoc(patientDocRef, {
                tests: arrayUnion(test.id)  // Adiciona o novo teste ao array tests do paciente
            });
            console.log("Test added to patient's tests array successfully");
        } catch (error) {
            console.error("Error adding test: ", error);
        }
    }
}

await clearCollection('tests');
for (let i = 0; i < 3; i++) {
    addTest();
}

