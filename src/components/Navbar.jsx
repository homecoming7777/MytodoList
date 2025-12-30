import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center backdrop-blur justify-between z-30 transition-all">
      
      <div className="text-2xl font-extrabold text-white">MineTodo</div>

      <ul className="text-white text-sm md:flex hidden items-center gap-10">
        <Link to="/"><a className="hover:text-red-500 transition" >Home</a></Link>
        <Link to="/Tasks"><a className="hover:text-red-500 text-red-500 transition" >Tasks</a></Link>
        <Link to="/Dashboard"><a className="hover:text-red-500 transition" >Dashboard</a></Link>
      </ul>

      <button
        aria-label="menu-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block md:hidden active:scale-90 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
          <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-black p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <Link to="/"><a  className="text-sm">Home</a></Link>
            <Link to="/Tasks"><a className="text-sm">Tasks</a></Link>
            <Link to="/Dashboard"><a  className="text-sm">Dashboard</a></Link>
          </ul>

          <button
            type="button"
            className="bg-white text-gray-700 mt-6 text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  );
}
