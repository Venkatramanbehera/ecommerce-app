import React from 'react'
import propTypes from 'prop-types';

const Input = ({ type, name, value, placeholder, onChange }) => {
    return (
        <div>
            <div className="form-group">
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} />
            </div>
        </div>
    )
};

Input.prototype = {
    type: propTypes.string.isRequired,
    name: propTypes.string,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired
}

export default Input;