import React, { useState } from 'react';
import ShowError from './ErrorInput';
import { validateInput } from "./Validator";

const FormInput = (props) => {
    const [label] = useState(props.label)
    const [inputName] = useState(props.name)
    const [inputType] = useState(props.type)
    const [placeHolder] = useState(props.placeholder)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setInputValue(event.target.value);
        if(props.onChange) props.onChange(inputValue);
        setError(validateInput(validators, value));
      }

    return (
        <>
            <div className="md:col-span-5">
                { props.showlabel ? 
                    <label for="" className="capitalize">{label}</label>
                : null }
                <input
                    type={inputType}
                    value={inputValue}
                    name={inputName}
                    onChange={handleChange}
                    placeholder={placeHolder}
                    className="h-10 border mt-1 rounded px-4 w-full"
                />
                {error && <ShowError error={error.message} />}
            </div>
        </>
    )
}

export default FormInput
