import { useState, useEffect } from "react";
import { FaRegClock, FaPlus, FaPlay, FaStop, FaEllipsisV, FaChartBar, FaTasks, FaUsers, FaCogs, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStartTime, setTrackingStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      date: "Today, 23 Sept 2023",
      total: "03:56:32",
      items: [
        {
          title: "Create Design System",
          category: "Marketing",
          assignee: "Samran Run",
          timeStart: "13:13",
          timeEnd: "14:39",
          duration: "01:26:17",
        },
        {
          title: "Finishing About Page",
          category: "Digital Agency",
          assignee: "Leslie Alexander",
          timeStart: "13:43",
          timeEnd: "15:51",
          duration: "01:02:53",
        },
      ],
    },
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update elapsed time when tracking
  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - trackingStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, trackingStartTime]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isTracking) {
      setTrackingStartTime(new Date());
      setIsTracking(true);
    } else {
      const endTime = new Date();
      const newTask = {
        title: currentTask || "Untitled Task",
        category: "General",
        assignee: "Current User",
        timeStart: formatTime(trackingStartTime),
        timeEnd: formatTime(endTime),
        duration: formatElapsedTime(elapsedTime),
      };

      const today = formatDate(currentTime);
      const updatedTasks = [...tasks];
      const todaySection = updatedTasks.find(section => section.date === today);

      if (todaySection) {
        todaySection.items.push(newTask);
      } else {
        updatedTasks.unshift({
          date: today,
          total: "00:00:00",
          items: [newTask],
        });
      }

      setTasks(updatedTasks);
      setIsTracking(false);
      setElapsedTime(0);
      setCurrentTask("");
    }
  };

  const handleAddTask = () => {
    const newTask = {
      title: currentTask,
      category: "General",
      assignee: "Current User",
      timeStart: formatTime(currentTime),
      timeEnd: "-",
      duration: "00:00:00",
    };

    const today = formatDate(currentTime);
    const updatedTasks = [...tasks];
    const todaySection = updatedTasks.find(section => section.date === today);

    if (todaySection) {
      todaySection.items.push(newTask);
    } else {
      updatedTasks.unshift({
        date: today,
        total: "00:00:00",
        items: [newTask],
      });
    }

    setTasks(updatedTasks);
    setCurrentTask("");
    setShowAddTask(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r">
        <div className="flex flex-col items-center gap-3 mb-8">
          <FaUserCircle className="text-5xl text-gray-600" />
          <div className="flex items-center gap-2">
            <IoIosCheckmarkCircleOutline className="text-3xl text-blue-500" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><BiSolidDashboard /> Dashboard</Link></li>
            <li><Link to="/" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaRegClock /> Timer</Link></li>
            <li><Link to="/Reports" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaChartBar /> Reports</Link></li>
            <li><Link to="/projects" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaTasks /> Projects</Link></li>
            <li><Link to="/team" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaUsers /> Team</Link></li>
            <li><Link to="/settings" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaCogs /> Settings</Link></li>
            <li><Link to="/help" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaQuestionCircle /> Help Center</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What are you working on?"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-lg font-semibold">
              {formatTime(currentTime)}
            </div>
            <button 
              onClick={() => setShowAddTask(true)}
              className="flex items-center bg-white px-4 py-2 border rounded-md shadow-sm"
            >
              <FaPlus className="mr-2" /> Task
            </button>
            <button 
              onClick={handleStartStop}
              className={`${isTracking ? 'bg-red-600' : 'bg-blue-600'} text-white px-4 py-2 rounded-md flex items-center gap-2`}
            >
              {isTracking ? <><FaStop /> Stop</> : <><FaPlay /> Start</>}
            </button>
          </div>
        </div>

        {/* Timer Display */}
        {isTracking && (
          <div className="mb-6 bg-blue-50 p-4 rounded-md">
            <div className="text-2xl font-bold text-center">
              {formatElapsedTime(elapsedTime)}
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="Task name"
                className="border px-4 py-2 rounded-md w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowAddTask(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddTask}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        {tasks.map((section, i) => (
          <div key={i} className="mb-6 bg-white p-6 rounded-md shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">{section.date}</h2>
              <span className="text-gray-500">Total: {section.total}</span>
            </div>
            {section.items.map((task, j) => (
              <div key={j} className="flex justify-between items-center p-4 border rounded-md mb-3">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-gray-500 text-sm">{task.category} - {task.assignee}</p>
                </div>
                <div className="text-gray-500 text-sm">
                  {task.timeStart} - {task.timeEnd} ({task.duration})
                </div>
                <button className="bg-gray-200 px-4 py-2 rounded-md">Continue</button>
                <FaEllipsisV className="text-gray-500 cursor-pointer" />
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}