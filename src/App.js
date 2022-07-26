import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layout/navBar/NavBar";
import StudentList from './components/studentList/StudentList';
import StudentDetailPage from "./pages/StudentDetailPage";
import './App.scss';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <NavBar/>
        <div className="pageContainer">
            <Routes>  
                <Route path="/" element={<StudentList />}/>   
                <Route path ="/students/:studentId" element = {<StudentDetailPage/>} />
            </Routes>
        </div>   
        </BrowserRouter>
    </div>
  );
}

export default App;
