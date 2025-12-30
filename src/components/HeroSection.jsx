import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
      AOS.init(
         {
            duration: 1500,
            once: false,
         }
      )
   }, []);


  return (
    <div className="relative">
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-white text-sm">
         <div className="text-2xl font-extrabold">MineTodo</div>
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/" className="hover:text-red-500 transition text-red-500">Home</Link>
          <Link to="/Tasks" className="hover:text-red-500 transition">Tasks</Link>
          <Link to="/Dashboard" className="hover:text-red-500 transition">Dashboard</Link>
        </div>

        <button className="hidden md:block px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-full">
         <a href="https://abdessamadbenzekri.netlify.app/">
         Contact Me
          </a>
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
        className={`fixed inset-0 z-[100] bg-black/40 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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

      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32 bg-black text-white">
        <div className="absolute top-28 -z-1 left-1/4 size-72 bg-red-600 blur-[300px]"></div>

        <h1 data-aos="zoom-in" className="text-5xl leading-[68px] md:text-6xl md:leading-[84px] font-medium mt-30 max-w-2xl text-center">
          My Todo-List App{" "}
          <span className="bg-gradient-to-r from-red-800 to-red-400 px-3 rounded-xl text-nowrap">
            MineTodo
          </span>
        </h1>

        <p data-aos="fade-up" className="text-base text-center text-slate-200 max-w-lg mt-6">
          simple todo-list app for managing tasks and manage and control time for ordered life 
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-7 h-11">
          <Link to="/Tasks">
            Get started
          </Link>
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
          {["Manage", "make a plan", "easy to use"].map(
            (feature, index) => (
              <p key={index} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-icon lucide-check size-5 text-red-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-slate-400">{feature}</span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
