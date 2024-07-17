// src/services/UserProfileService.js

import { db } from "../Database/FirebaseConfig.mjs";
import { collection, getDocs } from "firebase/firestore";

const UserProfileService = {
  fetchProfiles: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userProfiles"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (err) {
      console.error("Error fetching data ", err);
      throw err;
    }
  }
};

export default UserProfileService;
