import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MailIcon from "@mui/icons-material/Mail";

import EmailIcon from "../Icons/EmailIcon";

function EmailTextField() {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
    console.log(e.target.value); // Corrigido para imprimir o valor atualizado
  }

  return (
    <FormControl
      sx={{
        width: "100%",
      }}
      variant="outlined"
    >
      <InputLabel
        htmlFor="outlined-email-input"
        sx={{
          display: "flex",
          alignItems: "center", // Alinha verticalmente o conteúdo da label e da imagem
          width: "auto", // Define a largura para se ajustar ao conteúdo
        }}
      >
        <span style={{ marginRight: '8px' }}>
          <EmailIcon />
        </span>
        E-mail
      </InputLabel>
      <OutlinedInput
        id="outlined-email-input"
        label="UserEmail" // Espaço em branco para evitar que o placeholder seja exibido
        value={email} // Adicionado o valor do email
        onChange={handleChange} // Corrigido para chamar a função de handleChange
      />
    </FormControl>
  );
}

export default EmailTextField;
