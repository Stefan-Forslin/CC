import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { 
	     signInWithGooglePopUp, 
	     createUserDocumentFromAuth 
		} from '../../utils/firebase/firebase.utils';
const SignIn = () => {
   const logGoogleUser = async () => {
	  const {user} = await signInWithGooglePopUp();
	  const userDocRef = await createUserDocumentFromAuth(user);
	};
	
	return (
		<div>
			<h1>sign in</h1>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
			<SignUpForm />
		</div>
	);
};
export default SignIn;