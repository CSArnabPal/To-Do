function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li className="flex flex-col p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-md hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start">
        <span
          onClick={() => toggleComplete(index)}
          className={`cursor-pointer font-semibold text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-white"
          }`}
        >
          {index + 1}. {todo.text}
        </span>
        <button
          onClick={() => deleteTodo(index)}
          className="text-red-400 hover:text-red-600 font-bold text-lg ml-3"
        >
          ✕
        </button>
      </div>

      <div className="text-sm text-white/90 mt-2 flex justify-between font-mono">
        <span>📅 {todo.date}</span>
        <span>#Task {index + 1}</span>
      </div>
    </li>
  );
}

export default TodoItem;
