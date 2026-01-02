import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tasks" element={<Tasks />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}