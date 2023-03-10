import { useState } from "react";
import BooksList from "./BooksList"
import books from "./DB/books.json"
import Members from "./Members";
import membersInfo from "./DB/membersInfo.json";
import { todayDate } from "./helpers";
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"

function App() {
  const [updatedBooks, setUpdatedBooks] = useState(books)
  const [updatedMembersInfo, setMemberInfo] = useState(membersInfo)

  const handleBooks = ({ checkedBooksId, memberId }) => {
    const newBooks = books.map(item => ({
      ...item,
      count: checkedBooksId.includes(item.isbn) ? item.count - 1 : item.count
    }))
    const checkedBooks = checkedBooksId.map(id => ({ isbn: id, issuedOn: todayDate}))
    const newMembersInfo = membersInfo.map(info => {
      if(memberId !== info.student_id ) return info
      else {
        return {...info, books:[...info.books, ...checkedBooks]}
      }
    })
    setUpdatedBooks(newBooks)
    setMemberInfo(newMembersInfo)
    alert('issued book successfully!')
  }

  return (
    <div className="App">
      {console.log(process.env,"hellooooo")}
      <Router>
        <div className="container">
          <h1 className="h1__heading">Library Management</h1>
          <ul className="horizontal-links">
            <li >
              <Link to={`${process.env.PUBLIC_URL}/`}>Books List</Link>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/members`}>Members</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path={`${process.env.PUBLIC_URL}/`} element={<BooksList books={updatedBooks} updatedBooks={handleBooks} />} />
          <Route path={`${process.env.PUBLIC_URL}/members`} element={<Members membersInfo={updatedMembersInfo} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
