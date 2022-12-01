import axios from 'axios';
import { BOOK_API } from './common';

class BookService {
    static getBooks(){
        return axios.get(BOOK_API);
    }
}
export default BookService;