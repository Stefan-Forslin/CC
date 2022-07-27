import { initializeApp } from 'firebase/app';
import { 
	     getAuth, 
	     signInWithRedirect, 
		 signInWithPopup,
		 GoogleAuthProvider 
	   } from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore'
const firebaseConfig = {
	apiKey: "AIzaSyC_fY8H30rlT9LyAfndYuMcBtoKdX8QAOQ",
	authDomain: "crown-db-721dc.firebaseapp.com",
	projectId: "crown-db-721dc",
	storageBucket: "crown-db-721dc.appspot.com",
	messagingSenderId: "452019945584",
	appId: "1:452019945584:web:2346ef8f2c2d79975b74b5"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
	prompt: "select_account"
  });
  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		try {
		   await setDoc(userDocRef, {
			displayName,
			email,
			createdAt
		   });
		} catch (error) {
		  console.log('error creating the user', error.message);
		}
	  }
	  return userDocRef;
  };