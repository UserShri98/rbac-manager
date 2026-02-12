import api from "../api/axios";
import {useEffect,useState} from "react";

export default function Tasks() {
  const [tasks,setTasks]=useState([]);
  const [status,setStatus]=useState("");
  const [search, setSearch] = useState("");


  const [form,setForm]=useState({
    title:"",
    description:"",
    status:"pending",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title:"",
    description:"",
    status:"pending",
  });

 const fetchTasks=async()=>{
  const queryParams=new URLSearchParams();

     if (status) queryParams.append("status",status);
  if (search) queryParams.append("search",search);

  const res=await api.get(`/tasks?${queryParams.toString()}`);
  setTasks(res.data);
};
useEffect(() => {
  fetchTasks();
}, [status, search]);


  const createTask=async(e)=>{
    e.preventDefault();
    await api.post("/tasks",form);
    setForm({title: "",description: "",status:"pending" });
    fetchTasks();
  };

  const startEdit=(task)=>{
    setEditingId(task._id);
    setEditForm({
      title:task.title,
      description:task.description,
      status:task.status,
    });
  };

  const saveEdit=async(id)=>{
    await api.put(`/tasks/${id}`,editForm);
    setEditingId(null);
    fetchTasks();
  };

  const deleteTask=async(id)=>{
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const getStatusColor=(status)=>{
    switch(status){
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon=(status)=>{
    switch(status){
      case "pending":
        return "⏳";
      case "in-progress":
        return "🚀";
      case "completed":
        return "✓";
      default:
        return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Task Manager
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Organize your work and achieve your goals
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">➕</span> Create New Task
          </h2>
          <form onSubmit={createTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
                placeholder="Enter task title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none resize-none"
                placeholder="Add task description..."
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none bg-white cursor-pointer"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🚀 In Progress</option>
                <option value="completed">✓ Completed</option>
              </select>
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
              Create Task
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-xl">🔍</span> Filter Tasks
              </h3>
              <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
/>

              <select
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none bg-white cursor-pointer font-medium text-gray-700"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">All Tasks</option>
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🚀 In Progress</option>
                <option value="completed">✓ Completed</option>
              </select>
            </div>
          </div>

        {!tasks.length ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 text-lg">No tasks available</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first task to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
              >
                {editingId === task._id ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none resize-none"
                          rows="3"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none bg-white cursor-pointer"
                          value={editForm.status}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="in-progress">🚀 In Progress</option>
                          <option value="completed">✓ Completed</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => saveEdit(task._id)}
                          className="flex-1 bg-emerald-600 text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                          ✓ Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 break-words">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 mb-3 break-words leading-relaxed">
                          {task.description}
                        </p>
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(
                            task.status
                          )}`}
                        >
                          <span className="text-base">
                            {getStatusIcon(task.status)}
                          </span>
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex sm:flex-col gap-2 sm:gap-3">
                        <button
                          onClick={() => startEdit(task)}
                          className="flex-1 sm:flex-none bg-blue-600 text-white font-medium py-2 px-5 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="flex-1 sm:flex-none bg-red-600 text-white font-medium py-2 px-5 rounded-xl hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}