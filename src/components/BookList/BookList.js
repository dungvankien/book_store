import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from './../../services/bookService';
import Helper from "../../services/helper";
import Spinner from "../Spinner/Spinner";

function BookList() {
  const [ state, setState ] = useState({
    loading: false,
    books: [],
    errorMessage: ""
  })

  useEffect(() => {
    try {
      setState({...state, loading: true});
      async function getData(){
        let resBook = await BookService.getBooks();
        setState({
          ...state,
          loading: false,
          books: resBook.data
        })
      }
      getData();
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message
      })
    }
  }, [])

  const { loading, books } = state;
 
  return (
    <>
      <section className="create_book my-2">
        <div className="container">
          <div className="d-flex align-items-center">
            <h3 className="me-2">Book Manager</h3>
            <Link
              to={"bookstore-app/book/create"}
              className="btn btn-primary btn-sm"
            >
              <i className="fa fa-circle-plus me-2"></i>
              New
            </Link>
          </div>
          <p className="fst-italic">
            Anim velit ad velit in deserunt velit. Ut pariatur duis exercitation
            duis amet ex culpa non cupidatat duis nisi. In sunt nisi ipsum ea
            qui sint ullamco labore. Nisi fugiat eiusmod est anim veniam non
            Lorem commodo proident aute deserunt ullamco ipsum fugiat. Anim ad
            consectetur pariatur reprehenderit nostrud sit ipsum excepteur
            consectetur sit. Nisi incididunt esse exercitation sint.
          </p>
          <div>
            <form className="d-flex w-25">
              <input type="text" className="form-control me-2" />
              <button className="btn btn-outline-secondary btn-sm">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
            <div className="row">
              {
                loading ? <Spinner/> : (
                  books.map(book => (
                    <div className="col-md-6" key={book.id}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <img className="rounded" src={book.photo} alt=""/>
                                </div>
                                <div className="col-md-8">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Book Name: <span className="fw-bolder">{book.bookName}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Price: <span className="fw-bolder">{Helper.formatCurrency(book.price)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Author: <span className="fw-bolder">{book.author}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-1">
                                    <div>
                                        <button className="btn btn-warning btn-sm">
                                            <i className="fa fa-eye"></i>
                                        </button>
                                        <button className="btn btn-primary btn-sm mt-3 my-3">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  ))
                )
              }
                
            </div>
        </div>
      </section>
    </>
  );
}

export default BookList;
