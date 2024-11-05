import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./src/Database/FirebaseConfig.mjs";

// Função para verificar documento com campo "id"
async function checkTestById(id) {
    try {
      const testsRef = collection(db, "tests");
  
      const q = query(testsRef, where("id", "==", id));
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log("Documento encontrado:", doc.id, doc.data());
        });
        return true;
      } else {
        console.log("Nenhum documento com esse id foi encontrado.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao consultar o Firestore:", error);
      return false;
    }
  }
  
  // Para rodar diretamente neste arquivo, você pode fazer o seguinte:
  const id = 75; // Substitua pelo ID que deseja consultar
  checkTestById(id);