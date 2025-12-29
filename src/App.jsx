import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tasks" element={<Tasks />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}