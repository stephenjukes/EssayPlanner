import React, {useState} from 'react';

export default function Input({formParams}) {
    const form = formParams.form || {};
    const input = formParams.input || {};
    const submit = formParams.submit || {};

    const [value, setValue] = useState(input.value);
    
    return (
        <form 
            onSubmit={e => {
                form.onSubmit(e, value);
                form.resetAfterSubmit && setValue("");
            }}
        >
            <input 
                name='input'
                value={value} 
                placeholder={input.placeholder}
                onChange={e => setValue(e.target.value)}
                onBlur={input.onBlur}
                data-item={input.itemId}  // TODO: Make this more generic as an array
            />
            
            <input 
                name="submit"
                type="submit" 
                value={submit.label || "Submit"}
            />
        </form>
    )
}