// import   { useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FaSearch, FaFileAlt, FaChartLine, FaDownload } from 'react-icons/fa';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);


// const Reports = () => {
//   const [search, setSearch] = useState("");

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const barData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Completed Tasks",
//         backgroundColor: "#4F46E5",
//         borderRadius: 8,
//         data: [12, 19, 3, 5, 2, 3],
//       },
//     ],
//   };

//   const lineData = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         label: "Productivity Trend",
//         borderColor: "#10B981",
//         backgroundColor: "rgba(16, 185, 129, 0.2)",
//         data: [50, 75, 60, 90],
//       },
//     ],
//   };

//   return (
//     <main className="p-6 flex flex-col gap-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-semibold text-gray-800">Reports</h2>
//         <div className="flex gap-2">
//           <Input
//             type="text"
//             placeholder="Search reports..."
//             value={search}
//             onChange={handleSearch}
//             className="border rounded-lg px-3 py-2"
//           />
//           <Button variant="outline" className="flex items-center gap-2">
//             <FaSearch /> Search
//           </Button>
//           <Button variant="primary" className="flex items-center gap-2">
//             <FaDownload /> Export
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardContent className="flex items-center gap-4 p-6">
//             <FaFileAlt className="text-4xl text-blue-600" />
//             <div>
//               <p className="text-gray-600">Total Reports</p>
//               <h3 className="text-2xl font-bold">128</h3>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center gap-4 p-6">
//             <FaChartLine className="text-4xl text-green-600" />
//             <div>
//               <p className="text-gray-600">Performance Score</p>
//               <h3 className="text-2xl font-bold">92%</h3>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent>
//             <h4 className="text-lg font-semibold text-gray-700">Task Completion Overview</h4>
//             <Bar data={barData} />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent>
//             <h4 className="text-lg font-semibold text-gray-700">Weekly Productivity Trend</h4>
//             <Line data={lineData} />
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default Reports;
