import React from 'react';
import { render, screen } from '@testing-library/react';
import LearningResourcesList from '../LearningResourcesList';

test('renders the component', () => {
    render(<LearningResourcesList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByTestId('learning-resources-list-component');
    expect(component).toBeInTheDocument();
});

test('renders the Search filter component', () => {
    render(<LearningResourcesList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByPlaceholderText('Search for Resource Title...');
    expect(component).toBeInTheDocument();
});

test('renders the Sorting components', () => {
    render(<LearningResourcesList
            isLoading={false}
            learningRecords={[]}
            learningResources={[]}
            users={[]}
        />);
    const component = screen.getByTestId('learning-resources-list-sorting-components');
    expect(component).toBeInTheDocument();
});
