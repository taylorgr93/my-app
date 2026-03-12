import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Counter from "./pages/Counter";
import Effects from "./pages/Effects";
import Users from "./pages/Users";
import CheckEmail from "./pages/CheckEmail";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/effects" element={<Effects />} />
          <Route path="/users" element={<Users />} />
          <Route path="/check-email" element={<CheckEmail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
