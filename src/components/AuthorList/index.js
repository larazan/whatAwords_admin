import React from 'react'
import { Link } from "react-router-dom"

const AuthorList = ({ abjad, param }) => {
    return (
        <>
            <div className="flex items-center justify-between pt-4 ">
                <div className="top-0 py-3 flex overflow-x-auto scrollbars-hidden">
                    <div className="flex inline-flex space-x-3">
                        {abjad.map((huruf) => (
                        <Link to={`/admin/authors/${huruf}`}>
                            <button className={`inline-flex items-center justify-center px-4 py-2 bg-white  border border-gray-300 cursor-pointer ${param === huruf ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-200'}  font-normal`}>
                                <span className="text-sm font-semibold uppercase">
                                    {huruf}
                                </span>
                            </button>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="author-container">
                {abjad.map((list) => (
                    <Link to={`/authors/${list}`} className={`${param === list ? 'selected' : null} `}>{list}</Link>
                ) )}
                
            </div> */}
        </>
    )
}

export default AuthorList
