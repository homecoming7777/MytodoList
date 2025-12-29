export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-red-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
          <h2 className="text-xl font-semibold tracking-wide">
            Mine<span className="text-gray-400">Todo</span>
          </h2>
        </div>

        <p className="text-center max-w-xl text-sm text-gray-400 leading-relaxed">
          A simple and efficient todo list application designed to help you
          organize tasks, stay focused, and improve your daily productivity.
        </p>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MineTodo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}