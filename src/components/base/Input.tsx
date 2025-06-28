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
                className="w-full px-4 py-3.5 rounded-xl bg-[#111111] text-white border border-[#2a2a2a] 
                placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent
                transition-all duration-200 hover:bg-[#141414] hover:border-[#333]"
                {...props}
            >
                {children}
            </input>
        </div>
    )
}
