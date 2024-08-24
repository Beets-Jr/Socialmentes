import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const pdfGenerate = (setLoading, setOpen) => {
  setLoading(true);
  const input = document.getElementById('pdf-content');

  html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth() - 5; // 210 - 5
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight); // 5, 5, 200, 287
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('relatorio.pdf');
  }).catch((err) => {
    console.error('Erro ao gerar o PDF:', err);
  }).finally(() => {
    setLoading(false);
    setOpen(false);
  });
}

export default pdfGenerate;