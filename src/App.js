import { Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import BookList from './components/BookList/BookList';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/book_store' element={<BookList/>} />
        <Route path='/book_store/book/create'/>
      </Routes>
    </>
  );
}

export default App;
