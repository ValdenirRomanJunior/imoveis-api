import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalHeader, 
  ModalTitle, 
  CloseButton, 
  ModalBody, 
  FormGroup, 
  Label, 
  Input, 
  SubmitButton, 
  ErrorMessage,
  SuccessMessage,
  PasswordInputContainer,
  EyeIcon
} from './styles';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

interface FormData {
  slug: string;
  proprietario: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface FieldErrors {
  [key: string]: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    slug: '',
    proprietario: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validação especial para o campo phone - apenas números e máximo 11 caracteres
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erro do campo quando o usuário começar a digitar
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!formData.slug || formData.slug.length < 2) {
      newErrors.slug = 'Nome da imobiliária deve ter pelo menos 2 caracteres';
    }
    if (!formData.proprietario || formData.proprietario.length < 2) {
      newErrors.proprietario = 'Nome do proprietário deve ter pelo menos 2 caracteres';
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Sobrenome deve ter pelo menos 2 caracteres';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseBackendErrors = (errorData: any) => {
    const newFieldErrors: FieldErrors = {};
    
    // Se o backend retornar um array de erros com fieldName
    if (errorData.errors && Array.isArray(errorData.errors)) {
      errorData.errors.forEach((error: any) => {
        if (error.fieldName) {
          newFieldErrors[error.fieldName] = error.message;
        }
      });
    }
    // Se o backend retornar erros de validação do Spring
    else if (errorData.fieldErrors) {
      Object.keys(errorData.fieldErrors).forEach(field => {
        newFieldErrors[field] = errorData.fieldErrors[field];
      });
    }
    // Se houver uma mensagem geral
    else if (errorData.message) {
      setGeneralError(errorData.message);
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/tenants/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: formData.slug,
          proprietario: formData.proprietario,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        onSuccess(userData);
        onClose();
      } else {
        const errorData = await response.json();
        parseBackendErrors(errorData);
      }
    } catch (error) {
      setGeneralError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Criar Conta - Teste Grátis</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nome da Imobiliária *</Label>
              <Input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Digite o nome da imobiliária"
                required
                maxLength={25}
              />
              {fieldErrors.slug && <ErrorMessage>{fieldErrors.slug}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Nome do Proprietário *</Label>
              <Input
                type="text"
                name="proprietario"
                value={formData.proprietario}
                onChange={handleInputChange}
                placeholder="Digite o nome do proprietário"
                required
                maxLength={35}
              />
              {fieldErrors.proprietario && <ErrorMessage>{fieldErrors.proprietario}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Sobrenome *</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Digite o sobrenome"
                required
                maxLength={35}
              />
              {fieldErrors.lastName && <ErrorMessage>{fieldErrors.lastName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite seu email"
                required
                maxLength={45}
              />
              {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Senha *</Label>
              <PasswordInputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha (mín. 8 caracteres)"
                  required
                  maxLength={20}
                />
                <EyeIcon 
                  onClick={() => setShowPassword(!showPassword)}
                  $isVisible={showPassword}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </EyeIcon>
              </PasswordInputContainer>
              {fieldErrors.password && <ErrorMessage>{fieldErrors.password}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Confirmar Senha *</Label>
              <PasswordInputContainer>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme sua senha"
                  required
                  maxLength={20}
                />
                <EyeIcon 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  $isVisible={showConfirmPassword}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </EyeIcon>
              </PasswordInputContainer>
              {fieldErrors.confirmPassword && <ErrorMessage>{fieldErrors.confirmPassword}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Telefone *</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Digite seu telefone (apenas números)"
                required
                maxLength={11}
              />
              {fieldErrors.phone && <ErrorMessage>{fieldErrors.phone}</ErrorMessage>}
            </FormGroup>

            {generalError && <ErrorMessage>{generalError}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <TailSpin height="20" width="20" color="#ffffff" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta Grátis'
              )}
            </SubmitButton>
          </form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RegisterModal;