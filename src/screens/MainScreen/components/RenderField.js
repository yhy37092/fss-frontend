import React from "react";

const RenderField = ({input, className, placeholder, meta: { touched, error, warning }}) => (
    <div>
        <input {...input} className={className} placeholder={placeholder}/>
        {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
)

export default RenderField