import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = (products, companyInfo) => {
  const input = document.getElementById('invoice-preview'); // Obtener el elemento HTML

  html2canvas(input, { scale: 2 }) // Ajustar la escala para mejorar la calidad
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convertir el canvas a imagen
      const pdf = new jsPDF('p', 'mm', 'a4'); // Crear un nuevo PDF

      // Calcular dimensiones
      const imgWidth = 210; // Ancho A4
      const pageHeight = 295; // Altura A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcular altura
      let heightLeft = imgHeight;

      let position = 0;

      // Agregar imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Si la imagen es más alta que una página, añade páginas adicionales
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Guardar el PDF
      pdf.save('factura.pdf');
    });
};

