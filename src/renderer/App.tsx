import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Example from './pages/Example';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Example />} />
      </Routes>
    </Router>
  );
}
