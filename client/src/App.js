import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route exact path='/recipe' element={<RecipeCreate />}/>
          <Route path='/recipes/:id' element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
