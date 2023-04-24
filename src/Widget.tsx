import React from 'react';

export default function Widget(
    {
        label,
        icon,
        event,
    }:
    {
        label: string,
        icon: any,
        event: any,
    },
): React.ReactElement {
    const widgets = {
        backgroundColor: '#01588f',
        cursor: 'pointer',
    }

    return <div
            className="container p-3 rounded text-light p-4"
            style={widgets}
            onClick={event}
        >
            <h3>
                <span className="float-end">{ icon }</span>
                { label }
            </h3>
        </div>;
}