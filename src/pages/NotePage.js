import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'; 
import {Link} from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

 const NotePage = ({props}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    // const note = notes.find(note => note.id===Number(id))
    const [note, setNote] = useState({body: ''});
    
    useEffect(() => {
        getNote()
    },[id])

    const getNote = async () => {
        if(id === 'new') return
       let response = await fetch(`http://localhost:3000/notes/${id}`)
       let data = await response.json()
       setNote(data)
    }


    const createNote = async () => {
        await fetch(`http://localhost:3000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    const updateNote = async () => {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    const deleteNote = async () => {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    const handleSubmit = () => {
        if(id !== 'new' && !note.body) {
            deleteNote()
        }else if(id !== 'new') {
            updateNote()
        }else if(id === 'new' && note !== null) {
            createNote()
        }
        
        navigate('/')
    }


  return (
    <div className="note">
    <div className="note-header">
        <h3>
            <Link to="/">
                <ArrowLeft onClick={handleSubmit} />
            </Link>
        </h3>
        {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
        ): (
            <button onClick={handleSubmit}>Done</button>
        )}
        
    </div>
    <textarea onChange={(e)=>{setNote({...note, 'body': e.target.value})}} value={note?.body}>

    </textarea>
    </div>
  )
}


export default NotePage

// import { useParams } from 'react-router-dom';



//  const NotePage = () => {
//     const {id} = useParams();
//     const note = notes.find(note => note.id===Number(id))
//   return (
//     <div>
//         <h1>{note.body}</h1>
//     </div>
//   )
// }
