import React from 'react'

export const Input = ({
    type,
    id,
    placeholder,
    className,
    children,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full px-5 py-3 text-sm border border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                {...props}
            >
                {children}
            </input>
        </div>
    )
}
