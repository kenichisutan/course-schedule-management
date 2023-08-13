import React, { forwardRef } from "react";

const Checkbox = forwardRef(({ title, message, onChange, isChecked }, ref) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    ref={ref}
                />
                {title}
            </label>
            <p>{message}</p>
        </div>
    );
});

export default Checkbox;
