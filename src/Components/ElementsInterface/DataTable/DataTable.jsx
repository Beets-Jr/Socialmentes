import DataTableDesktop from "./DataTableDesktop";
import DataTableMobile from "./DataTableMobile";

/**
 * @description Define a estrutura de uma lista em forma de tabela, com botões de ação e botão de adicionar novo.
 * @param {array<number>} md - contém a largura de todas as colunas da tabela, totalizando uma largura de 12. O mesmo se aplica aos argumentos: `sm`, `md`, `lg` e `xl`.
 * @param {array<string>} head - contém o label que deve ser exibido nas respectivas colunas.
 * @param {array<Object>} columns - contém as funções executadas para recuperar o valor que deve ser exibido nas respectivas colunas (elas recebem como argumento o dado representado pela linha atualmente executada), e opções que podem ser passados ao estilo do texto. Cada column é uma tupla `{ func: function, style: Object }`.
 * @param {array<Object>} body - são os dados que serão listados, os elementos da lista devem ser objetos contendo obrigatoriamente um id.
 * @param {function} onAdd - função executada ao clicar no botão de mais, caso null o botão não é exibido.
 * @param {array<Object>} actions - informa as ações que aparecerão na última coluna da tabela, cada ação é uma tupla `{ icon: SvgIcon, func: function }`.
 * @param {string} emptyText - texto que aparece caso body seja uma lista vazia
 */
function DataTable({ xl, lg, md, sm, xs, head, columns, body, onAdd, actions, emptyText, isMobile }) {

    if (isMobile) {
        return <DataTableMobile
            head={head}
            columns={columns}
            body={body}
            actions={actions}
            emptyText={emptyText}
        />
    } else {
        return <DataTableDesktop
            xl={xl}
            lg={lg}
            md={md}
            sm={sm}
            xs={xs}
            head={head}
            columns={columns}
            body={body}
            onAdd={onAdd}
            actions={actions}
            emptyText={emptyText}
        />
    }

}

export default DataTable;