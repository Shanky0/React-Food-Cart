
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom';
import Checkout from './Components/Checkout';

function App() {
  return (
   <>
   <Routers>
    <Routes >
      <Route path='/' element={ <Navbar />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
   </Routers>
   </>
  );
}

export default App;
