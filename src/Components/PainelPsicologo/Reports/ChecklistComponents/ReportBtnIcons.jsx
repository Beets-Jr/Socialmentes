import ChartIcon from "../../../../Assets/Icons/ChartIcon";
import TableIcon from "../../../../Assets/Icons/TableIcon";
import ReportIcon from "../../../../Assets/Icons/ReportIcon";

const reportBtnIconStyle ={
    mr: 1,
    mb: 0.2,
    color: "var(--color-gray-3)",
    fontSize: 14
};


const ReportBtnIcons = {
    "Gráfico": <ChartIcon style={reportBtnIconStyle} />,
    "Tabela": <TableIcon style={reportBtnIconStyle} />,
    "Relatório": <ReportIcon style={reportBtnIconStyle} />
}

export default ReportBtnIcons;