import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './components/booksummary';
import About from './components/about';
import Navbars from './components/navbar';


function App() {
  return (
    <div className="App">
     
      <Router>
<Navbars/>

<Routes>
  {/* <Route path="*" element={<Navbars />} />  */}

  <Route path="/" exact element={<Book />} />

  <Route path="/about" element={<About />} />


</Routes>

</Router>
    </div>
  );
}

export default App;