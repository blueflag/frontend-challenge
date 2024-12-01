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

test('renders the Search input component', () => {
    render(<UsersList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByPlaceholderText('Search for User...');
    expect(component).toBeInTheDocument();
});

test('renders the sorting components', () => {
    render(<UsersList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByTestId('users-list-sorting-components');
    expect(component).toBeInTheDocument();
});
