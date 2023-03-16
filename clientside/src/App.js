import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Squadselection from './components/squadselection.tsx';
import Homepage from './components/Homepage.tsx';
import SignedInHome from './components/SignedinHomePage.tsx';
import Leagues from './components/Leagues.tsx';
import Createleague from './components/Createleague.tsx';
import Create from './components/Create.tsx';
import Joinleague from './components/Joinleague.tsx';
import Viewleagues from './components/Viewleagues.tsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/squadselection' element={<Squadselection/>}/>
      <Route path='/signedInHome' element={<SignedInHome/>}/>
      <Route path='/Leagues' element={<Leagues/>}/>
      <Route path='/Leagues/viewleagues' element={<Viewleagues/>}/>
      <Route path='/Leagues/createleague' element={<Createleague/>}/>
      <Route path='/Leagues/createleague/join' element={<Joinleague/>}/>
      <Route path='/Leagues/createleague/create' element={<Create/>}/>
    </Routes>
    </Router>
  );
}

export default App;
