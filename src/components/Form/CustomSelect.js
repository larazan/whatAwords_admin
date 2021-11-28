import React, { useState } from "react";

const CustomSelect = ({ label, showlabel, inputName, data, onSelectChange }) => {
    const [selectedData, updateSelectedData] = useState("");

    const handleChange = (e) => {
        updateSelectedData(e.target.value);
        if (onSelectChange) onSelectChange(selectedData);
    }
    
    const options = data.map(data => (
        <option 
            key={data._id} 
            value={data._id} 
            className="py-1 capitalize"
        >
            {data.name}
        </option>
    ));

    return (
        <div className="col-span-6 sm:col-span-3">
            { showlabel ? 
                <label 
                    htmlFor={inputName}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            : null }
            <select
                id={inputName}
                className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name={inputName}
                onChange={handleChange}
            >
                <option className="py-1">-- Please select --</option>
                {options}
            </select>
        </div>
    )
}

export default CustomSelect
