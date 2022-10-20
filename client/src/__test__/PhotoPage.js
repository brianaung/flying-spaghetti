import { BrowserRouter as Router } from 'react-router-dom';
import PhotoPage from '../pages/PhotoPage';

test('render the photo page', () => {
  <Router>
    render(
    <PhotoPage />
    );
  </Router>;
});
