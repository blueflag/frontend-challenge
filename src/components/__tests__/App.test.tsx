import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the component', () => {
  render(<App />);
  const component = screen.getByTestId('app-layout-component');
  expect(component).toBeInTheDocument();
});
