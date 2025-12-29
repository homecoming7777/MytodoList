import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AboutTodo() {

    useEffect(() => {
        AOS.init(
           {
              duration: 1500,
              once: false,
           }
        )
     }, []);


  return (
    <section className="relative pt-30 py-16 px-4 bg-black text-white">
      <h1 data-aos="fade-down" className="text-3xl font-semibold text-center mx-auto text-white">
        About Our Todo App
      </h1>

      <p data-aos="fade-down" className="text-sm text-gray-400 text-center mt-2 max-w-md mx-auto">
        A simple, powerful task manager designed to help you stay organized,
        focused, and productive every day.
      </p>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 py-10">
        <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-purple-700/20"></div>

        <img
          className="max-w-sm w-full rounded-xl h-auto border border-gray-800"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          alt="Todo app preview"
        />

        <div>
          <h2 data-aos="fade-left" className="text-3xl font-semibold text-white">
            Why Use Our Todo List?
          </h2>

          <p data-aos="fade-left" className="text-sm text-gray-400 mt-2">
            Manage your daily tasks with ease — create, edit, and track your
            progress using a clean and intuitive interface.
          </p>

          <div data-aos="fade-left" className="flex flex-col gap-10 mt-6">
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-gray-900 border border-gray-800 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-200">
                  Fast & Lightweight
                </h3>
                <p className="text-sm text-gray-400">
                  Instantly add and manage tasks with zero lag.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-gray-900 border border-gray-800 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-200">
                  Clean & Modern Design
                </h3>
                <p className="text-sm text-gray-400">
                  A distraction-free UI that keeps your focus on what matters.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-gray-900 border border-gray-800 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-200">
                  Easy to Use
                </h3>
                <p className="text-sm text-gray-400">
                  Simple task creation, completion tracking, and organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
