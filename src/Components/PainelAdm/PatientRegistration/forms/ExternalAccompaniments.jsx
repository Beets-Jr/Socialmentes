import React from 'react';
import STextField from '../STextField';
import SSelectBox from '../SSelectBox';
import AddButton from '../AddButton';
import SDividerAc from '../SDividerAc';
import DeleteButton from '../DeleteButton';


const teamAccompanimentOptions = ['Fono', 'Neurologista', 'Pediatra', 'Psicologo', 'Psiquiatra', 'Outros'];


const ExternalAccompaniments = ({ values, setValues, handleArrayChange, error }) => {
  const handleAddExternalAccompaniment = () => {
    setValues({
      ...values,
      externalAccompaniments: [
        ...values.externalAccompaniments,
        { professional: '', name: '', phone: '', email: '' },
      ],
    });
  };

  /* const handleDeleteExternalAccompaniment = (index) => {
    const updatedExternalAccompaniments = values.externalAccompaniments.filter((_, i) => i !== index);
    setValues({
      ...values,
      externalAccompaniments: updatedExternalAccompaniments,
    });
  } 
  TODO: Função de exclusão de acompanhamento externo (Remover o comentário)  
  */

  return (
    <>
      {values.externalAccompaniments.map((accompaniment, index) => (
        <React.Fragment key={'external' + index}>
          <SSelectBox
            lg={3}
            name={`externalAccompaniments[${index}].professional`} label="Acompanhamento externo"
            handleChange={(e) =>
              handleArrayChange(index, 'externalAccompaniments', 'professional', e.target.value)}
            value={accompaniment.professional}
            options={teamAccompanimentOptions}
            error={error?.externalAccompaniments?.[index]?.professional} />

          <STextField
            lg={index === 0 ? 3.5 : 3.3}
            name={`externalAccompaniments[${index}].name`}
            label="Nome"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'name', e.target.value)}
            value={accompaniment.name}
            error={error?.externalAccompaniments?.[index]?.name}
          />
          <STextField
            lg={index === 0 ? 1.9 : 1.7}
            name={`externalAccompaniments[${index}].phone`}
            label="Telefone"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'phone', e.target.value)}
            value={accompaniment.phone}
            error={error?.externalAccompaniments?.[index]?.phone}
            placeholder="(00) 00000-0000"
          />
          <STextField
            lg={index === 0 ? 3 : 2.8} /* TODO: Resolver responsidade do botão de exclusão */
            xs={index === 0 ? 9 : 8.8}
            md={index === 0 ? 5 : 4.8}
            name={`externalAccompaniments[${index}].email`}
            label="E-mail"
            handleChange={(e) => handleArrayChange(index, 'externalAccompaniments', 'email', e.target.value)}
            value={accompaniment.email}
            error={error?.externalAccompaniments?.[index]?.email}
          />
          <AddButton handleClick={handleAddExternalAccompaniment} />
          {/*           {index > 0 && <DeleteButton onClick={() => handleDeleteExternalAccompaniment(index)} />}
 */} {/* TODO: Só exibir botão de exclusão se houver mais de um acompanhamento externo (Remover o comentário) */}

        </React.Fragment>
      ))}
      <SDividerAc />
    </>
  );
}

export default ExternalAccompaniments;
