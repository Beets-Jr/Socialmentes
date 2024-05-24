import { useEffect } from "react";
import { VRadioGroup } from "./forms";

function ChooseCategory({ setHandleProceed, setDisabledButton }) {

    useEffect( () => {
        setHandleProceed( () => () => {
            setDisabledButton(true);
            return true;
        } );
    }, []);

    return (
        <VRadioGroup
            name='category'
            label='Escolha uma categoria'
            categories={[
                { value: 'patient', label: 'Paciente' },
                { value: 'professional', label: 'Profissional' }
            ]}
            onChange={ () => {
                setDisabledButton(false);
            } }
            row
        />
    );

}

export default ChooseCategory;