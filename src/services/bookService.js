import axios from 'axios';
import { BOOK_API } from './common';

class BookService {
    static getBooks(){
        return axios.get(BOOK_API);
    }

    static deleteBook(bookId){
        return axios.delete(`${BOOK_API}/${bookId}`)
    }

    static createBook(book){
        return axios.post(BOOK_API, book);
    }
}
export default BookService;