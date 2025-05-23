import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = {
  all: (todo) => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  
  
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        text: input,
        completed: false,
        date: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };
  
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const clearAll = () => setTodos([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-wide">✨ To-Do App</h1>
          <button
            onClick={clearAll}
            className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg font-semibold"
          >
            Clear All
          </button>
        </div>

        <form
          className="flex mb-6"
          onSubmit={e => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 p-3 rounded-l-lg bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-lg font-bold"
          >
            Add
          </button>
        </form>

        <div className="flex justify-center mb-4 space-x-2">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === f
                  ? "bg-white text-purple-700 font-bold shadow"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          <AnimatePresence>
            {todos.filter(FILTERS[filter]).map((todo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <TodoItem
                  todo={todo}
                  index={index}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default App;
