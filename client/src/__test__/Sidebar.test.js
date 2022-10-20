import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

test('renders the landing page', () => {
  render(<Sidebar />);
});
