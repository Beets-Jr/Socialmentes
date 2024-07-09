import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig.mjs";

/**
 * Função para recuperar todos os dados dos pacientes
 */
export async function getAllPatients() {
    const patientsCol = collection(db, "patients");

    try {
        const patientSnapshot = await getDocs(patientsCol);
        const patients = [];

        patientSnapshot.forEach((doc) => {
            const data = doc.data();

            // Verifique se todos os campos necessários existem
            if (data && data.children && data.children.name && data.children.dateBirth && data.externalMonitoring && data.externalMonitoring.length > 0 && data.externalMonitoring[0].name) {
                const birthDate = new Date(data.children.dateBirth.split('/').reverse().join('-'));
                
                // Calculando a idade em anos e meses
                const now = new Date();
                let years = now.getFullYear() - birthDate.getFullYear();
                let months = now.getMonth() - birthDate.getMonth();

                if (months < 0) {
                    years--;
                    months += 12;
                }

                const psychologistName = data.externalMonitoring[0].name;

                patients.push({
                    id: doc.id,
                    childName: data.children.name,
                    age: `${years} anos e ${months} meses`,
                    psychologistName
                });
            } else {
                console.warn(`Documento ${doc.id} não possui todos os campos necessários.`);
            }
        });

        return patients;
    } catch (error) {
        console.error("Erro ao recuperar os documentos:", error);
        return [];
    }
}
