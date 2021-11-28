import React, { useState } from 'react';
import ShowError from './ErrorInput';

const FormTextarea = (props) => {
    const [label] = useState(props.label)
    const [inputName] = useState(props.name)
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
                <textarea
                    value={inputValue}
                    name={inputName}
                    onChange={handleChange}
                    placeholder={placeHolder}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" 
                    rows="4"
                />
                {error && <ShowError error={error.message} />}
            </div>
        </>
    )
}

export default FormTextarea
