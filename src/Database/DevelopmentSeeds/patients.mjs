import { collection, addDoc, Timestamp  } from 'firebase/firestore';
import { db } from '../FirebaseConfig.mjs';

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random IDs for interventionTeams
function getRandomIds(ids, count) {
    const randomIds = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = getRandomInt(0, ids.length - 1);
        randomIds.push(ids[randomIndex]);
    }
    return randomIds;
}

// List of possible intervention team IDs
const interventionTeamIds = [
    'UPcf2MzT5mRkOAbj6P3UhdkBSOZ2',
    'cjGddqARkAVgbu2e1OiQ5rPivr32',
    'gJ6T7kctACT6SqM0Mfp5rfvyhU83',
    'lGglqvoJo1MFXtySh6kODaKKUgr2',
    'oI30JZ1o9YNnqNTC9oaL9K3Wg5q1'
];

// Function to generate a random patient data object
function generateRandomPatient() {
    return {
        financialResponsible: 'Maria da Silva',
        school: {
            name: 'Escola Exemplo',
            email: 'contato@escolaexemplo.com.br',
            phone: '(31) 33322-1234',
            series: getRandomInt(1, 9).toString()
        },
        children: {
            rg: `${getRandomInt(10, 99)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`,
            name: `Criança ${getRandomInt(1, 100)}`,
            dateBirth: `${getRandomInt(2000, 2015)}-01-01`,
            cpf: `${getRandomInt(100, 999)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`
        },
        externalMonitoring: [
            {
                phone: '(31) 99876-5432',
                email: 'dr.carlos@example.com',
                professional: 'Psicologo',
                name: 'Dr. Carlos Pereira'
            }
        ],
        address: {
            cep: '12345-678',
            state: 'MG',
            number: getRandomInt(1, 1000).toString(),
            addressDetails: 'Apto 101',
            street: 'Rua dos Bobos',
            city: 'Belo Horizonte',
            neighborhood: 'Centro'
        },
        profissionalResponsible: 'Diretor Exemplo',
        observation: 'Nenhuma observação',
        caregivers: {
            caregiver2: {
                rg: `${getRandomInt(10, 99)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`,
                email: 'ana.silva@example.com',
                phone: '(31) 91234-5678',
                kinship: 'Mãe',
                name: 'Ana da Silva',
                cpf: `${getRandomInt(100, 999)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`,
                dateBirth: '1975-08-20'
            },
            caregiver1: {
                dateBirth: '1970-05-15',
                phone: '(31) 98765-4321',
                kinship: 'Pai',
                name: 'José da Silva',
                email: 'jose.silva@example.com',
                cpf: `${getRandomInt(100, 999)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`,
                rg: `${getRandomInt(10, 99)}.${getRandomInt(100, 999)}.${getRandomInt(100, 999)}-${getRandomInt(0, 9)}`
            }
        },
        interventionTeams: getRandomIds(interventionTeamIds, getRandomInt(1, 5)), // 1 to 5 random IDs
        createdAt: Timestamp.now().toDate().toISOString(),
    };
}

// Function to populate the patients collection with random data
async function populatePatients(count) {
    for (let i = 0; i < count; i++) {
        const randomPatient = generateRandomPatient();
        try {
            await addDoc(collection(db, "patients"), randomPatient);
            console.log(`Patient ${i + 1} added successfully`);
        } catch (error) {
            console.error(`Error adding patient ${i + 1}: `, error);
        }
    }
}

// Populate the patients collection with 10 random patients
populatePatients(30);
