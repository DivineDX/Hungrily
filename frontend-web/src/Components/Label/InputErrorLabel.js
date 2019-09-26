import React from 'react';
import { Label } from "semantic-ui-react";

const InputErrorLabel = ({ touched, errorText }) => {
    if (touched && errorText) {
        return (
            <Label className='tl' basic color='red' pointing>
                {errorText}
            </Label>
        );
    } else {
        return null;
    }
}

export default InputErrorLabel;