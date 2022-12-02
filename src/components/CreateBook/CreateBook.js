import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import noBookPhoto from '../../assets/images/nobookphoto.jpg'
import CategoryService from './../../services/categoryService';
import PublisherService from './../../services/publisherService';
import { toast } from 'react-toastify';
import FileHelper from './../../services/fileHelper';
import BookService from './../../services/bookService';


function CreateBook() {
    const [state, setState] = useState({
        loading: false,
        categories: [],
        publishers: [],
        book: {},
        errorMessage: ""
    })

    const [fileImg, setFileImg] = useState({
        uploading: false,
        file: {}
    })

    const navigate = useNavigate();

    useEffect(() => {
        try {
            setState({...state, loading: true})
            async function getData(){
                let catRes = await CategoryService.getCategories();
                let pubRes = await PublisherService.getPublishers();
                setState({
                    ...state,
                    categories: catRes.data,
                    publishers: pubRes.data,
                    loading: false
                })
            }
            getData();
        } catch (error) {
            toast.error(error.message)
            setState({
                ...state,
                loading:false,
                errorMessage: error.message
            })
        }
    }, [])

    const handleInputValue = (e) => {
        setState({
            ...state,
            book: {
                ...book,
                [e.target.name]: e.target.value
            }
        })
    }

    const changePhoto = (e) => {
        let photo_url = URL.createObjectURL(e.target.files[0]);
        setFileImg({...fileImg, file: e.target.files[0]})
        setState({
            ...state,
            book: {
                ...book,
                photo: photo_url
            }
        })
    }

    const handleUploadImage = async () => {
        setFileImg({ ...fileImg, uploading: true});
        let uploadRes = await FileHelper.uploadImage(fileImg.file);
        if(uploadRes.data){
            toast.success("Photo uploaded success!");
            setFileImg({...fileImg, uploading: false});
            setState({
                ...state,
                book: {
                    ...book,
                    photo: uploadRes.data.url
                }
            })
        }
    }

    const handleCreateBook = async (e) => {
        e.preventDefault();
        try {
            setState({ ...state, loading: true});
            let createRes = await BookService.createBook(book);
            if(createRes.data){
                setState({ ...state, loading: false});
                navigate("/book_store", { replace: true});
                toast.success( `Book ${book.bookName} has been created success`);
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    const { loading, book, categories, publishers } = state;
    return ( 
        <>
            <section className="create-book my-2">
                <div className="container">
                    <h3 className="me-2 text-success"> Create Book</h3>
                    <p className="fst-italic">Ea qui deserunt consequat aliquip deserunt velit laborum fugiat cupidatat minim. Qui aliqua veniam velit cupidatat quis aute labore adipisicing voluptate amet ullamco nostrud consectetur. Fugiat sint sunt ipsum labore. Irure excepteur voluptate magna consectetur. Anim aliquip ex magna proident eiusmod reprehenderit ullamco excepteur duis.</p>
                </div>
            </section>
            <section className="create-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleCreateBook}>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Book name</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" name="bookName" className="form-control" required placeholder="Book name" 
                                            onInput={handleInputValue}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Price</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="number" name="price" className="form-control" required placeholder="Price" 
                                            min={1000} max={Number.MAX_SAFE_INTEGER}
                                            onInput={handleInputValue}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Author</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" name="author" className="form-control" required placeholder="Author" 
                                            onInput={handleInputValue}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Publish Year</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="number" name="publishYear" className="form-control" required placeholder="Publis Year" 
                                            min="1000" max={new Date().getFullYear()}
                                            onInput={handleInputValue}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Category</label>
                                    </div>
                                    <div className="col-md-9">
                                        <select name="catId" className="form-control" onChange={handleInputValue}>
                                            {
                                                categories.map((cat) => (
                                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Publisher</label>
                                    </div>
                                    <div className="col-md-9">
                                        <select name="publisherId" className="form-control" onChange={handleInputValue}>
                                            {
                                                publishers.map((pub) => (
                                                    <option value={pub.id} key={pub.id}>{pub.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9">
                                       <button type="submit" className="btn btn-success btn-sm me-2">Create</button>
                                       <Link to={"/book_store"} className="btn btn-dark btn-sm">Close</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-3">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <input type="file" accept="image/*" className="d-none" 
                                    onChange={changePhoto}
                                />
                                <img className="photo-lg mb-2" src={book.photo || noBookPhoto} alt="" role="button" 
                                    onClick={() => document.querySelector(`input[type="file"]`).click()}
                                />
                                {
                                    fileImg.uploading ? (
                                        <button className="btn btn-secondary btn-sm mt-1" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                            Uploading...
                                        </button>
                                    ) : (
                                        <button className="btn btn-secondary btn-sm mt-1" onClick={handleUploadImage}>Upload</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
     );
}

export default CreateBook;