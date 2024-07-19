import { db } from "../Database/FirebaseConfig.mjs";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const UserProfileService = async () =>  {
    try {
      const querySnapshot = await getDocs(collection(db, "userProfiles"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (err) {
      console.error("Error fetching data ", err);
      throw err;
    }
};

export const updateUserPosition = async (userID, newPosition) => {
    const getUserDocRef = doc(db, 'userProfiles', userID);
    try {
      await updateDoc(getUserDocRef, { position: newPosition });
      console.log('Position updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating position:', error);
      return false;
    }
};
