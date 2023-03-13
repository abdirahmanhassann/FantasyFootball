import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Squadselection from './components/squadselection.tsx';
import Homepage from './components/Homepage.tsx';
import League from './components/SignedinHomePage.tsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/squadselection' element={<Squadselection/>}/>
      <Route path='/League' element={<League/>}/>
    </Routes>
    </Router>
  );
}

export default App;
