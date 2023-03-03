import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage.tsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
    </Routes>
    </Router>
  );
}

export default App;
