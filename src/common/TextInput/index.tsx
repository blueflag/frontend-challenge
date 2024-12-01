import React from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
    handleChange: (e: { target: { value: string } }) => void
}

export default function TextInput(props: Props): React.ReactElement {
    const { handleChange } = props;
    return (
        <Form.Group>
            <Form.Control 
                type="text" 
                placeholder="Search..." 
                size='sm'
                onChange={handleChange}
            />
        </Form.Group>
    );
}