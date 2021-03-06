import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import SingleTextInput from '../singleTextInput/SingleTextInput';
import EmptyView from '../emptyView/EmptyView';

import { FaPlus, FaMinus} from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';

import './StudentCard.scss';

const StudentCard = ({student}) => {

    // props deconstructed
    const {id, pic, firstname, lastname, email, company, skill} = student;

    // hooks
    const [grades, setGrades ] = useState([]);
    const [showGrades, setShowGrades] = useState(false);
    const[gradesLoading, setGradesLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    // functions 
    const calculateAverage = (grades) => {

        let sum = 0;

        grades.map(grade => {
            return sum += Number(grade.grade);
        });

        return sum / grades.length;
    }

    const hideGrades = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setShowGrades(false);
    }
    const fetchAndShowGrades = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(grades.length > 0){
            setShowGrades(true);
        }else{

            setGradesLoading(true);

            const url = `http://localhost:9000/students/${id}/grades`;

            fetch(url)
            .then(response =>response.json())
            .then(data =>{
                
                setGrades(data);
                setShowGrades(true);
                setGradesLoading(false);
            })
        }
    }

    // useEffect(()=>{
    //     if(grades.length)
    //         setShowGrades(!showGrades); 
    // },[grades]);

    return (
        <div className="studentCard">
            <Link to={`/students/${id}`} state={{ student: student }}>
            <div className="studentCard__profilePic">
                <img src={pic} />
            </div>
            
            <div className="studentCard__info">
                <div className="studentCard__name">
                    {`${firstname}  ${lastname}`}
                </div>
                <div className="studentCard__infoLine">
                    Email: {email}
                </div>
                <div className="studentCard__infoLine">
                    Company: {company}
                </div>
                <div className="studentCard__infoLine">
                    Skill: {skill}
                </div>
                <div className="studentCard__gradesList" style={{"display": showGrades ? "block" : "none"}}>
                 {grades.length > 0 &&  
                 <>
                    <div className="studentCard__gradeAverage">
                        Average: {grades.length && calculateAverage(grades)}%
                    </div>
                    {grades.map((grade, index) => {
                        return (
                            <div key={index}><span>Test {index+1}:</span><span>{grade.grade}%</span></div>
                        )
                    })}
                </>
                }
                {grades.length === 0 && <EmptyView text="No Grades for this student"/>}
                </div>
            </div>
            <div className="studentCard__toggleIcons">
                {gradesLoading && < AiOutlineReload className="studentCard__toggleIcon-spinning" size="1.8em" />}
                {(!showGrades && !gradesLoading) && <FaPlus className="studentCard__toggleIcon" onClick={(e) => fetchAndShowGrades(e)} size="1.8em"/>}
                {(showGrades && !gradesLoading) && <FaMinus className="studentCard__toggleIcon" onClick={(e) => hideGrades(e)} size="1.8em" />}
            </div>
            </Link>
            <div className="studentCard__tagCollection">
                    {tags.map((tag, index)=>{
                        return(
                            <span className="studentCard__tag" key={tag + index}>{tag}</span>
                        )
                    })}
                    <div className="studentCard__tags">    
                    </div>
                    <div className="studentCard__tagInput">
                        <SingleTextInput onSubmit = {setTags} collection = {tags} searchTerm={tag} setSearchTerm ={setTag} width="26%" placeholder="Add a tag" />
                    </div>
                </div>
        </div>
    )
}

export default StudentCard;