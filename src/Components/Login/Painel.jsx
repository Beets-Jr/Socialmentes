import styles from "./Login.module.css";
import { useState } from "react";

import EmailTextField from "./TextFields/EmailTextField";
import PasswordTextField from "./TextFields/PasswordTextField";

function Painel() {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value)
    console.log(name)
  }
  return (
    <div className={styles.painel}>
      <div className={styles.titulo}>Bem-vindo!</div>
      <div className={styles.subtitulo}>Sentimos a sua falta!</div>

      <EmailTextField />
      <PasswordTextField />

      {/* <p>Campo senha</p>

      <button>Entrar</button>

      <p>Esqueceu a senha</p>

      <p>Continuar com Google ou Facebook</p> */}
    </div>
  );
}

export default Painel;
