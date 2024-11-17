import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import SearchResults from './screens/SearchResult';
import MovieDetails from './screens/MovieDetails';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
