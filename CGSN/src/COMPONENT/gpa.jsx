import   { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "../COMPONENT/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const gradePoints = {
  "A": 4.0,
  "B": 3.0,
  "C": 2.0,
  "D": 1.0,
  "F": 0.0,
};

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ name: "", grade: "", credits: "" }]);
  const [name, setName] = useState("");

  const addCourse = () => {
    setCourses([...courses, { name: "", grade: "", credits: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(({ grade, credits }) => {
      if (gradePoints[grade] !== undefined && credits) {
        totalPoints += gradePoints[grade] * parseFloat(credits);
        totalCredits += parseFloat(credits);
      }
    });
    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`GPA Report for ${name}`, 20, 20);
    
    const tableData = courses.map(({ name, grade, credits }) => [name, grade, credits]);
    autoTable(doc, {
      startY: 30,
      head: [["Course", "Grade", "Credits"]],
      body: tableData,
    });
    
    doc.text(`Total GPA: ${calculateGPA()}`, 20, doc.autoTable.previous.finalY + 10);
    doc.save(`${name}_GPA_Report.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-center text-blue-400">GPA Calculator</h1>
            <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 w-full border rounded"/>
            {courses.map((course, index) => (
              <div key={index} className="flex space-x-2">
                <Input placeholder="Course Name" value={course.name} onChange={(e) => handleChange(index, "name", e.target.value)} className="p-2 flex-1 border rounded"/>
                <Input placeholder="Grade (A-F)" value={course.grade} onChange={(e) => handleChange(index, "grade", e.target.value.toUpperCase())} className="p-2 w-16 border rounded text-center"/>
                <Input placeholder="Credits" value={course.credits} onChange={(e) => handleChange(index, "credits", e.target.value)} className="p-2 w-16 border rounded text-center"/>
              </div>
            ))}
            <Button onClick={addCourse} className="bg-blue-500 w-full py-2 rounded">Add Course</Button>
            <h2 className="text-xl text-center">Your GPA: <span className="font-bold text-green-400">{calculateGPA()}</span></h2>
            <Button onClick={downloadPDF} className="bg-green-500 w-full py-2 rounded">Download GPA Report</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
