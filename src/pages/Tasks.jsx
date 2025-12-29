import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [todos, setTodos] = useState(
      () => {
         const saved = localStorage.getItem("todos");
         return saved ? JSON.parse(saved) : [];
      }
   )
   const [input, setInput] = useState("");
   const [editingId, setEditingId] = useState("");
   const [editText, setEditText] = useState("")

   useEffect(
      ()=>{
         localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]
   );

   function addTodo(){
      if(!input.trim()) return;
      setTodos([...todos, {id: Date.now(), text:input }]);
      setInput("");
   }

   function deleteTodo(id){
      setTodos(todos.filter(todo => todo.id !== id));
   }

   function startEdit(todo){
      setEditingId(todo.id);
      setEditText(todo.text)
   };

   function saveEdit(id){
      setTodos(
         todos.map(todo =>
            todo.id === id ? {...todo, text: editText } : todo
         )
      )
      setEditingId(null);
   }


   return (
      <>
         <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-white text-sm">
            <div className="text-2xl font-extrabold">MineTodo</div>
            <div className="hidden md:flex items-center gap-8 transition duration-500">
               <Link to="/" className="hover:text-red-500 transition">Home</Link>
               <Link to="/Tasks" className="hover:text-red-500 transition text-red-500">Tasks</Link>
               <Link to="/Dashboard" className="hover:text-red-500 transition">Dashboard</Link>
            </div>

            <button className="hidden md:block px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-full">
               Start free trial
            </button>

            <button
               className="md:hidden active:scale-90 transition"
               onClick={() => setMobileMenuOpen(true)}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu-icon lucide-menu"
               >
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
               </svg>
            </button>
         </nav>

         <div
            className={`fixed inset-0 z-[100] bg-black/40 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
               }`}
         >
            <Link to="/">Home</Link>
            <Link to="/Tasks">tasks</Link>
            <Link to="/Dashboard">Dashboard</Link>

            <button
               className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-red-600 hover:bg-red-700 transition text-white rounded-md flex"
               onClick={() => setMobileMenuOpen(false)}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x-icon lucide-x"
               >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
               </svg>
            </button>
         </div>

                  <div className="min-h-screen mt-30 bg-black p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Todo List
      </h1>

      <div className="flex gap-2">
         <form className="flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-gray-500/30 bg-white">
            <input value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..." className="h-full bg-transparent w-full pl-6 text-sm placeholder-gray-500 outline-none" required />
            <button onClick={addTodo} className="mr-1 h-10 w-56 rounded-full bg-indigo-500 text-sm text-white transition active:scale-95">ADD</button>
        </form>

      </div>

      <ul className="mt-6 space-y-3 grid grid-cols-4 gap-5">
        {todos.map(todo => (
          <li key={todo.id} className="bg-gray-900 text-white p-3 rounded items-center">
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-gray-800 border border-gray-700 p-1 rounded"
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="space-x-3">
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>

      </>
   )
}