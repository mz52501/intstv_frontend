import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Temp from "./pages/Temp";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Temp />} />
              <Route path="/sensor/:id" element={<Home />}/>
              <Route path="*" element={<NoPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
