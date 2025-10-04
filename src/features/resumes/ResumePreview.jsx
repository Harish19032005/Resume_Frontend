import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumePreview.css';

export default function ResumePreview({ resume }) {
  const ref = useRef();

  const exportPDF = async () => {
    const element = ref.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // fit width, preserve aspect ratio
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40; // margins
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`${resume.name || 'resume'}.pdf`);
  };

  return (
    <div>
      <div ref={ref} style={{ width: 595, padding: 20, background: '#fff', color:'#000', border:'1px solid #ddd' }}>
        <h1>{resume.name}</h1>
        <p>{resume.email} • {resume.phone}</p>
        <h3>Summary</h3>
        <p>{resume.summary}</p>

        <h3>Skills</h3>
        <ul>{(resume.skills||[]).map((s,i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <button onClick={exportPDF} style={{ marginTop: 10 }}>Export as PDF</button>
    </div>
  );
}
