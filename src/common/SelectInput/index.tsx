import React from 'react';
import Form from 'react-bootstrap/Form';
import { SelectOptionsType } from '../../pages/UserLearningActivities/types';

type Props = {
    label: string
    options: SelectOptionsType[]
    handleChange: (name: string, value: string) => void
    name: string
    customClass?: string
}

export default function SelectInput(props: Props): React.ReactElement {
    const { options, handleChange, label, customClass, name } = props;
    return (
        <Form>
            <Form.Group className={ customClass }>
                <Form.Label>{ label }</Form.Label>
                <Form.Select 
                    aria-label="Select"
                    onChange={(e) => handleChange(
                        name, 
                        e.target.value
                    )}
                >
                    <option value="">Select</option>
                    {options.map(data => (
                        <option value={ data.value } key={data.value}>
                            { data.label }
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
}