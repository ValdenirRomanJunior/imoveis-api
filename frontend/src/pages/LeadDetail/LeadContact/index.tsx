import {LeadContactContainer} from './styles';
const LeadContact = () => {
    return(
        <LeadContactContainer>
            <div className='lead-information-wrapper'><span className='label-information-detail'>E-mail</span><div className='value-information-detail'>vromanjunior@outlook.com</div></div>
            <div className='lead-information-wrapper'><span className='label-information-detail'>Phone</span><div  className='value-information-detail'>(85) 982251426 </div></div>
        </LeadContactContainer>
     
    )


}

export default LeadContact;