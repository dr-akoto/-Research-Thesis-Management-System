// import  { useState, useEffect } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';

// const Settings = () => {
//   const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   return (
//     <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4">Settings</h2>
//       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-md">
//         <div className="mb-4 flex items-center justify-between">
//           <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
//           <button 
//             className="flex items-center gap-2 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800 dark:text-white" />} 
//             {darkMode ? 'Light Mode' : 'Dark Mode'}
//           </button>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium">Username</label>
//           <input type="text" className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white" placeholder="Enter your username" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
//           <input type="email" className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white" placeholder="Enter your email" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
//           <input type="password" className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white" placeholder="Enter new password" />
//         </div>
//         <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Changes</button>
//       </div>
//     </main>
//   );
// };

// export default Settings;