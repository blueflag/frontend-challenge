import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '../UserCard';

test('renders the component', () => {
    render(<UserCard
            user={{ id: '1', givenName: 'John', familyName: 'Doe', jobPositions: 'Software Engineer' }}
            learningRecords={[]}
            participations={[]}
            completed={[]}
        />);
    const component = screen.getByTestId('user-card-component');
    expect(component).toBeInTheDocument();
});

test('renders the User full name in the card', () => {
    render(<UserCard
            user={{ id: '1', givenName: 'John', familyName: 'Doe', jobPositions: 'Software Engineer' }}
            learningRecords={[]}
            participations={[]}
            completed={[]}
        />);
    const component = screen.getByText('John Doe');
    expect(component).toBeInTheDocument();
});

test('renders the User job position in the card', () => {
    render(<UserCard
            user={{ id: '1', givenName: 'John', familyName: 'Doe', jobPositions: 'Software Engineer' }}
            learningRecords={[]}
            participations={[]}
            completed={[]}
        />);
    const component = screen.getByText('Software Engineer');
    expect(component).toBeInTheDocument();
});
