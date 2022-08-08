import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from "react-router-dom";

import StudentCard from '../components/studentCard/StudentCard';
import StudentForm from '../components/studentForm/StudentForm';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function StudentDetailPage(props) {

    let params = useParams();
    const location = useLocation();
    const [student, setStudent] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);


    useEffect(() => {
        if(location?.state?.fromCreateStudent){
            setShowSnackbar(true);
         }
            
            const singleStudentURL =`https://student-app-be-june.herokuapp.com/students/${studentId}`; 

            fetch(singleStudentURL)
                .then(response => response.json())
                .then(data => {
                    setStudent(data);
                })
        // }

    }, []);
    
    const studentId = params.studentId;

    // with the student Id, we can fetch student info
    // from our API

    // update student 
    // create update componentn
    // with form for all fields
    // on submit, show loader
    // on success show toast 
    // on fail show toast (error)s

    return (
        <div className="studentDetailPage">
              <Snackbar 
                open={showSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={1500}
                onClose={() => setShowSnackbar(false)}>
                <Alert>{location?.state?.studentName} was successfully created.</Alert>
            </Snackbar>
           {Object.keys(student).length > 0 && <StudentCard student={student} showDelete />}
           {Object.keys(student).length > 0 && <StudentForm student={student} setStudent={setStudent}/>}
        </div>
    );
}

export default StudentDetailPage;