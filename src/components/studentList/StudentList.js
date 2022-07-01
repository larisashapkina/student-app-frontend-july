import React, {useState, useEffect} from 'react';
import SearchBar from '../searchBar/SearchBar';
import StudentCard from '../studentCard/studentCard';
import './StudentList.scss';


const StudentList = ()=> {

   //hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

   //functions
   useEffect(() => {

        const url = 'http://localhost:9000/students';
        //reach out to the backend
        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            setStudents(data.students);
        })
        
        //get out students
        //update our students hook with the new data

   },[]);//empty array means run on mount


   //when search term is updated, this component will rerender
   //what to do on a re-render?
   let filteredStudents = students;

   if(searchTerm){
        filteredStudents = students.filter(student=>{
            const fullName = `${student.firstName} ${student.lastName}`;

            const fullNameToLowercase = fullName.toLowerCase();

            const searchTermToLowerCase = searchTerm.toLowerCase();

            return fullNameToLowercase.includes(searchTermToLowerCase);
        })
   }


   //return or JSX

   return(
       <div className="studentList">
           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
           {filteredStudents.map(student=>{
               return (
                   <div>

                       <StudentCard student={student}/>
                    </div>
               )
           })}
           {filteredStudents.length ===0 && <div className="studentList__noResults">No Results</div>}
       </div>
   )
}

export default StudentList;