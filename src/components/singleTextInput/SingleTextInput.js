import {React, useEffect} from 'react';
import './SingleTextInput.scss';

function SingleTextInput({searchTerm, setSearchTerm, collection=[], placeholder ="search by name", width= "93%", onSubmit}) {

    const styles ={
        "width": width
    }

    useEffect(()=>{
        const keyDownHandler = event => {
            if(event.key === 'Enter'){
                event.preventDefault();
                handleSubmit();
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        return()=>{
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, []);

    const handleSubmit = ()=>{
        onSubmit([...collection, searchTerm])
    }

    return (
            <input className="searchBar"
            styles={styles}
            placeholder={placeholder}
            value= {searchTerm}
            onChange ={(e) => setSearchTerm(e.target.value)}
            />
    );
}

export default SingleTextInput;