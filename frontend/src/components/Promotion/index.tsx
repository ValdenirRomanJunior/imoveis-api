
// Componente Promotion
import React from 'react';

// Cores usadas no banner para referência, mas aplicadas via classes Tailwind
const COLORS = {
    'standi-blue': '#1e3a8a', // blue-900ish
    'standi-cyan': '#06b6d4', // cyan-400
    'standi-bg': '#172554',   // blue-950
};

// =======================================================================================
// 1. ÍCONES
// =======================================================================================

// SVG para o ícone de Presente (Bônus)
const GiftIcon = () => (
    <svg 
        className="w-6 h-6 mr-2 flex-shrink-0 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ color: COLORS['standi-cyan'] }}
    >
        <path d="M19 12V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3C15.3137 3 18 5.68629 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3C8.68629 3 6 5.68629 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// SVG para o ícone do Google
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-0.5">
        <path d="M22.461 12.046c0-.69-.06-1.354-.183-1.996H12v3.76h5.875c-.255 1.348-1.002 2.483-2.137 3.26v2.484h3.19c1.869-1.725 2.953-4.27 2.953-7.308z" fill="#4285F4"/>
        <path d="M12 22c3.24 0 5.954-1.077 7.938-2.918l-3.19-2.484c-.886.602-2.027 1.05-3.834 1.05-2.955 0-5.464-1.998-6.368-4.67H2.433v2.564C4.383 20.36 7.91 22 12 22z" fill="#34A853"/>
        <path d="M5.632 14.93c-.23-.66-.36-1.36-.36-2.08s.13-1.42.36-2.08V7.933H2.433c-.79 1.583-.79 3.394 0 5.006L5.632 14.93z" fill="#FBBC05"/>
        <path d="M12 5.09c1.769 0 3.344.609 4.595 1.79l2.83-2.753C17.954 1.954 15.24 0 12 0 7.91 0 4.383 1.64 2.433 4.673L5.632 7.237C6.536 4.569 9.045 2.57 12 2.57z" fill="#EA4335"/>
    </svg>
);

// =======================================================================================
// 2. COMPONENTE PRINCIPAL (Utilizando Classes Tailwind)
// =======================================================================================

const Promotion: React.FC<PromotionProps> = ({ onOpenRegisterModal }) => {

    // Classes Tailwind que simulam o gradiente e a sombra complexa do Banner
    const bannerClasses = `
        max-w-6xl w-full mx-auto rounded-xl overflow-hidden text-white 
        transition-all duration-300 
        bg-gradient-to-r from-blue-950 to-blue-800 
        shadow-2xl hover:scale-[1.01]
    `;

    // Estilo customizado para o botão CTA e Badge de Desconto (usando style inline para customização)
    const discountBadgeStyle = { 
        transform: 'rotate(3deg)', 
        backgroundColor: COLORS['standi-cyan'], 
        boxShadow: '0 0 15px 5px rgba(6, 182, 212, 0.8)'
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center font-sans p-3 sm:p-4 pt-5">
            
            {/* CONTAINER PRINCIPAL */}
            <div className={bannerClasses} id="year-end-banner">
                
                {/* CONTEÚDO */}
                <div className="flex flex-col p-8 md:p-12 lg:p-12">

                    {/* ÁREA DE CONTEÚDO SUPERIOR */}
                    <div className="flex flex-col md:flex-row justify-between items-start w-full mb-3 md:mb-5"> 

                        {/* Coluna de Texto e Destaque */}
                        <div className="text-center md:text-left mb-3 md:mb-0 md:w-3/5">
                            
                            <p className="text-cyan-400 text-sm md:text-base font-semibold uppercase tracking-widest mb-0.5">
                                Oportunidade Única de Fim de Ano
                            </p>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                                <span className="block">Prepare sua Imobiliária</span> 
                                <span className="block text-cyan-400">para o Sucesso em 2026!</span>
                            </h1>
                            
                            <p className="mt-1 sm:mt-2 text-base sm:text-lg font-light text-gray-100">
                                A Standi com <span className="font-bold text-cyan-400">32% OFF</span> para você começar o ano na frente, otimizado para Google e I.A.
                            </p>
                        </div>

                        {/* Coluna de Desconto e Preços */}
                        <div className="flex flex-col items-center md:items-end md:w-2/5 w-full mt-4 md:mt-0">
                            
                            {/* Destaque do Desconto */}
                            <div 
                                className="rounded-sm mb-2 flex flex-col justify-center items-center py-2 px-6"
                                style={discountBadgeStyle}
                            >
                                <p 
                                    className="text-blue-950 font-black text-2xl lg:text-3xl tracking-tighter leading-none"
                                    style={{ transform: 'rotate(-5deg)' }} // Rotação inversa para o texto
                                >
                                    32% OFF
                                </p>
                                <p className="text-blue-950 text-xs font-bold text-center leading-none">
                                    EM TODOS OS PLANOS
                                </p>
                            </div>

                            {/* Novos Preços */}
                            <div className="text-center md:text-right mb-3">
                                <p className="text-gray-300 text-sm md:text-base font-light">
                                    De: <span className="font-semibold line-through decoration-gray-300">R$129,00</span>
                                </p>
                                <p className="text-white text-3xl md:text-4xl font-extrabold leading-none mt-0.5">
                                    Por: <span className="text-cyan-400">R$87,00</span>
                                    <span className="text-xl md:text-2xl font-light">/mês</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* CABEÇALHO DO BÔNUS */}
                    <div className="flex items-center justify-center mx-auto mt-4 mb-2 max-w-lg text-cyan-400 px-2">
                        <GiftIcon />
                        <span className="text-base font-bold uppercase tracking-widest leading-tight">BÔNUS EXCLUSIVO</span>
                    </div>

                    {/* BÔNUS GOOGLE MEU NEGÓCIO */}
                    <div className="mx-auto w-full max-w-lg bg-white/10 rounded-lg p-2 md:p-3 border border-cyan-400/30 flex items-center mb-4">
                        
                        <div>
                            <p className="font-bold text-base flex items-center mb-0.5 text-gray-100">
                                <GoogleIcon />
                                Google Meu Negócio
                            </p>
                            <p className="text-xs text-gray-200 text-left">
                                Tutorial: Aprenda a colocar sua imobiliária no mapa da sua cidade.
                            </p>
                        </div>
                    </div>

                    {/* ÁREA DE CTA INFERIOR */}
                    <div className="w-full flex flex-col items-center mt-3">
                        
                        {/* Botão CTA */}
                        <a 
                            className="inline-block py-3 px-8 bg-green-500 text-blue-950 font-bold text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-100"
                            href="#link-para-planos-standi" 
                            role="button"
                            style={{ 
                                boxShadow: `0 15px 20px -5px rgba(0, 0, 0, 0.2), 0 0 10px ${COLORS['standi-cyan']}` 
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                onOpenRegisterModal && onOpenRegisterModal();
                            }}
                        >
                            TESTAR GRÁTIS AGORA
                        </a>
                        
                        <p className="mt-1 text-xs text-gray-400 text-center">Válido até 31/12</p>
                    </div>
                    
                </div>
            </div>
            
            <div className="absolute bottom-4 text-center text-gray-600">
                <p>Simulação de onde o banner ficaria no seu layout.</p>
            </div>
        </div>
    );
};

export default Promotion;

// Tipagem de props para receber o handler que abre o modal
type PromotionProps = {
    onOpenRegisterModal?: () => void;
};
