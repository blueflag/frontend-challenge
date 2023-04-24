import React from 'react';

export default function Table(
    {
        columns,
        rows,
        title,
    }:
    {
        columns: string[],
        rows: {}[],
        title: string,
    },
): React.ReactElement {
    const headerTitle = (title: string) => {
        title = title.replace(/([A-Z])/g, " $1");
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    return (
        <div className="shadow mt-4">
            <div className="p-2 border-bottom text-light" style={{backgroundColor: '#01588f'}}>
                <strong>{ title }</strong>
            </div>
            <div style={{height: '70vh', overflowY: 'scroll'}}>
                <table className="table table-hover">
                    <thead>
                        <tr className="bg-light">
                            {
                                columns.map((column, key) => {
                                    return (
                                        <th key={key}>
                                            { headerTitle(column) }
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row: any, key) => {
                                return (
                                    <tr key={key}>
                                        {
                                            columns.map((column, index) => {
                                                const rowKey: string = `td-${index}`  
                                                return (
                                                    <td key={rowKey}>
                                                        { row[column] }
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
      );
}