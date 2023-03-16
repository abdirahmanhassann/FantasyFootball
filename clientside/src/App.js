import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Squadselection from './components/squadselection.tsx';
import Homepage from './components/Homepage.tsx';
import SignedInHome from './components/SignedinHomePage.tsx';
import Leagues from './components/Leagues.tsx';
import Createleague from './components/Createleague.tsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/squadselection' element={<Squadselection/>}/>
      <Route path='/signedInHome' element={<SignedInHome/>}/>
      <Route path='/Leagues' element={<Leagues/>}/>
      <Route path='/Leagues/createleague' element={<Createleague/>}/>
    </Routes>
    </Router>
  );
}

export default App;
