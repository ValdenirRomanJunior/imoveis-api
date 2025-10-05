import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const PaymentExpired: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Clock className="mx-auto h-16 w-16 text-orange-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Pagamento Expirado
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              O tempo limite para realizar o pagamento foi excedido.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Você pode gerar um novo link de pagamento a qualquer momento.
            </p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/plans')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Escolher Plano Novamente
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Voltar ao Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentExpired;