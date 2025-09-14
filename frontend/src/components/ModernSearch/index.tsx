import React, { useState, useEffect, useRef } from 'react';
import { BiSearch, BiTargetLock, BiHome, BiMapPin } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { getAllStates, getAllCities, findProperty, getAllAddress } from '../../services/resources/property';
import {
  SearchContainer,
  SearchWrapper,
  SearchTitle,
  SearchForm,
  SearchRow,
  SearchField,
  SearchLabel,
  SearchInput,
  SearchSelect,
  SearchButton,
  DropdownContainer,
  DropdownItem,
  IconWrapper,
  SearchCode,
  SearchCodeInput,
  OrDivider
} from './styles';

type Props = {
  onChange: (name: string, goal: string, type: string) => void;
  param?: boolean;
  onPropertyFound?: (property: any) => void;
};

type StateProp = {
  id: number;
  name: string;
};

type CityProp = {
  id: number;
  name: string;
};

type AddressProp = {
  id: number;
  name: string;
  city?: string;
  state?: string;
};

const ModernSearch = ({ onChange, param, onPropertyFound }: Props) => {
  const [id, setId] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [goal, setGoal] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const [states, setStates] = useState<StateProp[]>([]);
  const [cities, setCities] = useState<CityProp[]>([]);
  const [addresses, setAddresses] = useState<AddressProp[]>([]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);

  const propertyTypes = [
    { label: "Casa", value: "1" },
    { label: "Apartamento", value: "2" },
    { label: "Terreno", value: "3" },
    { label: "Casa Comercial", value: "4" },
    { label: "Casa de Condomínio", value: "5" },
    { label: "Flat", value: "6" },
    { label: "Chácara", value: "7" },
    { label: "Sítio", value: "8" },
    { label: "Fazenda", value: "9" },
    { label: "Galpão/Barracão", value: "10" },
    { label: "Pousada", value: "11" },
    { label: "Studio", value: "12" },
    { label: "Sala Comercial", value: "13" },
    { label: "Sobrado", value: "14" },
    { label: "Lançamento", value: "15" }
  ];

  const goalTypes = [
    { label: "Comprar", value: "venda" },
    { label: "Alugar", value: "aluguel" }
  ];

  const fetchStates = async () => {
    try {
      const data = await getAllStates();
      setStates(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const fetchCities = async () => {
    if (state && state !== '') {
      try {
        const data = await getAllCities(state);
        setCities(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    } else {
      setCities([]);
    }
  };

  const fetchAddresses = async () => {
    try {
      const data = await getAllAddress();
      setAddresses(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchAddresses();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [state]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
      if (goalRef.current && !goalRef.current.contains(event.target as Node)) {
        setIsGoalDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    onChange(name, goal, type);
  };

  const handleSearchById = async () => {
    if (!id.trim()) return;
    
    try {
      const response = await findProperty(id);
      if (response && response.data) {
        if (onPropertyFound) {
          onPropertyFound([response.data]);
        }
      } else {
        alert('Imóvel não encontrado com este código.');
      }
    } catch (error) {
      console.error('Erro ao buscar imóvel por código:', error);
      alert('Erro ao buscar imóvel. Tente novamente.');
    }
  };

  const handleTypeSelect = (selectedType: string, selectedLabel: string) => {
    setType(selectedType);
    setIsTypeDropdownOpen(false);
  };

  const handleGoalSelect = (selectedGoal: string, selectedLabel: string) => {
    setGoal(selectedGoal);
    setIsGoalDropdownOpen(false);
  };

  const getSelectedTypeLabel = () => {
    const selected = propertyTypes.find(item => item.value === type);
    return selected ? selected.label : 'Tipo de Imóvel';
  };

  const getSelectedGoalLabel = () => {
    const selected = goalTypes.find(item => item.value === goal);
    return selected ? selected.label : 'Finalidade';
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchCode>
          <SearchCodeInput
            type="text"
            placeholder="Digite o código do imóvel"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <SearchButton onClick={handleSearchById} disabled={!id}>
            <BiSearch size={16} />
            Buscar por Código
          </SearchButton>
        </SearchCode>

        <OrDivider>
          <span>ou</span>
        </OrDivider>

        <SearchForm>
          <SearchField ref={goalRef}>
            <SearchLabel>
              <IconWrapper>
                <BiTargetLock />
              </IconWrapper>
              Finalidade
            </SearchLabel>
            <SearchSelect 
              onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
              isOpen={isGoalDropdownOpen}
            >
              <span>{getSelectedGoalLabel()}</span>
              <IoIosArrowDown />
            </SearchSelect>
            {isGoalDropdownOpen && (
              <DropdownContainer>
                {goalTypes.map((item) => (
                  <DropdownItem
                    key={item.value}
                    onClick={() => handleGoalSelect(item.value, item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContainer>
            )}
          </SearchField>

          <SearchField ref={typeRef}>
            <SearchLabel>
              <IconWrapper>
                <BiHome />
              </IconWrapper>
              Tipo
            </SearchLabel>
            <SearchSelect 
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              isOpen={isTypeDropdownOpen}
            >
              <span>{getSelectedTypeLabel()}</span>
              <IoIosArrowDown />
            </SearchSelect>
            {isTypeDropdownOpen && (
              <DropdownContainer>
                {propertyTypes.map((item) => (
                  <DropdownItem
                    key={item.value}
                    onClick={() => handleTypeSelect(item.value, item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContainer>
            )}
          </SearchField>

          <SearchField>
            <SearchLabel>
              <IconWrapper>
                <BiMapPin />
              </IconWrapper>
              Estado
            </SearchLabel>
            <SearchInput
              as="select"
              value={state}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setState(e.target.value);
                setCity('');
              }}
            >
              <option value="">Estado</option>
              {states.map((stateItem) => (
                <option key={stateItem.id} value={stateItem.id}>
                  {stateItem.name}
                </option>
              ))}
            </SearchInput>
          </SearchField>

          <SearchField>
            <SearchLabel>
              <IconWrapper>
                <BiMapPin />
              </IconWrapper>
              Cidade
            </SearchLabel>
            <SearchInput
              as="select"
              value={city}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
              disabled={!state}
            >
              <option value="">Cidade</option>
              {cities.map((cityItem) => (
                <option key={cityItem.id} value={cityItem.id}>
                  {cityItem.name}
                </option>
              ))}
            </SearchInput>
          </SearchField>

          <SearchField>
            <SearchLabel>Bairro</SearchLabel>
            <SearchInput
              type="text"
              placeholder="Bairro ou região"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </SearchField>

          <SearchButton onClick={handleSearch} primary>
            <BiSearch size={16} />
            Buscar
          </SearchButton>
        </SearchForm>
      </SearchWrapper>
    </SearchContainer>
  );
};

export default ModernSearch;