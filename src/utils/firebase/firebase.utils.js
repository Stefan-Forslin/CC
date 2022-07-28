import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, 
	     doc, 
		 getDoc, 
		 setDoc } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: "AIzaSyC_fY8H30rlT9LyAfndYuMcBtoKdX8QAOQ",
	authDomain: "crown-db-721dc.firebaseapp.com",
	projectId: "crown-db-721dc",
	storageBucket: "crown-db-721dc.appspot.com",
	messagingSenderId: "452019945584",
	appId: "1:452019945584:web:2346ef8f2c2d79975b74b5"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
	prompt: 'select_account',
  });
  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
  ) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	if (!userSnapshot.exists()) {
	  const { displayName, email } = userAuth;
	  const createdAt = new Date();
	  try {
		await setDoc(userDocRef, {
		  displayName,
		  email,
		  createdAt,
		  ...additionalInformation,
		});
	  } catch (error) {
		console.log('error creating the user', error.message);
	  }
	}

	return userDocRef;
  };
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
  
	return await createUserWithEmailAndPassword(auth, email, password);
  };
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
  };