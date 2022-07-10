import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from './components/studentList/StudentList';
import StudentDetailPage from "./pages/StudentDetailPage";
import './App.scss';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>  
                <Route path="/" element={<StudentList />}/>   
                <Route path ="/students/:studentId" element = {<StudentDetailPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
