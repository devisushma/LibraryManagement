import React, { useState } from 'react';
import members from '../DB/members.json';
import MemberInfo from "../MemberInfo"
import Portal from "../Portal"
import "./Members.css"

function Members({membersInfo}) {

    const [searchText, setSearchText] = useState("")
    const [selectedId,setSelectedId] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleTextChange = ({ target: { value } }) => {
        setSearchText(value)
    }
    const onClickHandle = (id) => {
        setIsDialogOpen(true)
        setSelectedId(id)
    }
    return (
        <div className='main--container' style={{ opacity: isDialogOpen ? '20%' : 'unset' }}>
        <div className='members--container'>
            <label className="search--label">Search :
                <input className="search--input" type="text" value={searchText} onChange={handleTextChange} placeholder={"Enter Student id"} />
            </label>
            {searchText !== "" &&
                <table className="members-table">
                    <tr><th>Student_id</th><th>Name</th><th>Department</th></tr>
                    {
                        members.map(({ student_id, name, department }) => (
                            student_id.toString().includes(searchText) ?
                                (
                                    <tr>
                                        <td className="filtered-students" onClick={() => onClickHandle(student_id)}><div>
                                            {student_id}
                                        </div>
                                        </td>
                                        <td>{name}</td>
                                        <td>{department}</td>
                                    </tr>
                                ) : (<></>)
                        ))
                    }
                </table>
            }
        </div>
            <img src="images/lib.png" alt="Library pic" className="lib--image"/>
            { isDialogOpen && <Portal><MemberInfo selectedId={selectedId} handleIsDialogOpen={setIsDialogOpen} membersInfo={membersInfo}/></Portal>}
        </div>
    );
}

export default Members;