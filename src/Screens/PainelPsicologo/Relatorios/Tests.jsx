import Test from "../../../Components/PainelPsicologo/Relatorios/Test";

function Tests() {

    return (
      <>
        <Test 
          index='12345' 
          createdAt={new Date()} 
          type='TipoA'
          status='Ativo'
          patient= 'Paciente X'
        />
      </>
    )
  }
  
  export default Tests