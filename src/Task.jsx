import { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import './App.css';

const Task = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("B.tech");

  const handleGeneratePDF = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Add a new page to the document
      const page = pdfDoc.addPage([550, 750]);
  
      // Draw ref field on the page
      page.drawText(`Ref- ${course === "B.tech"? "A101" : "B101"}`, {
        x: 50,
        y: 750,
        size: 20,
        color: rgb(0, 0, 0),
      });
  
      // Draw name and date on the page
      page.drawText(`Name: ${name}`, {
        x: 50,
        y: 700,
        size: 20,
        color: rgb(0, 0, 0),
      });
  
      page.drawText(`Course: ${course}`, {
        x: 50,
        y: 650,
        size: 20,
        color: rgb(0, 0, 0),
      });
  
      const currentDate = new Date().toLocaleDateString();
      page.drawText(`Date of Offer (current date): ${currentDate}`, {
        x: 50,
        y: 600,
        size: 20,
        color: rgb(0, 0, 0),
      });
  
      // Draw fee structure table
      page.drawText("Fee Structure: ", {
        x: 50,
        y: 550,
        size: 20,
        color: rgb(0, 0, 0),
      });
  
      const table = [
        { year: "Year", oneTimeFee: "One-time Fee", tuitionFee: "Tuition Fee" },
        { year: "1", oneTimeFee: "600", tuitionFee: "260" },
        { year: "2", oneTimeFee: "-", tuitionFee: "260" },
      ];
  
      const tableWidth = 500;
      const tableHeight = 100;
      const cellPadding = 5;
      const cellWidth = tableWidth / 3;
      const cellHeight = tableHeight / table.length;
  
      let yOffset = 550 - cellHeight;
  
      // Draw table rows
      table.forEach((row, index) => {
        let xOffset = 50;
  
        page.drawText(row.year, {
          x: xOffset,
          y: yOffset,
          size: 14,
          color: rgb(0, 0, 0),
        });
  
        xOffset += cellWidth;
  
        page.drawText(row.oneTimeFee, {
          x: xOffset,
          y: yOffset,
          size: 14,
          color: rgb(0, 0, 0),
        });
  
        xOffset += cellWidth;
  
        page.drawText(row.tuitionFee, {
          x: xOffset,
          y: yOffset,
          size: 14,
          color: rgb(0, 0, 0),
        });
  
        yOffset -= cellHeight;
      });
  
      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
  
      // Download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `offer_letter_${course.toLowerCase()}.pdf`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Course:</label>
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        <option value="B.tech">B.tech</option>
        <option value="M.tech">M.tech</option>
      </select>
      <br />
      <button onClick={() => {
        setName("");
        setCourse("B.tech");
      }}>Submit</button>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      
    </div>
  );
};

export default Task;