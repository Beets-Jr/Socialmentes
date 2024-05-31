import LoginForm from "./LoginForm";
import styles from "../Login/Styles/Painel.module.css";
import Line from "../../Assets/Icons/Line";
import SocialLoginButton from "../Login/Social Login/SocialLoginButton";
import { useAuth } from "./AuthContext";

function Painel() {
  const { signInWithFacebook } = useAuth();
  const { signInWithGoogle } = useAuth();

  return (
    <div className={styles.painel}>
      <div className={styles.titulo}>Bem-vindo!</div>
      <div className={styles.subtitulo}>Sentimos a sua falta!</div>

      <LoginForm />

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
