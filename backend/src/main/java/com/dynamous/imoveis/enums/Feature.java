package com.dynamous.imoveis.enums;

import java.io.Serializable;
import java.util.stream.Collectors;

import com.dynamous.imoveis.dto.FeatureDTO;

public enum Feature implements Serializable{
	

		ADMINISTRACAO(1,"Administração"),
		SISTEMADEALARME(2,"Sistema de alarme"),
		GUARITABLINDADA(3,"Guarita blindada"),
		QUINTAL(4,"Quintal"),
		VARANDA(5,"Varanda"),
		BANHEIRA(6,"Banheira"),
		BAR(7,"Bar"),
		CHURRASQUEIRANAVARANDA(8,"Churrasqueira na varanda"),
		CHURRASQUEIRA(9,"Churrasqueira"),
		ESPACODEBELEZA(10,"Espaço de beleza"),
		BICICLETARIO(11,"Bicicletário"),
		ARMARIOEMBUTIDO(12,"Armário embutido"),
		ZELADOR(13,"Zelador"),
		TVACABO(14,"TV a cabo"),
		PERTODEHOSPITAIS(15,"Perto de hospitais"),
		PERTODEVIASDEACESSO(16,"Perto de vias de acesso"),
		PERTODETRANSPORTEPUBLICO(17,"Perto de transporte público"),
		PERTODEESCOLAS(18,"Perto de Escolas"),
		PERTODESHOPPINGCENTER(19,"Perto de Shopping Center"),
		CLOSET(20,"Closet"),
		VIGIA(21,"Vigia"),
		ARCONDICIONADO(22,"Ar condicionado"),
		COPA(23,"Copa"),
		FECHADURADIGITAL(24,"Fechadura digital"),
		SALADEJANTAR(25,"Sala de jantar"),
		CONDOMINIOSUSTENTAVEL(26,"Condomínio sustentável"),
		COLETASELETIVADELIXO(27,"Coleta seletiva de lixo"),
		EDICULA(28,"Edícula"),
		CARREGADORELETRONICOPARACARROEBICICLETA(29,"Carregador eletrônico para carro e bicicleta"),
		ELEVADOR(30,"Elevador"),
		VISTAEXTERIOR(31,"Vista exterior"),
		CONDOMINIODECHADO(32,"Condomínio fechado"),
		LAREIRA(33,"Lareira"),
		ESPACOFITNESS(34,"Espaço fitness"),
		CABEAMENTOESTRUTURADO(35,"Cabeamento estruturado"),
		MOBILIADO(36,"Mobiliado"),
		SALAODEJOGOS(37,"Salão de jogos"),
		JARDIM(38,"Jardim"),
		GEMINADA(39,"Geminada"),
		GERADORELETRICO(40,"Gerador elétrico"),
		ESPACOGOURMET(41,"Espaço gourmet"),
		VARANDAGOURMET(42,"Varanda gourmet"),
		COZINHAGOURMET(43,"Cozinha Gourmet"),
		CASCALHO(44,"Cascalho"),
		ESPACOVERDEPARQUE(45,"Espaço verde / Parque"),
		ACADEMIA(46,"Academia"),
		AQUECIMENTO(47,"Aquecimento"),
		ESCRITORIO(48,"Escritório"),
		QUADRADEFUTEBOL(49,"Quadra de futebol"),
		AMBIENTESINTEGRADOS(50,"Ambientes integrados"),
		INTERFONE(51,"Interfone"),
		CONEXAOAINTERNET(52,"Conexão à internet"),
		PISTADECOOPER(53,"Pista de cooper"),
		COZINHA(54,"Cozinha"),
		ARMARIODECOZINHA(55,"Armário na cozinha"),
		VISTAPARALAGO(56,"Vista para lago"),
		LAVANDERIA(57,"Lavanderia"),
		GRAMADO(58,"Gramado"),
		SALADEALMOCO(59,"Sala de almoço"),
		AREADESERVICO(60,"Área de serviço"),
		SALADEMASSAGEM(61,"Sala de massagem"),
		CINEMA(62,"Cinema"),
		SALADEREUNIAO(63,"Sala de reunião"),
		MEZANINO(64,"Mezanino"),
		VISTAPARAAMONTANHA(65,"Vista para a montanha"),
		MAISDEUMANDAR(66,"Mais de um andar"),
		VISTAPARAOMAR(67,"Vista para o mar"),
		GARAGEM(68,"Garagem"),
		SALAODEFESTAS(69,"Salão de Festas"),
		RONDAVIGILANCIA(70,"Ronda/Vigilância"),
		PERMITEANIMAIS(71,"Permite animais"),
		ESPACOPET(72,"Espaço Pet"),
		PLAYGROUND(73,"Playground"),
		PISCINA(74,"Piscina"),
		RECEPCAO(75,"Recepção"),
		AREADELAZER(76,"Área de lazer"),
		ESPELHOSDAGUA(77,"Espelhos d'água"),
		QUADRADEAREIA(78,"Quadra de areia"),
		SAUNA(79,"Sauna"),
		SEGURANCA24H(80,"Segurança 24h"),
		PISCINASEMIOLIMPICA(81,"Piscina semi-olímpica"),
		APARTAMENTOINTELIGENTE(82,"Apartamento inteligente"),
		CONDOMINIOINTELIGENTE(83,"Condomínio inteligente"),
		ENERGIASOLAR(84,"Energia solar"),
		SPA(85,"Spa"),
		QUADRAPOLIESPORTIVA(86,"Quadra poliesportiva"),
		PRACA(87,"Praça"),
		QUADRADESQUASH(88,"Quadra de squash"),
		ESCADA(89,"Escada"),
		LOJA(90,"Loja"),
		QUADRADETENIS(91,"Quadra de tênis"),
		CIRCUITODESEGURANCA(92,"Circuito de segurança"),
		DEPOSITO(93,"Depósito"),
		RESERVATORIODEAGUA(94,"Reservatório de água"),
		COZINHAAMERICANA(95,"Cozinha americana"),
		ANDARINTEIRO(96,"Andar inteiro"),
		AQUARIO(97,"Aquário"),
		ARMARIOEMBUTIDONOQUARTO(98,"Armário embutido no quarto"),
		ARMARIONOBANHEIRO(99,"Armário no banheiro"),
		BANHEIRODESERVICO(100,"Banheiro de serviço"),
		BOXBLINDEX(101,"Box blindex"),
		CAPETE(102,"Capete"),
		CASADEFUNDO(103,"Casa de fundo"),
		CHUVEIROAGAS(104,"Chuveiro a gás"),
		CIMENTOQUEIMADO(105,"Cimento queimado"),
		DESPENSA(106,"Despensa"),
		FOGAO(107,"Fogão"),
		FORNODEPIZZA(108,"Forno de pizza"),
		FREEZER(109,"Freezer"),
		GESSOSANCATETOREBAIXADO(110,"Gesso - Sanca - Teto Rebaixado"),
		HIDROMASSAGEM(111,"Hidromassagem"),
		IMOVELDEESQUINA(112,"Imóvel de esquina"),
		ISOLAMENTOACUSTICO(113,"Isolamento acústico"),
		LAJE(114,"Laje"),
		LAVABO(115,"Lavabo"),
		MEIOANDAR(116,"Meio andar"),
		MOVELPLANEJADO(117,"Móvel planejado"),
		MURODEVIDRO(118,"Muro de vidro"),
		MUROEGRADE(119,"Muro e grade"),
		PEDIREITOALTO(120,"Pé direito alto"),
		PISCINAPRIVATIVA(121,"Piscina privativa"),
		PISODEMADEIRA(122,"Piso de madeira"),
		PISOLAMINADO(123,"Piso laminado"),
		PISOVINILICO(124,"Piso vinílico"),
		PORCELANATO(125,"Porcelanato"),
		COWORKING(126,"Coworking"),
		PORTAOELETRONICO(127,"Portão eletrônico"),
		BIBLIOTECA(128,"Biblioteca"),
		CAMERADESEGURANCA(129,"Câmera de segurança"),
		CANIL(130,"Canil"),
		COBERTURACOLETIVA(131,"Cobertura coletiva"),
		DECK(132,"Deck"),
		HORTA(133,"Horta"),
		LAGO(134,"Lago"),
		RESTAURANTE(135,"Restaurante"),
		RIO(136,"Rio"),
		SALAODECONVENCAO(137,"Salão de convenção"),
		PISCINAAQUECIDA(138,"Piscina aquecida"),
		POCOARTESIANO(139,"Poço artesiano"),
		CAMPODEFUTEBOL(140,"Campo de futebol"),
		CAMPODEGOLFE(141,"Campo de golfe"),
		HELIPONTO(142,"Heliponto"),
		PISCINAINFANTIL(143,"Piscina infantil"),
		PORTARIA24H(144,"Portaria 24h");
	
		
					
        private int cod;
        private String description;

        Feature(int cod, String description) {
        this.cod = cod;
        this.description = description;
    }

    public int getCod() {
        return cod;
    }

    public void setCod(int cod) {
        this.cod = cod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
  

    public static Feature toEnum(Integer cod) {
        if (cod == null) {
            return null;
        }
        for (Feature x : Feature.values()) {
            if (cod.equals(x.getCod())) {           
                return x;
            }
        }
            throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Tipo invalido"+ cod);
        }
    

}
