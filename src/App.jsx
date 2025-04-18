import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductSection } from './components/index';
import { Home } from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductSection />} />
      </Routes>
    </Router>
  );
}

export default App;
