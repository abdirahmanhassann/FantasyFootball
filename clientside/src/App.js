import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Chooseleague from './components/chooseleague.tsx';
import Homepage from './components/Homepage.tsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/chooseleague' element={<Chooseleague/>}/>
    </Routes>
    </Router>
  );
}

export default App;
