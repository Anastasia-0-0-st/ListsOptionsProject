import React from 'react';
import ReactDOM from "react-dom";

const MySelect = ({option, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled value="default">{defaultValue}</option>
            {option.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;