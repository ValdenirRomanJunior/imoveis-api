import BarTop from "../../components/Bartop";
import Header from "../../components/Header";
import LeadCard from "./LeadCard";
import { LeadsBackground, LeadsContainer } from "./styles";
import Modal from 'react-modal';
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "../Leads/ModalStyle.css";




const Leads = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal =() => {
        setIsOpen(true)
    }

    const handleCloseModal =() =>{
        setIsOpen(false)
    }

    const customStyles = {
        content: {
            top: '350px',
            left:'50%',
            width: '90%',
            height: '60vh',
            transform:'translate(-50%,-50%)',
            

            
            
        }
    }

    return(
        <LeadsBackground>
            <Header />
            <BarTop />
            <LeadsContainer>         
            <div className="title-leads"><h2>Contatos</h2> <div className="button-add-lead container">
                <button className="modal-button" onClick={handleOpenModal}>+</button>
           
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}    
                className='Modall'
                            
            >
                <h2>Adicionar Contato</h2>
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' />
                <form>
                    <label>Nome</label>
                    <Input />
                    <label>Email</label>
                    <Input />
                    <label>Telefone</label>
                    <Input />
                    <Button>Adicionar</Button>
                </form>
            </Modal>
            

            </div>      
            </div>
            <LeadCard />
            
            </LeadsContainer>
        </LeadsBackground>
    )


}

export default Leads;