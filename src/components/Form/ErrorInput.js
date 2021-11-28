import React from 'react'

const ErrorInput = ({ error }) => {
    return (
        <>
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {error.message}
            </span>
        </>
    )
}

export default ErrorInput
