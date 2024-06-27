import ChecklistItem from "../../../Components/PainelPsicologo/Relatorios/ChecklistComponent/ChecklistItem";
import ReportBtn from "../../../Components/PainelPsicologo/Relatorios/ChecklistComponent/ReportBtn";

function Checklist() {
    return(
        <div>
            <ReportBtn name="Gráfico" path="/"></ReportBtn> {/*Colocar o path certo*/}
            <ReportBtn name="Tabela" path="" />
            <ReportBtn name="Relatório" path="" />
            
            <ChecklistItem
                index={1}
                hability="Habilidade A"
                description="Descrição da Habilidade A."
                level="Adquirido"
            />
            <ChecklistItem
                index={2}
                hability="Localiza os sons direcionando cabeça e olhos para a fonte sonora"
                description="Identifica origem sonora, virando cabeça e olhos para o local."
                level="Parcialmente"
            />
        </div>
    );
}

export default Checklist;