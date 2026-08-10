import { PseudoSearchContainer } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import { PiBuildingsLight, PiCurrencyDollarLight, PiHouseLineLight, PiKeyLight, PiMapPinLight } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import './styles.css';

import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { IoCloseOutline } from "react-icons/io5";
import { useSubdomain } from '../../../components/SubdomainRouter';
import { getPropertyFilterOptions, getTAllAddressRequest, PropertyFilterOptions } from '../Services/property';

type GoalValue = '1' | '2' | '';

type SearchFilters = {
  goal: GoalValue;
  typeProperty: string;
  location: string;
  city: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  minSuites: string;
  minVacancies: string;
  minArea?: string;
  maxArea?: string;
};

type PriceRangeOption = {
  label: string;
  minPrice: string;
  maxPrice: string;
};

type QuickFilter = {
  key: 'launch' | 'rooms' | 'suites' | 'vacancies';
  label: string;
  apply: (filters: SearchFilters) => SearchFilters;
  isActive: (filters: SearchFilters) => boolean;
};

type AddressOption = {
  district?: string;
  city?: {
    name?: string;
    state?: {
      name?: string;
    };
  };
};

type LocationSuggestion = {
  type: 'city' | 'district';
  label: string;
  value: string;
};

const defaultFilters: SearchFilters = {
  goal: '2',
  typeProperty: '',
  location: '',
  city: '',
  district: '',
  minPrice: '',
  maxPrice: '',
  minRooms: '',
  minSuites: '',
  minVacancies: '',
  minArea: '',
  maxArea: '',
};

const fallbackPropertyTypes: PropertyFilterOptions['types'] = [
  { value: 1, label: 'Casa' },
  { value: 2, label: 'Apartamento' },
  { value: 3, label: 'Terreno' },
  { value: 4, label: 'Casa Comercial' },
  { value: 5, label: 'Casa de Condomínio' },
  { value: 6, label: 'Flat' },
  { value: 7, label: 'Chácara' },
  { value: 8, label: 'Sítio' },
  { value: 9, label: 'Fazenda' },
  { value: 10, label: 'Galpão/Barracão' },
  { value: 11, label: 'Pousada' },
  { value: 12, label: 'Studio' },
  { value: 13, label: 'Sala Comercial' },
  { value: 14, label: 'Sobrado' },
  { value: 15, label: 'Lançamento' },
];

const emptyFilterOptions: PropertyFilterOptions = {
  types: [],
  cities: [],
  districts: [],
};

const normalizeFilterOptions = (data: any): PropertyFilterOptions => ({
  types: Array.isArray(data?.types)
    ? data.types
        .map((item: any) => ({
          value: Number(item?.value ?? item?.cod ?? item?.id ?? ''),
          label: String(item?.label ?? item?.description ?? item?.name ?? ''),
        }))
        .filter((item: { value: number; label: string }) => Number.isFinite(item.value) && item.label)
    : [],
  cities: Array.isArray(data?.cities) ? data.cities.filter(Boolean) : [],
  districts: Array.isArray(data?.districts) ? data.districts.filter(Boolean) : [],
  minPrice: typeof data?.minPrice === 'number' ? data.minPrice : Number(data?.minPrice) || undefined,
  maxPrice: typeof data?.maxPrice === 'number' ? data.maxPrice : Number(data?.maxPrice) || undefined,
});

const buildPriceRanges = (): PriceRangeOption[] => {
  return [
    { label: 'Todos os preços', minPrice: '', maxPrice: '' },
    { label: 'Até 500 mil', minPrice: '', maxPrice: '500000' },
    { label: 'De 500 Mil a 1 Milhão', minPrice: '500000', maxPrice: '1000000' },
    { label: 'Acima de 1 Milhão', minPrice: '1000000', maxPrice: '' },
  ];
};

const quickFilters: QuickFilter[] = [
  {
    key: 'launch',
    label: 'Lançamentos',
    apply: (filters) => ({
      ...filters,
      typeProperty: filters.typeProperty === '15' ? '' : '15',
    }),
    isActive: (filters) => filters.typeProperty === '15',
  },
  {
    key: 'rooms',
    label: '2+ Dormitórios',
    apply: (filters) => ({
      ...filters,
      minRooms: filters.minRooms === '2' ? '' : '2',
    }),
    isActive: (filters) => filters.minRooms === '2',
  },
  {
    key: 'suites',
    label: 'Com Suíte',
    apply: (filters) => ({
      ...filters,
      minSuites: filters.minSuites === '1' ? '' : '1',
    }),
    isActive: (filters) => filters.minSuites === '1',
  },
  {
    key: 'vacancies',
    label: '2+ Vagas',
    apply: (filters) => ({
      ...filters,
      minVacancies: filters.minVacancies === '2' ? '' : '2',
    }),
    isActive: (filters) => filters.minVacancies === '2',
  },
];

const useNavigateSearch = () => {
  const navigate = useNavigate();

  return (pathname: string, params: Record<string, string>) =>
    navigate(`${pathname}/?${createSearchParams(params)}`);
};

interface PseudoSearchProps {
  buttonColor?: string;
  buttonTextColor?: string;
  variant?: 'home' | 'properties';
}

const PseudoSearch = ({ buttonColor = '#e67e22', buttonTextColor = '#ffffff', variant = 'home' }: PseudoSearchProps) => {
  const { companyName } = useParams<{ companyName: string }>();
  const { companyName: subdomainCompanyName } = useSubdomain();
  const hostname = window.location.hostname;
  const clientSlug = subdomainCompanyName || companyName || '';
  const isLocalhost = hostname.includes('localhost') || hostname.startsWith('127.');
  const filterOptionIdentifiers = useMemo(() => {
    const identifiers = new Set<string>();

    if (subdomainCompanyName) identifiers.add(subdomainCompanyName);
    if (companyName) identifiers.add(companyName);

    if (!isLocalhost) {
      identifiers.add(hostname);

      const hostnameParts = hostname.split('.');
      if (hostnameParts.length >= 3) {
        identifiers.add(hostnameParts[0]);
      }
    }

    return Array.from(identifiers).filter(Boolean);
  }, [companyName, hostname, isLocalhost, subdomainCompanyName]);
  const navigateSearch = useNavigateSearch();

  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [filterOptions, setFilterOptions] = useState<PropertyFilterOptions>(emptyFilterOptions);
  const [addressOptions, setAddressOptions] = useState<AddressOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isTypeDropdownVisible, setIsTypeDropdownVisible] = useState(false);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const [isDormitoriosVisible, setIsDormitoriosVisible] = useState(false);
  const [isMaisFiltrosVisible, setIsMaisFiltrosVisible] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const dormitoriosRef = useRef<HTMLDivElement>(null);
  const maisFiltrosRef = useRef<HTMLDivElement>(null);

  const priceRanges = useMemo(() => buildPriceRanges(), []);

  const availableTypes = useMemo(
    () => (filterOptions.types.length > 0 ? filterOptions.types : fallbackPropertyTypes),
    [filterOptions.types]
  );

  const selectedType = useMemo(
    () => availableTypes.find((item) => String(item.value) === filters.typeProperty),
    [availableTypes, filters.typeProperty]
  );

  const selectedPriceLabel = useMemo(
    () => priceRanges.find(
      (range) => range.minPrice === filters.minPrice && range.maxPrice === filters.maxPrice
    )?.label || 'Faixa de Preço',
    [filters.maxPrice, filters.minPrice, priceRanges]
  );

  const locationSuggestions = useMemo(() => {
    const query = filters.location.trim().toLowerCase();
    if (!query) {
      return { cities: [] as LocationSuggestion[], districts: [] as LocationSuggestion[] };
    }

    const cityMap = new Map<string, LocationSuggestion>();
    const districtMap = new Map<string, LocationSuggestion>();

    addressOptions.forEach((address) => {
      const cityName = address.city?.name?.trim();
      const stateName = address.city?.state?.name?.trim();
      const districtName = address.district?.trim();

      if (cityName && cityName.toLowerCase().includes(query) && !cityMap.has(cityName.toLowerCase())) {
        cityMap.set(cityName.toLowerCase(), { type: 'city', label: cityName, value: cityName });
      }

      if (districtName && districtName.toLowerCase().includes(query)) {
        const key = `${districtName.toLowerCase()}-${cityName?.toLowerCase() || ''}`;
        if (!districtMap.has(key)) {
          districtMap.set(key, {
            type: 'district',
            label: [districtName, cityName, stateName].filter(Boolean).join(', '),
            value: districtName,
          });
        }
      }
    });

    return {
      cities: Array.from(cityMap.values()).slice(0, 6),
      districts: Array.from(districtMap.values()).slice(0, 6),
    };
  }, [addressOptions, filters.location]);

  const targetPath = isLocalhost ? `/site/${clientSlug}/imoveis` : '/imoveis';

  const loadFilterOptions = async () => {
    if (filterOptionIdentifiers.length === 0) {
      setFilterOptions({ ...emptyFilterOptions, types: fallbackPropertyTypes });
      setAddressOptions([]);
      return;
    }

    setLoadingOptions(true);

    try {
      for (const identifier of filterOptionIdentifiers) {
        const [filterResponse, addressResponse] = await Promise.all([
          getPropertyFilterOptions(identifier),
          getTAllAddressRequest(identifier),
        ]);

        const normalizedOptions = filterResponse?.data ? normalizeFilterOptions(filterResponse.data) : null;
        const normalizedAddresses = Array.isArray(addressResponse?.data) ? addressResponse.data : [];

        if (normalizedAddresses.length > 0) {
          setAddressOptions(normalizedAddresses);
        }

        if (normalizedOptions && normalizedOptions.types.length > 0) {
          setFilterOptions(normalizedOptions);
          return;
        }
      }

      setFilterOptions({ ...emptyFilterOptions, types: fallbackPropertyTypes });
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    loadFilterOptions();
  }, [filterOptionIdentifiers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (typeRef.current && !typeRef.current.contains(target)) {
        setIsTypeDropdownVisible(false);
      }

      if (priceRef.current && !priceRef.current.contains(target)) {
        setIsPriceDropdownVisible(false);
      }

      if (dormitoriosRef.current && !dormitoriosRef.current.contains(target)) {
        setIsDormitoriosVisible(false);
      }

      if (maisFiltrosRef.current && !maisFiltrosRef.current.contains(target)) {
        setIsMaisFiltrosVisible(false);
      }

      if (locationRef.current && !locationRef.current.contains(target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateFilters = (partial: Partial<SearchFilters>) => {
    setFilters((current) => ({
      ...current,
      ...partial,
    }));
  };

  const handleGoalChange = (goal: GoalValue) => {
    updateFilters({ goal });
  };

  const handleLocationChange = (value: string) => {
    updateFilters({
      location: value,
      city: '',
      district: '',
    });
    setShowLocationSuggestions(value.trim().length > 0);
  };

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    updateFilters({
      location: suggestion.value,
      city: suggestion.type === 'city' ? suggestion.value : '',
      district: suggestion.type === 'district' ? suggestion.value : '',
    });
    setShowLocationSuggestions(false);
  };

  const handleSelectType = (value: string) => {
    updateFilters({ typeProperty: value });
    setIsTypeDropdownVisible(false);
  };

  const handleSelectPriceRange = (range: PriceRangeOption) => {
    updateFilters({
      minPrice: range.minPrice,
      maxPrice: range.maxPrice,
    });
    setIsPriceDropdownVisible(false);
  };

  const executeSearch = async (overrideFilters?: Partial<SearchFilters>) => {
    const nextFilters = {
      ...filters,
      ...overrideFilters,
    };

    setFilters(nextFilters);
    setLoadingSearch(true);

    const params: Record<string, string> = {
      goal: nextFilters.goal || '',
      type: nextFilters.typeProperty || '',
      name: nextFilters.location || '',
      city: nextFilters.city || '',
      district: nextFilters.district || '',
      minPrice: nextFilters.minPrice || '',
      maxPrice: nextFilters.maxPrice || '',
      minRooms: nextFilters.minRooms || '',
      minSuites: nextFilters.minSuites || '',
      minVacancies: nextFilters.minVacancies || '',
      minArea: nextFilters.minArea || '',
      maxArea: nextFilters.maxArea || '',
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '')
    );

    navigateSearch(targetPath, cleanedParams);

    setTimeout(() => {
      setLoadingSearch(false);
    }, 400);
  };

  const handleQuickFilter = (quickFilter: QuickFilter) => {
    const nextFilters = quickFilter.apply(filters);
    executeSearch(nextFilters);
  };

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const renderLocationSuggestions = (isDesktop = false) => {
    if (!filters.location || !showLocationSuggestions) {
      return null;
    }

    if (locationSuggestions.cities.length === 0 && locationSuggestions.districts.length === 0) {
      return (
        <ul>
          <li>Nenhuma localidade encontrada</li>
        </ul>
      );
    }

    return (
      <>
        {locationSuggestions.cities.length > 0 && (
          <ul>
            <h2 className="subtitle-search-list">Cidades</h2>
            {locationSuggestions.cities.map((suggestion) => (
              <input
                key={`city-${suggestion.label}`}
                type="text"
                className={isDesktop ? 'city-search desktop-input-result' : 'city-search'}
                readOnly
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectSuggestion(suggestion);
                }}
                value={suggestion.label}
              />
            ))}
          </ul>
        )}

        {locationSuggestions.districts.length > 0 && (
          <ul>
            <h2 className="subtitle-search-list">Bairros</h2>
            {locationSuggestions.districts.map((suggestion) => (
              <input
                key={`district-${suggestion.label}`}
                type="text"
                className={isDesktop ? 'district-search desktop-input-result' : 'district-search'}
                readOnly
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectSuggestion(suggestion);
                }}
                value={suggestion.label}
              />
            ))}
          </ul>
        )}
      </>
    );
  };

  if (variant === 'properties') {
    return (
      <PseudoSearchContainer className="properties-variant">
        {/* DESKTOP PROPERTIES FILTER */}
        <div className="properties-desktop-filter">
          <div className="properties-filter-header">
            <span className="properties-filter-title">Filtrar busca</span>
            <button className="properties-clear-btn" onClick={() => setFilters(defaultFilters)}>Limpar filtros</button>
          </div>
          <div className="properties-filter-row">
            {/* Comprar / Alugar (Inline Toggle) */}
            <div className="properties-goal-inline-toggle" style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingRight: '15px', borderRight: '1px solid #eaeaea' }}>
              <label
                onClick={() => handleGoalChange('2')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', position: 'relative', paddingBottom: '4px' }}
              >
                <PiHouseLineLight style={{ fontSize: '20px', color: filters.goal === '2' ? buttonColor || '#FF5317' : '#999' }} />
                <span style={{ color: filters.goal === '2' ? '#111' : '#999', fontWeight: 600, fontSize: '15px' }}>Comprar</span>
                {filters.goal === '2' && <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '2px', backgroundColor: buttonColor || '#FF5317' }} />}
              </label>
              <label
                onClick={() => handleGoalChange('1')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', position: 'relative', paddingBottom: '4px' }}
              >
                <PiKeyLight style={{ fontSize: '20px', color: filters.goal === '1' ? buttonColor || '#FF5317' : '#999' }} />
                <span style={{ color: filters.goal === '1' ? '#111' : '#999', fontWeight: 600, fontSize: '15px' }}>Alugar</span>
                {filters.goal === '1' && <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '2px', backgroundColor: buttonColor || '#FF5317' }} />}
              </label>
            </div>

            {/* Tipo */}
            <div className="custom-dropdown properties-dropdown" ref={typeRef}>
              <div className="custom-dropdown-selection" onClick={() => setIsTypeDropdownVisible((current) => !current)}>
                <span>{selectedType?.label || 'Tipo'}</span>
                <IoIosArrowDown />
              </div>
              {isTypeDropdownVisible && (
                <div className="items-holder">
                  <div className="dropdown-item" onClick={() => handleSelectType('')}>Todos os tipos</div>
                  {availableTypes.map((item) => (
                    <div key={item.value} className="dropdown-item" onClick={() => handleSelectType(String(item.value))}>
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Localização (Cidade/Bairro combinados por enquanto para manter compatibilidade) */}
            <div className="custom-dropdown properties-dropdown location-input-container" ref={locationRef}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
                <input
                  placeholder="Cidade ou Bairro"
                  type="text"
                  value={filters.location}
                  onFocus={() => setShowLocationSuggestions(filters.location.trim().length > 0)}
                  onChange={(event) => handleLocationChange(event.target.value)}
                />
                <IoIosArrowDown />
              </div>
              {renderLocationSuggestions(true)}
            </div>

            {/* Valor */}
            <div className="custom-dropdown properties-dropdown" ref={priceRef}>
              <div className="custom-dropdown-selection" onClick={() => setIsPriceDropdownVisible((current) => !current)}>
                <span>{filters.maxPrice || filters.minPrice ? selectedPriceLabel : 'Valor'}</span>
                <IoIosArrowDown />
              </div>
              {isPriceDropdownVisible && (
                <div className="items-holder">
                  {priceRanges.map((range) => (
                    <div key={`${range.minPrice}-${range.maxPrice}-${range.label}`} className="dropdown-item" onClick={() => handleSelectPriceRange(range)}>
                      {range.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dormitórios */}
            <div className="custom-dropdown properties-dropdown" ref={dormitoriosRef}>
              <div className="custom-dropdown-selection" onClick={() => setIsDormitoriosVisible(!isDormitoriosVisible)}>
                <span>{filters.minRooms ? `${filters.minRooms}+ Dormitórios` : 'Dormitórios'}</span>
                <IoIosArrowDown />
              </div>
              {isDormitoriosVisible && (
                <div className="items-holder">
                  <div className="dropdown-item" onClick={() => { updateFilters({ minRooms: '' }); setIsDormitoriosVisible(false); }}>Qualquer quantidade</div>
                  {[1, 2, 3, 4].map(num => (
                    <div key={`dorm-${num}`} className="dropdown-item" onClick={() => { updateFilters({ minRooms: String(num) }); setIsDormitoriosVisible(false); }}>
                      {num}+ {num === 1 ? 'Quarto' : 'Quartos'}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mais Filtros */}
            <div className="custom-dropdown properties-dropdown mais-filtros-container" ref={maisFiltrosRef}>
              <div className="custom-dropdown-selection" onClick={() => setIsMaisFiltrosVisible(!isMaisFiltrosVisible)}>
                <span>Mais filtros</span>
                <IoIosArrowDown />
              </div>
              {isMaisFiltrosVisible && (
                <div className="items-holder mais-filtros-dropdown" style={{ width: '280px', padding: '15px', right: 0, left: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="filter-section">
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#666', marginBottom: '10px' }}>Suítes</label>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      {[1, 2, 3, 4].map(num => (
                        <label key={`suite-${num}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={filters.minSuites === String(num)} onChange={() => updateFilters({ minSuites: filters.minSuites === String(num) ? '' : String(num) })} /> {num === 4 ? 'Acima de 3' : num}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="filter-section">
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#666', marginBottom: '10px' }}>Vagas de garagem</label>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      {[1, 2, 3, 4, 5].map(num => (
                        <label key={`vaga-${num}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={filters.minVacancies === String(num)} onChange={() => updateFilters({ minVacancies: filters.minVacancies === String(num) ? '' : String(num) })} /> {num === 5 ? 'Acima de 4' : num}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filtrar Button */}
            <button className="properties-submit-btn" onClick={() => executeSearch()} style={{ backgroundColor: buttonColor || 'var(--brand-color, #FF5317)', color: buttonTextColor, minWidth: '120px' }}>
              <BiSearch size={18} />
              Buscar
            </button>
          </div>
        </div>

        {/* MOBILE PROPERTIES FILTER */}
        <div className="properties-mobile-filter">
          <button className="properties-mobile-open-btn" onClick={() => setIsMobileModalOpen(true)} style={{ color: buttonColor, borderColor: buttonColor }}>
            Filtrar busca
          </button>
          
          {isMobileModalOpen && (
            <div className="properties-mobile-modal">
              <div className="modal-header">
                <span className="modal-title">Filtros</span>
                <IoCloseOutline className="modal-close" onClick={() => setIsMobileModalOpen(false)} />
              </div>
              
              <div className="modal-body">
                <div className="modal-field">
                  <label>Comprar ou Alugar?</label>
                  <div className="goal-toggle">
                    <button className={filters.goal === '2' ? 'active' : ''} onClick={() => handleGoalChange('2')} style={filters.goal === '2' ? { backgroundColor: buttonColor, color: buttonTextColor } : {}}>Comprar</button>
                    <button className={filters.goal === '1' ? 'active' : ''} onClick={() => handleGoalChange('1')} style={filters.goal === '1' ? { backgroundColor: buttonColor, color: buttonTextColor } : {}}>Alugar</button>
                  </div>
                </div>

                <div className="modal-field">
                  <label>Tipo do Imóvel</label>
                  <select value={filters.typeProperty} onChange={(e) => handleSelectType(e.target.value)}>
                    <option value="">Todos os tipos</option>
                    {availableTypes.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>

                <div className="modal-field">
                  <label>Localização (Cidade/Bairro)</label>
                  <input
                    placeholder="Digite a localização"
                    type="text"
                    value={filters.location}
                    onChange={(event) => handleLocationChange(event.target.value)}
                  />
                  {/* Para mobile simplificado, deixaremos a busca nativa via API lidar com o texto */}
                </div>

                <div className="modal-field">
                  <label>Valor</label>
                  <select onChange={(e) => {
                    const range = priceRanges.find(r => r.label === e.target.value);
                    if (range) handleSelectPriceRange(range);
                  }}>
                    <option value="">Selecione o valor</option>
                    {priceRanges.map((range) => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>
                </div>

                <div className="modal-field">
                  <label>Dormitórios</label>
                  <select value={filters.minRooms} onChange={(e) => updateFilters({ minRooms: e.target.value })}>
                    <option value="">Qualquer quantidade</option>
                    <option value="1">1+ Quarto</option>
                    <option value="2">2+ Quartos</option>
                    <option value="3">3+ Quartos</option>
                    <option value="4">4+ Quartos</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="clear-btn" onClick={() => setFilters(defaultFilters)}>Limpar filtros</button>
                <button className="submit-btn" onClick={() => { setIsMobileModalOpen(false); executeSearch(); }} style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
                  Mostrar Resultados
                </button>
              </div>
            </div>
          )}
        </div>
      </PseudoSearchContainer>
    );
  }

  return (
    <PseudoSearchContainer>
      <div className="search-box-main">
        <div className="search-block" style={{ flex: '1', paddingLeft: '10px' }}>
          <div className="goal-inline-tabs" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label
              className={filters.goal === '2' ? 'active' : ''}
              onClick={() => handleGoalChange('2')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative', paddingBottom: '4px' }}
            >
              <PiHouseLineLight style={{ fontSize: '20px', color: filters.goal === '2' ? 'var(--brand-color, #FF5317)' : '#999' }} />
              <span style={{ color: filters.goal === '2' ? '#111' : '#999', fontWeight: 600, fontSize: '15px' }}>Comprar</span>
              {filters.goal === '2' && <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--brand-color, #FF5317)' }} />}
            </label>
            <label
              className={filters.goal === '1' ? 'active' : ''}
              onClick={() => handleGoalChange('1')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative', paddingBottom: '4px' }}
            >
              <PiKeyLight style={{ fontSize: '20px', color: filters.goal === '1' ? 'var(--brand-color, #FF5317)' : '#999' }} />
              <span style={{ color: filters.goal === '1' ? '#111' : '#999', fontWeight: 600, fontSize: '15px' }}>Alugar</span>
              {filters.goal === '1' && <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--brand-color, #FF5317)' }} />}
            </label>
          </div>
        </div>

        <div className="ps-divider" />
        <div className="search-block" style={{ flex: '1.2' }}>
          <div className="custom-dropdown" ref={typeRef}>
            <div
              className="custom-dropdown-selection"
              onClick={() => setIsTypeDropdownVisible((current) => !current)}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PiBuildingsLight style={{ fontSize: '20px', color: '#999' }} />
                <span style={{ color: filters.typeProperty ? '#111' : '#666', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedType?.label || 'Tipo do imóvel'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {filters.typeProperty && (
                  <IoCloseOutline
                    onClick={(event) => {
                      event.stopPropagation();
                      updateFilters({ typeProperty: '' });
                    }}
                    style={{ cursor: 'pointer', fontSize: '16px' }}
                  />
                )}
                <IoIosArrowDown style={{ fontSize: '14px', color: '#666' }} />
              </div>
            </div>
            {isTypeDropdownVisible && (
              <div className="items-holder">
                {loadingOptions ? (
                  <div className="dropdown-item">Carregando tipos...</div>
                ) : (
                  availableTypes.map((item) => (
                    <div key={item.value} className="dropdown-item" onClick={() => handleSelectType(String(item.value))}>
                      {item.label}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ps-divider" />
        <div className="search-block" style={{ flex: '1.5' }} ref={locationRef}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <PiMapPinLight style={{ fontSize: '20px', color: '#999' }} />
            <input
              placeholder="Localização"
              type="text"
              className="block-input"
              value={filters.location}
              onFocus={() => setShowLocationSuggestions(filters.location.trim().length > 0)}
              onChange={(event) => handleLocationChange(event.target.value)}
              style={{ flex: 1, fontSize: '15px', color: '#666' }}
            />
            <IoIosArrowDown style={{ fontSize: '14px', color: '#666' }} />
          </div>
        </div>

        <div className="ps-divider" />
        <div className="search-block" style={{ flex: '1.2' }}>
          <div className="custom-dropdown" ref={priceRef}>
            <div
              className="custom-dropdown-selection"
              onClick={() => setIsPriceDropdownVisible((current) => !current)}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #999', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PiCurrencyDollarLight style={{ fontSize: '14px', color: '#999' }} />
                </div>
                <span style={{ flex: 1, fontSize: '15px', color: filters.maxPrice || filters.minPrice ? '#111' : '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedPriceLabel}
                </span>
              </div>
              <IoIosArrowDown style={{ fontSize: '14px', color: '#666' }} />
            </div>
            {isPriceDropdownVisible && (
              <div className="items-holder">
                {priceRanges.map((range) => (
                  <div key={`${range.minPrice}-${range.maxPrice}-${range.label}`} className="dropdown-item" onClick={() => handleSelectPriceRange(range)}>
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ps-divider" />
        <div className="search-block" style={{ flex: '1' }}>
          <div className="custom-dropdown" ref={maisFiltrosRef}>
            <div
              className="custom-dropdown-selection"
              onClick={() => setIsMaisFiltrosVisible(!isMaisFiltrosVisible)}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span style={{ flex: 1, fontSize: '15px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Mais filtros
                </span>
              </div>
              <IoIosArrowDown style={{ fontSize: '14px', color: '#666' }} />
            </div>
            {isMaisFiltrosVisible && (
              <div className="items-holder mais-filtros-dropdown" style={{ width: '280px', padding: '15px', right: 0, left: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div className="filter-section">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#666', marginBottom: '10px' }}>Suítes</label>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4].map(num => (
                      <label key={`home-suite-${num}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={filters.minSuites === String(num)} onChange={() => updateFilters({ minSuites: filters.minSuites === String(num) ? '' : String(num) })} /> {num === 4 ? 'Acima de 3' : num}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="filter-section">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#666', marginBottom: '10px' }}>Vagas de garagem</label>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5].map(num => (
                      <label key={`home-vaga-${num}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={filters.minVacancies === String(num)} onChange={() => updateFilters({ minVacancies: filters.minVacancies === String(num) ? '' : String(num) })} /> {num === 5 ? 'Acima de 4' : num}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="search-btn-dark" onClick={() => executeSearch()} style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
          Buscar
        </button>
      </div>

      <div className="popular-tags">
        {quickFilters.map((quickFilter) => (
          <div
            key={quickFilter.key}
            className="tag-pill"
            onClick={() => handleQuickFilter(quickFilter)}
            style={quickFilter.isActive(filters) ? { background: '#ffffff', borderColor: '#111', color: '#111' } : undefined}
          >
            {quickFilter.label}
          </div>
        ))}
      </div>

      <div className="result-list-wrapper-desktop">
        {renderLocationSuggestions(true)}
      </div>
    </PseudoSearchContainer>
  );
};

export default PseudoSearch;
