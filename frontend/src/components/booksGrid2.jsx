import React from "react";
import { Link } from "react-router-dom";
import "./css.css";

export default function BooksGrid2({ books }) {
    return (

        <div className="grid grid-cols-3 gap-4 p-5 max-w-7xl mx-auto text-center">
            {books.map((book) => (
                <div class="card">
                    <div class="content">
                        <div class="back">
                            <div class="back-content">
                                <img src={book?.image} alt="" height="120px" width="120px" />
                                <strong>{book?.titre}</strong>
                            </div>
                        </div>

                        <div class="front">

                            <div class="img">
                                <div class="circle">
                                </div>
                                <div class="circle" id="right">
                                </div>
                                <div class="circle" id="bottom">
                                </div>
                            </div>

                            <div class="front-content">
                                <small class="badge">description</small>
                                <strong>{book?.description}</strong>
                                <Link to={`/books/${book._id}`}>
                                    <button className="bttn">
                                        more info
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}