import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o dashboard após 5 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Pagamento Realizado!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sua assinatura foi ativada com sucesso.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Você será redirecionado para o dashboard em alguns segundos...
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ir para o Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;