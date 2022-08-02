import React from 'react';
import { Link } from "react-router-dom";
import './ NavigationButton.scss';
import Button from '@mui/material/Button';

function NavigationButton({buttonText, url}) {
    return (
              <div className="navigationButton">
                <Link to={url}>
                <Button
                    variant="contained" 
                    size="large" 
                >
                    {buttonText}
                </Button>
                </Link>
               
            </div>
    );
}

export default NavigationButton;