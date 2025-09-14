import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { getAllStates, getAllCities } from '../../services/resources/property';
import { number } from '../../pages/Registration/masks';
import {
  SearchContainer,
  BarTopSearch,
  SearchContent,
  SearchButtonContainer,
  SearchCodeWrapper
} from './styles';

type Props = {
  onChange: (name: string, goal: string, type: string) => void;
  param?: boolean;
};

type StateProp = {
  id: number;
  name: string;
};

type CityProp = {
  id: number;
  name: string;
};

const FunctionalSearch = ({ onChange, param }: Props) => {
  const [id, setId] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [goal, setGoal] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const [states, setStates] = useState<StateProp[]>([]);
  const [cities, setCities] = useState<CityProp[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const itemsList = [
    { type: "Casa", value: "1" },
    { type: "Apartamento", value: "2" },
    { type: "Terreno", value: "3" },
    { type: "Casa Comercial", value: "4" },
    { type: "Casa de Condomínio", value: "5" },
    { type: "Flat", value: "6" },
    { type: "Chácara", value: "7" },
    { type: "Sítio", value: "8" },
    { type: "Fazenda", value: "9" },
    { type: "Galpão/Barracão", value: "10" },
    { type: "Pousada", value: "11" },
    { type: "Studio", value: "12" },
    { type: "Sala Comercial", value: "13" },
    { type: "Sobrado", value: "14" },
    { type: "Lançamento", value: "15" }
  ];

  const getStates = async () => {
    try {
      const data = await getAllStates();
      setStates(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const getCities = async () => {
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

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    getCities();
  }, [state]);

  useEffect(() => {
    setDisabled(id !== '');
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearch = () => {
    // Se busca por código, usar o ID
    if (id && id.trim() !== '') {
      onChange(id, '', '');
    } else {
      // Busca por filtros - usar name como termo de busca geral
      onChange(name || '', goal, type);
    }
    handleCloseModal();
  };

  const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'id') {
      number(e);
      // Limpar outros campos quando buscar por ID
      setState('');
      setCity('');
      setGoal('');
      setType('');
      setName('');
      setSelectedItemIndex(null);
    }
  };

  const cleanIndexType = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemIndex(null);
    setType('');
  };

  const resetForm = () => {
    setId('');
    setState('');
    setCity('');
    setGoal('');
    setType('');
    setName('');
    setSelectedItemIndex(null);
  };

  return (
    <SearchContainer>
      <BiSearch className='icon-search-properties' onClick={handleOpenModal} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='ModalSearch'
      >
        <BarTopSearch>
          <p>Busca</p>
          <IoCloseOutline onClick={handleCloseModal} className='button-close-modal-mobile' />
        </BarTopSearch>

        <SearchContent>
          {/* Busca por nome/termo geral */}
          <div className="search-name-wrapper">
            <input
              type="text"
              placeholder="Buscar por nome, bairro ou descrição"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={disabled}
            />
          </div>

          {/* Filtros de localização */}
          <div className="selectWrapper">
            <select
              name='state'
              id='state'
              disabled={disabled}
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value=''>Estado</option>
              {states.map((uf) => (
                <option key={uf.id} value={uf.id}>{uf.name}</option>
              ))}
            </select>
          </div>

          <select
            name='city'
            id='city'
            disabled={disabled}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value=''>Cidade</option>
            {cities.map((ct) => (
              <option key={ct.id} value={ct.id}>{ct.name}</option>
            ))}
          </select>

          <div className="type-goal-wrapper">
            {/* Dropdown customizado para tipo */}
            <div className="custom-dropdown" ref={ref}>
              <div
                className="custom-dropdown-selection"
                onClick={() => setIsDropDownVisible(!isDropdownVisible)}
              >
                {selectedItemIndex !== null ? itemsList[selectedItemIndex].type : "Tipo"}
                {selectedItemIndex !== null && (
                  <IoCloseOutline
                    onClick={cleanIndexType}
                    className="icon-clean-type"
                  />
                )}
                <IoIosArrowDown className="arrow-type" />
              </div>
              {isDropdownVisible && (
                <div className="items-holder">
                  {itemsList.map((item, index) => (
                    <div
                      key={item.value}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedItemIndex(index);
                        setIsDropDownVisible(false);
                        setType(item.value);
                      }}
                    >
                      {item.type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Select para finalidade */}
            <select
              name='goal'
              id='goal'
              disabled={disabled}
              value={goal}
              className="select-half"
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value=''>Finalidade</option>
              <option value='1'>Aluguel</option>
              <option value='2'>Venda</option>
              <option value='3'>Vender/Alugar</option>
            </select>
          </div>

          <SearchButtonContainer>
            <button
              className="search-button-send"
              onClick={handleSearch}
            >
              Buscar
            </button>
            <button
              className="reset-button"
              onClick={resetForm}
              type="button"
            >
              Limpar
            </button>
          </SearchButtonContainer>

          {/* Busca por código */}
          <SearchCodeWrapper>
            <input
              type="number"
              name='id'
              placeholder="Busca por código"
              value={id}
              onKeyUp={handleKeyUp}
              onChange={(e) => setId(e.target.value)}
            />
            <div>
              <button onClick={handleSearch}>Buscar</button>
            </div>
          </SearchCodeWrapper>
        </SearchContent>
      </Modal>
    </SearchContainer>
  );
};

export default FunctionalSearch;