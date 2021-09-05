import React from "react";

export default function Dialog(props) {
    const { children } = props

    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 flex justify-center items-center">
            {children}
        </div>
    );
}
