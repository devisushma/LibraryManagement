import React,{ useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import members from '../DB/members.json';
import { fineRules, todayDate } from '../helpers.js'
import "./MemberInfo.css"

const MemberInfo = ({selectedId, handleIsDialogOpen, membersInfo}) => {

    const navigate = useNavigate()

    const handleCloseClick = () => handleIsDialogOpen(false)

    const nameDisplay = useMemo(() => members.find(({student_id}) => student_id === selectedId).name,[selectedId])

    const selectedMemberInfo = useMemo(() => membersInfo.find(({student_id})=> student_id === selectedId),[selectedId, membersInfo])

    const calculateFine= useCallback((issuedOn,dateOfReturn) => { 
      const returnDate = dateOfReturn !== "" ? new Date(dateOfReturn): new Date(todayDate)
      if(issuedOn === todayDate) return 0
      return issuedOn !== "" ? Math.ceil(fineRules(( returnDate - new Date(issuedOn)) / (1000*60*60*24))) : 0
    },[])

    const calculateFineOfBooks = useMemo(() => {
        return selectedMemberInfo.books.reduce((acc,{issuedOn, dateOfReturn}) => {
          return acc = acc + calculateFine(issuedOn,dateOfReturn) 
        },0)
    },[calculateFine, selectedMemberInfo])

    const allotedBooksCount = useCallback(() => {
      console.log(selectedMemberInfo,"selectedMemberInfo")
      return selectedMemberInfo.books.filter(({dateOfReturn, issuedOn}) => dateOfReturn === "" || issuedOn === todayDate).length
    },[selectedMemberInfo])

    const isButtonDisable = useMemo(() => {
      return allotedBooksCount >=3 || calculateFineOfBooks !== 0
    },[allotedBooksCount, calculateFineOfBooks])

    const handleRedirection = useCallback(() => {
        navigate(
            '/',
            {
              state: {
                showCheckbox:true,
                allotedBooksCount: allotedBooksCount(),
                selectedId
              }
            }
          )
    },[navigate, allotedBooksCount, selectedId])


    return (
        <>
        <div className='dialog--container'>
        <div className='title--container'>
            <h4 className='title--h4'>Member Info</h4>
            <FaRegWindowClose className='close--icon' onClick={handleCloseClick}/>
        </div>
        <hr />
        <label className='student-label'>Student : {selectedId} - {nameDisplay} </label>
        <table className='books-table'>
            <tr><th>books</th><th>Issued on</th><th>Date Of Return</th><th>Fine</th></tr>
            {selectedMemberInfo.books.map(({isbn, issuedOn, dateOfReturn}) => {
                  return (
                    <tr>
                     <td>{isbn}</td>
                     <td>{issuedOn}</td>
                     <td>{dateOfReturn}</td>
                     <td>{calculateFine(issuedOn,dateOfReturn)}</td>
                    </tr>)
                })}
        </table>
        <div className="footer">
        <h5 className="totalFine--h5">Total fine: {calculateFineOfBooks}/-</h5>
        <button disabled={isButtonDisable} className="issueBook--button" onClick={handleRedirection}>Issue books</button>
        </div>
        </div>
      </>
    );
}

export default MemberInfo;