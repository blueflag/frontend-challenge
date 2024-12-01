import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

test('renders the component', () => {
    render(<Dashboard />);
    const component = screen.getByTestId('dashboard-component');
    expect(component).toBeInTheDocument();
});

test('renders the resources/users category option toggle', () => {
    render(<Dashboard />);
    const component = screen.getByTestId('category-options-component');
    expect(component).toBeInTheDocument();
});
