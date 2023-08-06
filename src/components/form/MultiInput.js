import React, { forwardRef } from "react";

const MultiInput = forwardRef((props, ref) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <select
                className={props.className}
                id={props.name}
                ref={ref}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
});

export default MultiInput;