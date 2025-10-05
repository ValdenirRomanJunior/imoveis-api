/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {MdPhotoCamera} from 'react-icons/md';
import api from '../../utils/requests';

import {MyAccountBackground,BodyMyAccountContainer,TitleWrapper, CardAccount} from './styles';
import {  getImageIfExist, refreshToken, uploadProfileImage } from '../../services/resources/user';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import { deleteUserTenant, findAllUserTenant } from '../../services/resources/userTenant';
import { Tenant } from '../../types/tenant';
import Loading from '../../components/Loading';
import DomainManager from '../../components/DomainManager';
import CancelSubscriptionModal from '../../components/CancelSubscriptionModal';



const MyAccount = ()=>{

    const navigate = useNavigate();

    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [errorMaxSize,setErrorMaxSize]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);

    const [fileBase64,setFileBase64]= useState<string>("");

    const [imageUser,setImageUser]= useState<string>("");

    // Estados para informações do plano
    const [planInfo, setPlanInfo] = useState<any>(null);
    const [loadingPlan, setLoadingPlan] = useState(false);

    // Estados para informações de pagamento
    const [paymentInfo, setPaymentInfo] = useState<any>(null);
    const [loadingPayment, setLoadingPayment] = useState(false);

    // Estados para o modal de cancelamento
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

    const {user, getCurrentUser} = useAuth();

    const [initials, setInitials]= useState(() => {
        if(user){
            return user.slug?.substring(0,1)+ user.email?.substring(0,1) as string;

        }
        return 'error' as string;

    });
   

  // Função para formatar data de forma segura
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Data inválida recebida:', dateString);
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Erro na data';
    }
  };

  const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/account')
        }else{
           navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])
   

    useEffect(() =>{
        getCurrentUser();
       
    },[])

   
    const getUserPerfil= () => {
        if (!user || !user.perfis || user.perfis.length === 0) {
            return null;
        }
        const userPerfil= user.perfis[0]; 
        return userPerfil;
    }
    
  
    const formSubmit= async()=> {
       
        const data=await  uploadProfileImage(fileBase64 as string);
        
        let a=getUrl();
        setImageUser(a as unknown as string);

        setLoading(true)
       
            if(data.status === 201){  
                setTimeout(()=>{
                  setLoading(false)
                  setSuccessMessage(true)
                    },1000) 
              
                
              setTimeout(()=>{
              setSuccessMessage(false);

              },4000)  
      }      
        if(data.response.data.status !== 201 && data.response.data.status !== 411 ){ 
            console.log(data.response.data.status)         
                  setLoading(false)
                  setError(true);
               
                  setTimeout(() => {
                   setError(false);
                  
                  },4000)                 
             
          }
    
          if(data.response.data.status === 411){ 
            console.log(data.response.data.status)  
            setLoading(false)
            setErrorMaxSize(true);
        
            setTimeout(() => {
             setErrorMaxSize(false);
            
            },4000)                 
       
    }
        
           
}
useEffect(() => { 
    if(fileBase64 && fileBase64 !== ""){
        formSubmit()
    }
}, [fileBase64]);


    function convertFile(files: FileList|null){
        if(files){
            const fileRef= files[0] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{
                
                setFileBase64(`data:${fileType as string};base64,${btoa(ev.target.result )}`);
                
                                      
            }                 
        }     
    }

      
      
      const getUrl = async() =>{
        const userPerfil = getUserPerfil();
        if (!user?.id || !userPerfil) {
            return null;
        }
        
        const data = await getImageIfExist(user.id, userPerfil);
        if(data != null){
           // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
            setImageUser(data as unknown as string);
            return data
        }
    
      }  
    
      useEffect(() => {  
        getUrl()
         
        }, [user.id]);

    // Função para buscar informações do plano atual
    const fetchPlanInfo = async () => {
        if (!user?.id) return;
        
        setLoadingPlan(true);
        try {
            const response = await api.get(`/plans/current`);
            console.log('Resposta da API /plans/current:', response.data);
            setPlanInfo(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações do plano:', error);
        } finally {
            setLoadingPlan(false);
        }
    };

    // Função para buscar informações de pagamento
    const fetchPaymentInfo = async () => {
        if (!user?.id) return;
        
        setLoadingPayment(true);
        try {
            const response = await api.get(`/asaas/payment-info`);
            console.log('Resposta da API /asaas/payment-info:', response.data);
            setPaymentInfo(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações de pagamento:', error);
        } finally {
            setLoadingPayment(false);
        }
    };

    // Função para abrir o modal de cancelamento
    const handleCancelSubscription = (subscription: any) => {
        setSelectedSubscription(subscription);
        setShowCancelModal(true);
    };

    // Função para fechar o modal de cancelamento
    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
        setSelectedSubscription(null);
    };

    // Função para lidar com o sucesso do cancelamento
    const handleCancelSuccess = () => {
        fetchPaymentInfo(); // Recarrega as informações de pagamento
    };

    useEffect(() => {
        if (user?.id) {
            fetchPlanInfo();
            fetchPaymentInfo();
        }
    }, [user?.id]);

 
        const ErrorHandler = () => {
            return <PageNotFound/>;
          }


          const [userTenants, setUserTenants]= useState<Tenant[]>();
          const getListUsers= async()=>{
            const data=  await findAllUserTenant();
            setUserTenants(data.data as Tenant[])
            
          }

          useEffect(() => {  
            getListUsers()
             
            }, []);

            const [selectedUsers,setSelectedUsers]= useState<Tenant[]>([]);
            
            useEffect(() => {  
               if(userTenants) {
                   const filteredUsers = userTenants.filter((item:any) => 
                       !item.perfis.includes('ACCOUNT')
                   );
                   setSelectedUsers(filteredUsers);
               }
            }, [userTenants]);

           console.log(selectedUsers)
         
    
            let perfilTenant=user?.perfis ? user.perfis.includes('TENANT') : false;
let perfilAdmin=user?.perfis ? user.perfis.includes('ADMIN') : false;
let perfilAccount=user?.perfis ? user.perfis.includes('ACCOUNT') : false;

            const [initialsUser, setInitialsUser]= useState(() => {
                if(user){
                    return user.slug?.substring(0,1)+ user.email?.substring(0,1) as string;
        
                }
                return 'error' as string;
        
            });

            const [isVisible, setIsVisible] = useState(false);
       
            

            const handleToRemove = async (id:number) => {
                setIsVisible(true);       
           const data = await deleteUserTenant((String(id)));
           console.log(data.status)
           if(data.status === 204){
           
            setTimeout(async ()=> { 
                setIsVisible(false)                   
              
           },500)    
           setSelectedUsers([])
           getListUsers()
           }     
    }
          
    return(
        <>
       
        {perfilTenant || perfilAdmin ? 
        
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
       
 
    <MyAccountBackground>
       <Header /> 
      <BarTop />
       <BodyMyAccountContainer>
        
        <TitleWrapper>
        <h1 className='title-account'>Minha Conta</h1>
        
        </TitleWrapper>
       <div className='upload'>
        <div className='imgWrapper'>

        {imageUser !== ''  && user.email !== 'admin@outlook.com'? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials}</p>}
        </div>
        <div className='round'>
        <form id='form-image-profile' onSubmit={formSubmit}>
        {
             //<input className='input-image-profile' type="file" accept="image/png,image/jpeg"  onChange={(e) => convertFile(e.target.files)}/>///  
        }    
      
            <MdPhotoCamera style={{color:'#fff'}}/>
      
        </form>  
        </div>
        </div>
        { loading ===true && <div className='message-file-success-account'>Aguarde...</div>}
        { successMessage===true && <div className='message-file-success-account'>Adicionada com sucesso!</div>}

        { error===true && <div className='message-file-error-account'>Tente mais tarde</div>}
                 { errorMaxSize===true && <div className='message-file-error-account'>Tamanho Máximo é de 10M</div>}
        
        <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
            <h2>Perfil</h2>
            
            <div className='card-account-wrapper-name'>
                <label>Imobiliária</label>
                <p>{user.slug} {user.lastName}</p>
            </div>
            <div className='card-account-wrapper-email'>
                <label>Email</label>
                <p>{user.email}</p>
            </div>
           
            <div className='card-account-wrapper-status'>
                <label>Status</label>
                <p>{user.status}</p>
                </div>

            <div className='card-account-wrapper-email'>
                <label>CRECI</label>
                {user.creci ? <p>{user.creci}</p>:<p>Por favor atualize o creci</p>}
            </div>
        
            </div>
         
        </CardAccount>
        
        {/* Plan Information Card - Only for Account users */}
        {perfilAccount && (
          <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
              <h2>Plano Atual</h2>
              
              {loadingPlan ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <Loading />
                </div>
              ) : planInfo ? (
                <>
                  <div className='card-account-wrapper-name'>
                    <label>Plano</label>
                    <p>{planInfo.planType}</p>
                  </div>
                  
                  <div className='card-account-wrapper-email'>
                    <label>Status</label>
                    <p style={{color: planInfo.isActive ? '#28a745' : '#dc3545'}}>
                      {planInfo.isActive ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                  
                  {planInfo.isTrialActive && (
                    <div className='card-account-wrapper-status'>
                      <label>Período de Teste</label>
                      <p style={{color: '#ffc107'}}>
                        Expira em: {formatDate(planInfo.planEndDate)}
                      </p>
                    </div>
                  )}
                  
                  {!planInfo.isTrialActive && (
                    <div className='card-account-wrapper-status'>
                      <label>Válido até</label>
                      <p>{formatDate(planInfo.planEndDate)}</p>
                    </div>
                  )}
                  
                  <div className='card-account-wrapper-email'>
                    <label>Ações</label>
                    <Link to="/plans" style={{color: '#007bff', textDecoration: 'none'}}>
                      Ver todos os planos
                    </Link>
                  </div>
                </>
              ) : (
                <div className='card-account-wrapper-email'>
                  <label>Plano</label>
                  <p>Erro ao carregar informações do plano</p>
                </div>
              )}
            </div>
          </CardAccount>
        )}

        {/* Payment Information Card - Only for Account users */}
        {perfilAccount && (
          <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
              <h2>Informações de Pagamento</h2>
              
              {loadingPayment ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <Loading />
                </div>
              ) : paymentInfo && paymentInfo.success ? (
                paymentInfo.hasPaymentInfo ? (
                  <>
                    <div className='card-account-wrapper-name'>
                      <label>Cliente</label>
                      <p>{paymentInfo.customerInfo.name}</p>
                    </div>
                    
                    <div className='card-account-wrapper-email'>
                      <label>Email de Cobrança</label>
                      <p>{paymentInfo.customerInfo.email}</p>
                    </div>
                    
                    <div className='card-account-wrapper-status'>
                      <label>CPF/CNPJ</label>
                      <p>{paymentInfo.customerInfo.cpfCnpj}</p>
                    </div>
                    
                    {paymentInfo.customerInfo.mobilePhone && (
                      <div className='card-account-wrapper-email'>
                        <label>Telefone</label>
                        <p>{paymentInfo.customerInfo.mobilePhone}</p>
                      </div>
                    )}
                    
                        {paymentInfo.activeSubscriptions && paymentInfo.activeSubscriptions.length > 0 && (
                          <div className='card-account-wrapper-status'>
                            <label>Assinaturas Ativas</label>
                            <div style={{marginTop: '10px'}}>
                              {paymentInfo.activeSubscriptions.map((subscription: any, index: number) => (
                                <div key={index} style={{
                                  padding: '10px', 
                                  border: '1px solid #e0e0e0', 
                                  borderRadius: '5px', 
                                  marginBottom: '10px',
                                  backgroundColor: '#f9f9f9'
                                }}>
                                  <p><strong>Valor:</strong> R$ {subscription.value}</p>
                                  <p><strong>Ciclo:</strong> {subscription.cycle}</p>
                                  <p><strong>Próximo Vencimento:</strong> {formatDate(subscription.nextDueDate)}</p>
                                  <p><strong>Status:</strong> 
                                    <span style={{color: '#28a745', marginLeft: '5px'}}>
                                      {subscription.status}
                                    </span>
                                  </p>
                                  <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
                                    <button
                                      onClick={() => handleCancelSubscription(subscription)}
                                      style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                      }}
                                    >
                                      Cancelar Assinatura
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    
                    <div className='card-account-wrapper-email'>
                      <label>Ações</label>
                      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                        <Link to="/plans" style={{color: '#007bff', textDecoration: 'none'}}>
                          Alterar Plano
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='card-account-wrapper-email'>
                    <label>Status</label>
                    <p>Nenhuma informação de pagamento encontrada</p>
                    <Link to="/plans" style={{color: '#007bff', textDecoration: 'none', marginTop: '10px', display: 'block'}}>
                      Assinar um plano
                    </Link>
                  </div>
                )
              ) : (
                <div className='card-account-wrapper-email'>
                  <label>Pagamento</label>
                  <p>Erro ao carregar informações de pagamento</p>
                </div>
              )}
            </div>
          </CardAccount>
        )}
        
        {/* Custom Domain Manager - Only for Account users */}
        {perfilAccount && user?.id && (
          <DomainManager accountId={Number(user.id)} />
        )}
        
        {perfilAccount  &&
        <CardAccount status='ACTIVE'>           
            <div className='card-account-wrapper'> 

            <div className='title-users-account'> <h2>Usuários</h2> <Link to={"/userRegistration"} className='link-add-user'>Adicionar usuário</Link></div>
            
            <div className='users-account-wrapper'>
         
            <ul className='list-users-account'>
             
                {selectedUsers && selectedUsers.map(item=> (
                <li key={item.id}>
                {!isVisible ? 
                    <>
                    <div className='initials-user-account-wrapper'><p className='initials-user-account'>{initialsUser}</p></div>
                    <p className='user-account-name'>{item.slug}</p> 
                    <div className='edit-remove-user-wrapper'>
                        <p className='edit-user-link'><Link to={`/editUser/${item.id}`}>editar</Link></p>    
                        <p onClick={()=>handleToRemove(item.id)}>excluir</p>
                    </div>
                    </>
                :
                <div style={{background:'#dadada',width:'100%', height:'30px', position:'relative' ,color:'#dadada', borderRadius:'5px'}}>
                    <Loading/>
                </div>
                }
                </li>
                ))}
            </ul>     
            </div>

            </div>
         
        </CardAccount>
        }
       </BodyMyAccountContainer>
    </MyAccountBackground>
  
      </div>
      </ErrorBoundary>
      : <PageNotFound/>}

      {/* Modal de cancelamento de assinatura */}
      {showCancelModal && selectedSubscription && (
        <CancelSubscriptionModal
          isOpen={showCancelModal}
          onClose={handleCloseCancelModal}
          onSuccess={handleCancelSuccess}
          subscription={selectedSubscription}
        />
      )}
   
      </>
    )

}

export default MyAccount;