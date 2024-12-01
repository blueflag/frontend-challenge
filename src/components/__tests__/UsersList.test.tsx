import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from '../UsersList';

test('renders the component', () => {
    render(<UsersList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByTestId('users-list-component');
    expect(component).toBeInTheDocument();
});
