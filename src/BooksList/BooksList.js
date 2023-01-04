import React, { useState, useMemo, useCallback } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import './BooksList.css';

const BooksList = ({books, updatedBooks}) => {
    const [checkedBooksId, setCheckedBooks] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { state } = useLocation();
    const navigate = useNavigate()
    const showCheckbox = state ? state.showCheckbox : false
    const allotedBooksCount = state ? state.allotedBooksCount : 0
    const selectedId = state ? state.selectedId : 0

    const handleSetCheckedBooks = useCallback((e) => {
        const { checked, id } = e.target
        if (checked) setCheckedBooks([...checkedBooksId, id])
        else setCheckedBooks(checkedBooksId.filter(book => id !== book))
    },[checkedBooksId])

    const handleSearch = useCallback((e) => {
        setSearchValue(e.target.value)
    },[])

    const filteredBooks = useMemo(() => {
        if(searchValue === "")  return books
        return books.filter(({isbn, title, author}) => isbn.includes(searchValue) || title.includes(searchValue) || author.includes(searchValue))    
    },[searchValue, books])

    const renderSearchBar = useMemo(() => {
      return (
        <>
        <label>Search: </label>
        <input type="text" onChange={handleSearch} placeholder="Enter text"/>
        </>
      )
    },[handleSearch])

    const handleSubmit = useCallback(() => {
       console.log(checkedBooksId.length, allotedBooksCount)
      if(checkedBooksId.length + allotedBooksCount >3) alert('limit reached')
      else {
        updatedBooks({checkedBooksId, memberId:selectedId})
      } 
      navigate('/members')
    },[checkedBooksId, allotedBooksCount, selectedId, updatedBooks, navigate])

    const renderSubmit = useMemo(() => {
        return (
         showCheckbox ? <button onClick={handleSubmit}>Issue Selected books</button> : <></>
        )
    },[handleSubmit, showCheckbox])

    const renderBooks = useMemo(() => {
        return (
            <table className='table'>
                <tr>
                    {showCheckbox && <th></th>}
                    <th>ISBN</th>
                    <th>Aurthur</th>
                    <th>Title</th>
                    <th>count</th>
                </tr>
                {filteredBooks.filter(({count}) => count>0).map(({ isbn, title, author, count }) => {
                    return (
                        <tr>
                            {showCheckbox && <td><input type="checkbox" id={isbn} onClick={handleSetCheckedBooks} className='booksList__checkbox'/></td> }
                            <td>{isbn}</td>
                            <td>{title}</td>
                            <td>{author}</td>
                            <td>{count}</td>
                        </tr>
                    )
                })}
            </table>
        )
    },[showCheckbox, handleSetCheckedBooks, filteredBooks])

    return (
        <div className='booksList'>
            {renderSearchBar}
            {renderSubmit}
            {renderBooks}
        </div>
    );
}

export default BooksList;