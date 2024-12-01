import React from 'react';
import { render, screen } from '@testing-library/react';
import LearningResourceCard from '../LearningResourceCard';

test('renders the component', () => {
    render(<LearningResourceCard
                resource={{
                    id: "f8535d6f-d7ca-4d37-9a21-e43e94ee7783",
                    code: "LR_14",
                    title: "Workshop"
                }}
                participants={[]}
                completers={[]}
                completionPercentage={0}
                totalUsers={0}
            />);
    const component = screen.getByTestId('learning-resource-card-component');
    expect(component).toBeInTheDocument();
});

test('renders the Learning Resource code', () => {
    render(<LearningResourceCard
                resource={{
                    id: "f8535d6f-d7ca-4d37-9a21-e43e94ee7783",
                    code: "LR_14",
                    title: "Workshop"
                }}
                participants={[]}
                completers={[]}
                completionPercentage={0}
                totalUsers={0}
            />);
    const component = screen.getByText('LR_14');
    expect(component).toBeInTheDocument();
});
