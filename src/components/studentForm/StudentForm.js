import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import {AiOutlineReload } from 'react-icons/ai';

import './StudentForm.scss';

function StudentForm({student ={}, setStudent, title="Update", method="PUT"}) {
    let navigate = useNavigate();

    const [firstname, setFirstname] = useState(student.firstname);
    const [lastname, setLastname] = useState(student.lastname);
    const [company, setCompany] = useState(student.company);
    const [email, setEmail] = useState(student.email);
    const [city, setCity] = useState(student.city);
    const [skill, setSkill] = useState(student.skill);
    const [pic, setPic] = useState(student.pic);
    const [anyChanges, setAnyChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [successfullUpdate, setSuccessfullUpdate] = useState(false);

    const handleChange = (e)=>{

        setAnyChanges(true);

        const field=  e.target.name;

        switch(field){
            case 'firstname':
                setFirstname(e.target.value);
                break;
            case 'lastname':
                setLastname(e.target.value);
                break;
            case'email':
                setEmail(e.target.value);
                break;
            case 'company':
                setCompany(e.target.value);
                break;
            case 'city':
                setCity(e.target.value);
                break;    
            case 'skill':
                setSkill(e.target.value);
                break;
            case 'pic':
                setPic(e.target.value);
                break;
        }
    }

    const handleSubmit=()=>{
       setLoading(true);
       let url =`https://student-app-be-june.herokuapp.com/students`;
        if(method==='PUT'){
            url +=`/${student.id}`
        }
        
        const requestOptions = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstname, lastname, email, company, city, skill, pic })
        };
            fetch(url, requestOptions)
            .then(response=>response.json())
            .then(data=>{
                if(method === 'POST'){
                    navigate(`/students/${data.id}`, { 
                        state: {
                            fromCreateStudent: true,
                            studentName: `${data.firstname} ${data.lastname}`
                        }
                    });
                }else{
                    setStudent(data);
                    setAnyChanges(false);
                    setSuccessfullUpdate(true);
                    setShowSnackbar(true);
                    setLoading(false);
                }
            }).catch(err=>{     
                setLoading(false);
                setSuccessfullUpdate(false);
                setShowSnackbar(true);
            });
    }

    const action = method === 'PUT'? 'updating student' : 'adding student';
  
    const errorElement = <Alert severity="error">An error occurred while {action} — please try again later.</Alert>;
    const successElement = <Alert>Student was updated successfully!</Alert>

    return (
        <div className="studentForm">
            <Snackbar 
                open={showSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={1500}
                onClose={() => setShowSnackbar(false)}>
                    {successfullUpdate? successElement : errorElement}
            </Snackbar>
            <div className="studentForm__title">{title} Student</div>
            <div className="studentForm__inputs">
                <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    value={firstname} 
                    name='firstname'
                    onChange={(e)=>handleChange(e)}
                    />
                <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    value={lastname}
                    name='lastname'
                    onChange={(e)=>handleChange(e)}
                    />
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    name='email'
                    onChange={(e)=>handleChange(e)}
                    />    
                <TextField 
                    id="outlined-basic" 
                    label="Company" 
                    variant="outlined" 
                    value={company}
                    name='company'
                    onChange={(e)=>handleChange(e)}
                    />
                <TextField 
                    id="outlined-basic" 
                    label="City" 
                    variant="outlined"
                    value={city}
                    name='city'
                    onChange={(e)=>handleChange(e)}
                    />
                <TextField 
                    id="outlined-basic" 
                    label="Skill" 
                    variant="outlined"
                    value={skill} 
                    name='skill'
                    onChange={(e)=>handleChange(e)}
                    />
                <TextField 
                    id="outlined-basic" 
                    label="Pic Url" 
                    variant="outlined" 
                    value={pic}
                    name='pic'
                    onChange={(e)=>handleChange(e)}
                    />
            </div>
            <div className="studentForm__submit">
                <Button 
                    variant="contained" 
                    size="large" 
                    disabled={!anyChanges}
                    onClick={handleSubmit}
                    endIcon={loading && <AiOutlineReload className="studentForm__submitLoader-spinning"/>}
                >
                    {title}
                </Button>
            </div>
        </div>
    );
}

export default StudentForm;