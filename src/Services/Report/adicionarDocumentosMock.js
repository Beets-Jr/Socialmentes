import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Database/FirebaseConfig.mjs';

// passar argumentos com base no que vier do componente 
const addDocument = async (testId) => {
  try {
    const docRef = await addDoc(collection(db, "report"), {
      testId: testId,
      dataProvideBy: "",
      pregnancy: {
        type: 0,
        withIntercurrences: false,
        description: "",
        timeWeeks: 0
      },
      breastfeeding: {
        withDifficulty: false,
        timeMonths: 0,
        observations: ""
      },
      foodIntroduction: {
        withIntercurrences: false,
        acceptsFood: 0,
        observations: ""
      },
      sittingCrawlingWalking: {
        period: 0,
        observations: ""
      },
      toiletTraining: {
        daytime: {
          occurred: false,
          ageYears: 0,
        },
        nightime: {
          occurred: false,
          ageYears: 0
        },
        observations: ""
      },
      autonomy: {
        acquiredSkills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        skillsWithDifficulty: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      toyRelationship: 0,
      skillsSuitableSymbolicPlay: false,
      socialSkills: 0,
      playSkills: {
        acquisitionSocialSkills: "",
        toyManipulation: "",
        followInstructions: "",
        playActions: "",
        symbolicObjects: "",
        dollsInanimate: "",
        imaginaryGames: "",
        storyScript: "",
        reciprocitySkills: "",
        playAlone: "",
        socialInteractionWithEvaluator: "",
        acceptPlay: "",
        comments: ""
      },
      socialEmotionalSkills: {
        spontaneousContact: "",
        showsAffection: "",
        smilesAndAnswersByName: "",
        observeBehavior: "",
        imitationOfGestures: "",
        lookForInterest: "",
        interpersonalContact: "",
        identifiesAndVerbalizesFeelings: "",
        understandsEmotions: "",
        understandsRelationships: "",
        comments: ""
      },
      speechAndLanguage: {
        level: 0,
        acquiredSkills: [0, 1, 2, 3, 4],
        skillsWithDifficulty: [0, 1, 2, 3, 4],
        simpleRequests: 0,
        describeActions: 0,
        tellStories: "",
        commentsGameSituationalBehavior: "",
        questionTopics: "",
        repeatsExperiences: "",
        comments: ""
      },
      domains: 0
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }
  
  for (let i = 0; i <= 0; i++) {
    addDocument(i);
  }
  