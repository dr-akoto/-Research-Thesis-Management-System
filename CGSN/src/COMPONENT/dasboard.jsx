import { useState, useEffect } from "react";
import { 
  FaClock, 
  FaEllipsisH, 
  FaRegClock, 
  FaUserCircle, 
  FaPlus,
  FaPlay,
  FaStop,
  FaChartBar,
  FaTasks,
  FaUsers,
  FaCogs,
  FaQuestionCircle
} from "react-icons/fa";
import { format } from 'date-fns';

const TASK_STATUS = {
  STARTED: { 
    label: 'Started', 
    color: 'bg-yellow-100 border-yellow-300'
  },
  IN_PROGRESS: { 
    label: 'In Progress', 
    color: 'bg-blue-100 border-blue-300'
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'bg-green-100 border-green-300'
  }
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState('List');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStartTime, setTrackingStartTime] = useState(null);
  const [currentTask, setCurrentTask] = useState("");
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [showAddTask, setShowAddTask] = useState(false);
  const [totalTimeToday, setTotalTimeToday] = useState(0);
  const [newTask, setNewTask] = useState({
    title: "",
    project: "",
    assignee: "",
    status: "STARTED"
  });

  const [tasks, setTasks] = useState({
    "Today": {
      date: format(new Date(), 'dd MMM yyyy'),
      total: "00:00:00",
      items: []
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = now - trackingStartTime;
        const formattedTime = new Date(diff).toISOString().substr(11, 8);
        setElapsedTime(formattedTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, trackingStartTime]);

  const formatTimeFromSeconds = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000/01/01 ${startTime}`);
    const end = new Date(`2000/01/01 ${endTime}`);
    const diff = (end - start) / 1000;
    return formatTimeFromSeconds(diff);
  };

  const handleStartTimer = () => {
    if (!isTracking && currentTask) {
      const now = new Date();
      setTrackingStartTime(now);
      setIsTracking(true);

      const newTaskItem = {
        id: Date.now(),
        title: currentTask,
        project: "Default Project",
        assignee: "Current User",
        timeStart: format(now, 'HH:mm'),
        timeEnd: "",
        duration: "00:00:00",
        status: "STARTED",
        selected: false
      };

      setTasks(prev => ({
        ...prev,
        "Today": {
          ...prev["Today"],
          items: [newTaskItem, ...prev["Today"].items]
        }
      }));
    }
  };

  const handleStopTimer = () => {
    if (isTracking) {
      const now = new Date();
      const endTime = format(now, 'HH:mm');
      const duration = calculateDuration(format(trackingStartTime, 'HH:mm'), endTime);

      setTasks(prev => {
        const updatedItems = prev["Today"].items.map(item => {
          if (item.title === currentTask && !item.timeEnd) {
            const durationInSeconds = (now - trackingStartTime) / 1000;
            setTotalTimeToday(prev => prev + durationInSeconds);
            return {
              ...item,
              timeEnd: endTime,
              duration,
              status: "IN_PROGRESS"
            };
          }
          return item;
        });

        return {
          ...prev,
          "Today": {
            ...prev["Today"],
            items: updatedItems,
            total: formatTimeFromSeconds(totalTimeToday + (now - trackingStartTime) / 1000)
          }
        };
      });

      setIsTracking(false);
      setTrackingStartTime(null);
      setElapsedTime("00:00:00");
      setCurrentTask("");
    }
  };

  const handleAddTask = () => {
    const now = new Date();
    const newTaskItem = {
      id: Date.now(),
      ...newTask,
      timeStart: format(now, 'HH:mm'),
      timeEnd: "",
      duration: "00:00:00",
      selected: false
    };

    setTasks(prev => ({
      ...prev,
      "Today": {
        ...prev["Today"],
        items: [newTaskItem, ...prev["Today"].items]
      }
    }));

    setShowAddTask(false);
    setNewTask({
      title: "",
      project: "",
      assignee: "",
      status: "STARTED"
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => ({
      ...prev,
      "Today": {
        ...prev["Today"],
        items: prev["Today"].items.map(item =>
          item.id === taskId ? { ...item, status: newStatus } : item
        )
      }
    }));
  };

  const handleItemSelect = (dayKey, itemId) => {
    const updatedTasks = { ...tasks };
    const item = updatedTasks[dayKey].items.find(i => i.id === itemId);
    if (item) {
      item.selected = !item.selected;
      setTasks(updatedTasks);
      setSelectedItems(prev =>
        item.selected ? [...prev, itemId] : prev.filter(id => id !== itemId)
      );
    }
  };

  const handleContinueTask = (task) => {
    setCurrentTask(task.title);
    handleStartTimer();
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-gray-400" />
            <div>
              <h3 className="font-medium">Time Tracker</h3>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="text-xs font-medium text-gray-500 mb-2">TIMER</div>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-blue-600 bg-blue-50">
            <FaRegClock /> Timer
          </button>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaChartBar /> Reports
          </button>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaTasks /> Projects
          </button>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaUsers /> Team
          </button>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaCogs /> Settings
          </button>
          <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaQuestionCircle /> Help
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Timer Controls */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What are you working on?"
              className="flex-1 mr-4 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddTask(true)}
                className="px-3 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <FaPlus className="inline mr-1" /> Task
              </button>
              <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-md">
                <FaClock className="text-gray-400" />
                <span className="text-gray-700">{elapsedTime}</span>
              </div>
              <button
                onClick={isTracking ? handleStopTimer : handleStartTimer}
                className={`px-4 py-2 ${isTracking ? 'bg-red-600' : 'bg-blue-600'} text-white rounded-md hover:opacity-90`}
                disabled={!currentTask && !isTracking}
              >
                {isTracking ? <><FaStop className="inline mr-1" /> Stop</> : <><FaPlay className="inline mr-1" /> Start</>}
              </button>
            </div>
          </div>

          {/* Add Task Modal */}
          {showAddTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Task name"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={newTask.project}
                    onChange={(e) => setNewTask(prev => ({ ...prev, project: e.target.value }))}
                    placeholder="Project"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                    placeholder="Assignee"
                    className="w-full px-4 py-2 border rounded-md"
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('List')}
                className={`px-3 py-1 rounded ${selectedView === 'List' ? 'bg-gray-100' : ''}`}
              >
                List
              </button>
              <button
                onClick={() => setSelectedView('Week')}
                className={`px-3 py-1 rounded ${selectedView === 'Week' ? 'bg-gray-100' : ''}`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedView('Day')}
                className={`px-3 py-1 rounded ${selectedView === 'Day' ? 'bg-gray-100' : ''}`}
              >
                Day
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Today's Total:</span>
              <span className="font-medium">{tasks["Today"].total}</span>
            </div>
          </div>

          {/* Task List */}
          {Object.entries(tasks).map(([day, { date, total, items }]) => (
            <div key={day} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-medium">{day}, {date}</h2>
                  {selectedItems.length > 0 && (
                    <div className="flex gap-2">
                      <button className="text-blue-600 text-sm">Bulk Edit</button>
                      <button className="text-red-600 text-sm">Delete</button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Total:</span>
                  <span className="font-medium">{total}</span>
                </div>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg flex items-center justify-between ${TASK_STATUS[item.status].color}`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleItemSelect(day, item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.project} • {item.assignee}
                        </p>
                      </div>
                      <span className="text-sm px-2 py-1 rounded-full bg-white">
                        {TASK_STATUS[item.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {item.timeStart} - {item.timeEnd || 'Running'} ({item.duration})
                      </span>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        {Object.keys(TASK_STATUS).map(status => (
                          <option key={status} value={status}>
                            {TASK_STATUS[status].label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleContinueTask(item)}
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        disabled={isTracking}
                      >
                        Continue
                      </button>
                      <FaEllipsisH className="text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;