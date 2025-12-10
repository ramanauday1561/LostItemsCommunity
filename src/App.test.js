import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const headingElement = screen.getByText(/LostItemsCommunity/i);
  expect(headingElement).toBeInTheDocument();
});
