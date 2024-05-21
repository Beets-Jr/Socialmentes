import LoginForm from "./LoginForm";

import styles from "../Login/Styles/Login.module.css";
import Line from "./Images/Line";

import SocialLoginButton from "../Login/Social Login/SocialLoginButton";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

function Painel() {
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    const auth_facebook = getAuth();

    signInWithPopup(auth_facebook, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className={styles.painel}>
      <div className={styles.titulo}>Bem-vindo!</div>
      <div className={styles.subtitulo}>Sentimos a sua falta!</div>

      <LoginForm />

      <div className={styles.campoEsqueceuSenha}>
        Esqueceu sua senha? <span>&nbsp;Clique aqui!</span>
      </div>

      <div className={styles.campoContinuar}>
        <Line />
        <div>Ou continue com</div>
        <Line />
      </div>

      <div className={styles.loginButtons}>
        <SocialLoginButton onClick={signInWithGoogle} provider="Google" />
        <SocialLoginButton onClick={signInWithFacebook} provider="Facebook" />
      </div>
    </div>
  );
}

export default Painel;
