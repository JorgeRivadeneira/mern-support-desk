import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import NoteItem from "../components/NoteItem.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { getNotes, createNote } from "../features/notes/noteSlice.js";
import { FaPlus } from "react-icons/fa";

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }
  
  Modal.setAppElement('#root')

function Ticket(){
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets);
    const {notes, isLoading: notesLoading} = useSelector((state) => state.notes);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ticketId} = useParams();

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
        //eslint-disable-next-line
    }, [isError, message, ticketId]);

    //close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket closed');
        navigate('/tickets');
    }

    //create note submit
    const onNoteSubmit = (e)  => {
        e.preventDefault();
        dispatch(createNote({noteText, ticketId}));
        closeModal();
    }

    //Open/Close modal
    const openModal = () => {setModalIsOpen(true)}
    const closeModal = () => {setModalIsOpen(false)}

    if(isLoading || notesLoading){
        return <Spinner />
    }

    if(isError){
        return <h3>Something went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>

                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button className="btn" onClick={openModal}><FaPlus />Add Note</button>
            )}

            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                style={customStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                    <textarea
                        name='noteText'
                        id='noteText'
                        className='form-control'
                        placeholder='Note text'
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
        
    )
}

export default Ticket;