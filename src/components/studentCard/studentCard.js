import React from 'react';
import './studentCard.scss';

const studentCard = ({student})=> {

    const {pic, firstName, lastName, email, company, skill, grades} = student;

    //functions

    const calculateAverage =(grades) => {
        
        let sum = 0;
        grades.map(grade=>{
            sum += Number(grade);
        })

        // return grades.reduce((sum, val) => sum + Number(val), 0)/grades.length;
        return sum/grades.length;
    }


    return (
        <div className="studentCard">
            <div className="studentCard__profilePic">
                <img src={pic} />
            </div>
            <div className="studentCard_info">
                <div className="studentCard__name">
                    {`${firstName} ${lastName}`}
                </div>
                <div className="studentCard__infoLine">
                    Email{email}
                </div>
                <div className="studentCard__infoLine">
                    Company:{company}
                </div>
                <div className="studentCard__infoLine">
                    Skill:{skill}
                </div>
                <div className="studentCard__infoLine">
                    Average:{calculateAverage(grades)}%
                </div> 
            </div>
            
        </div>
    );
}

export default studentCard;