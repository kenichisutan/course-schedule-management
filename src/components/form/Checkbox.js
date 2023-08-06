import React, { useState, forwardRef } from "react";

const Checkbox = forwardRef((props, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    ref={ref} // Pass the ref to the input element
                />
                {props.title}
            </label>
            <p>{props.message}</p>
        </div>
    );
});

export default Checkbox;