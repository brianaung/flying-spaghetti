import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/Register';

test('render the home page', () => {
  <Router>
    render(
    <Register />
    );
  </Router>;
});
