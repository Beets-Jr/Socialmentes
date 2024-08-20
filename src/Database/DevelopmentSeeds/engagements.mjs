import { db } from '../FirebaseConfig.mjs'; // Certifique-se de que 'firebaseConfig' é o arquivo onde sua instância do Firestore está configurada
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Importa as funções necessárias do Firestore
import faker from 'faker';
import { getRandomPatient } from './tests.mjs';
import { format, addMinutes } from 'date-fns'; // Você pode precisar instalar date-fns



export async function getRandomUser() {
    try {
        const usersSnapshot = await getDocs(collection(db, "userProfiles"));
        const users = usersSnapshot.docs;

        if (users.length === 0) {
            console.log("No users found");
            return null;
        }

        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        const randomUserData = {
            id: randomUser.id,
            data: randomUser.data()
        };
        return randomUserData;
    } catch (error) {
        console.error("Error getting random User: ", error);
    }
}

const saveEngagement = async (engagementData) => {
    try {
        // Referência à coleção 'engagement'
        const engagementCollectionRef = collection(db, 'engagement');

        // Adiciona um documento na coleção 'engagement'
        await addDoc(engagementCollectionRef, engagementData);
        console.log('Compromisso salvo com sucesso:', engagementData);
    } catch (error) {
        console.error('Erro ao salvar o compromisso:', error);
    }
};


async function createAndSaveRandomEngagement() {
    // Títulos disponíveis
    const titles = [
        "Sessão de terapia",
        "Consulta psiquiátrica",
        "Sessão de terapia familiar"
    ];

    // Seleciona um título aleatório
    const randomTitle = faker.random.arrayElement(titles);

    // Obtém dados reais do paciente e do profissional
    const patient = await getRandomPatient();
    const professional = await getRandomUser();

    // Cria a data e hora atual e adiciona um intervalo para o horário de início
    const now = new Date();
    const startTime = faker.date.future(0.1); // Um pouco no futuro
    const endTime = addMinutes(startTime, faker.datatype.number({ min: 30, max: 120 })); // Adiciona de 30 a 120 minutos

    // Cria o objeto de compromisso com os dados fictícios
    const engagement = {
        title: randomTitle,
        description: faker.lorem.paragraph(),
        date: format(startTime, 'dd/MM/yyyy'), // Data no formato DD/MM/AAAA
        startTime: format(startTime, 'HH:mm'), // Horário de início
        endTime: format(endTime, 'HH:mm'), // Horário de fim
        location: faker.company.companyName(),
        patient: {
            patient_id: patient.id,
            patient_name: patient.data.children.name,
        },
        professional: {
            professional_id: professional.id,
            professional_name: professional.data.fullName,
        },
        notification: faker.random.arrayElement([5, 10, 15, 20, 25, 30]), // Notificação em minutos
    };

    // Salva o compromisso no Firestore
    await saveEngagement(engagement);
}

// Função principal que gera e salva múltiplos compromissos aleatórios no Firestore
async function generateAndSaveMultipleEngagements(numberOfEngagements) {
    for (let i = 0; i < numberOfEngagements; i++) {
        await createAndSaveRandomEngagement();
    }
}

// Exemplo de uso: gera e salva 10 compromissos aleatórios
generateAndSaveMultipleEngagements(250);
