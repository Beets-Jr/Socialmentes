import LoginForm from "./LoginForm";

import styles from "../Login/Styles/Login.module.css";

function Painel() {
  return (
    <div className={styles.painel}>
      <div className={styles.titulo}>Bem-vindo!</div>
      <div className={styles.subtitulo}>Sentimos a sua falta!</div>
      <LoginForm />
    </div>
  );
}

export default Painel;
