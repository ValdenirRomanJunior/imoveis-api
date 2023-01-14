import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {BsPersonFill} from 'react-icons/bs';
import {LeadDetailBackground, LeadDetailContainer} from './styles';
import LeadContact from './LeadContact';
import LeadMessage from './LeadMessage';

const LeadDetail = () => {
    return(
        <LeadDetailBackground>
            <Header />
            <BarTop />
            <LeadDetailContainer>
               
                    <BsPersonFill className='icon-lead-detail'/>
                    <p className='lead-name-detail'>Valdenir Roman</p>
                    <p className='lead-message-date'>02/10/2022  2:30 PM</p>

                    <LeadContact />
                    <LeadMessage />
               

            </LeadDetailContainer>
        </LeadDetailBackground>
    )


}

export default LeadDetail;