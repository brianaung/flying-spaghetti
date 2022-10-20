import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

test('render the home page', () => {
  <Router>
    render(
    <Dashboard />
    );
  </Router>;
});
