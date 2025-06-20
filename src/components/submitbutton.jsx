'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton(props) {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit" className="blue_btn">
            {props.value}
        </button>
    )
}
