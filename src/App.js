import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layout/navBar/NavBar";

import StudentDetailPage from "./pages/StudentDetailPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import AddStudentPage from "./pages/AddStudentPage";


import './App.scss';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <NavBar/>
        <div className="pageContainer">
            <Routes>  
                <Route path="/" element={<Home/>}/>   
                <Route path ="/students/:studentId" element = {<StudentDetailPage/>} />
                <Route path ="/students/new" element = {<AddStudentPage/>} />
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </div>   
        </BrowserRouter>
    </div>
  );
}

export default App;
