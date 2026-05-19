import { FormEvent, KeyboardEvent, useState } from 'react';
import { ActionsRow, Field, FormSection, Grid, MiniButton, PrimaryButton, TagList, TipologiaCard } from './styles';
import { BriefingData, Tipologia } from '../storage';

interface Props {
  briefing: BriefingData;
  onChange: (next: BriefingData) => void;
  onNext: () => void;
}

const Passo1Briefing = ({ briefing, onChange, onNext }: Props) => {
  const [tagInput, setTagInput] = useState('');

  const setField = (field: keyof BriefingData, value: BriefingData[keyof BriefingData]) => {
    onChange({ ...briefing, [field]: value });
  };

  const addTipologia = () => {
    if (briefing.tipologias.length >= 4) return;
    const next: Tipologia = { id: `${Date.now()}`, nome: '', area: '', quartos: '', vagas: '', preco: '' };
    setField('tipologias', [...briefing.tipologias, next]);
  };

  const updateTipologia = (id: string, field: keyof Tipologia, value: Tipologia[keyof Tipologia]) => {
    const next = briefing.tipologias.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setField('tipologias', next);
  };

  const removeTipologia = (id: string) => {
    setField(
      'tipologias',
      briefing.tipologias.filter((item) => item.id !== id)
    );
  };

  const addDiferencial = () => {
    const value = tagInput.trim();
    if (!value || briefing.diferenciais.length >= 6) return;
    if (briefing.diferenciais.includes(value)) return;
    setField('diferenciais', [...briefing.diferenciais, value]);
    setTagInput('');
  };

  const onTagKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addDiferencial();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const requiredOk =
      briefing.nomeEmpreendimento &&
      briefing.cidade &&
      briefing.bairro &&
      briefing.segmento &&
      briefing.fase &&
      briefing.whatsappResponsavel &&
      briefing.tipologias.length > 0;
    if (!requiredOk) {
      alert('Preencha os campos obrigatorios e adicione ao menos 1 tipologia.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection>
        <h3>Secao A — Identificacao</h3>
        <Grid>
          <Field>
            Nome do empreendimento *
            <input value={briefing.nomeEmpreendimento} onChange={(e) => setField('nomeEmpreendimento', e.target.value)} />
          </Field>
          <Field>
            Cidade *
            <input value={briefing.cidade} onChange={(e) => setField('cidade', e.target.value)} />
          </Field>
          <Field>
            Bairro *
            <input value={briefing.bairro} onChange={(e) => setField('bairro', e.target.value)} />
          </Field>
          <Field>
            Endereco completo
            <input value={briefing.enderecoCompleto} onChange={(e) => setField('enderecoCompleto', e.target.value)} />
          </Field>
        </Grid>
      </FormSection>

      <FormSection>
        <h3>Secao B — Produto</h3>
        <Grid>
          <Field>
            Segmento *
            <select value={briefing.segmento} onChange={(e) => setField('segmento', e.target.value)}>
              <option value="">Selecione</option>
              <option value="Padrao/MCMV">Padrao/MCMV</option>
              <option value="Medio Padrao">Medio Padrao</option>
              <option value="Alto Padrao">Alto Padrao</option>
            </select>
          </Field>
          <Field>
            Fase *
            <select value={briefing.fase} onChange={(e) => setField('fase', e.target.value)}>
              <option value="">Selecione</option>
              <option value="Pre-lancamento">Pre-lancamento</option>
              <option value="Lancamento">Lancamento</option>
              <option value="Em obras">Em obras</option>
            </select>
          </Field>
          <Field>
            Prazo de entrega
            <input value={briefing.prazoEntrega} onChange={(e) => setField('prazoEntrega', e.target.value)} />
          </Field>
          <Field>
            Formas de pagamento
            <textarea rows={3} value={briefing.formasPagamento} onChange={(e) => setField('formasPagamento', e.target.value)} />
          </Field>
        </Grid>

        <h3 style={{ marginTop: '12px' }}>Tipologias (min. 1, max. 4)</h3>
        {briefing.tipologias.map((tipologia) => (
          <TipologiaCard key={tipologia.id}>
            <Grid>
              <Field>
                Nome *
                <input value={tipologia.nome} onChange={(e) => updateTipologia(tipologia.id, 'nome', e.target.value)} />
              </Field>
              <Field>
                Area (m2) *
                <input
                  type="number"
                  value={tipologia.area}
                  onChange={(e) => updateTipologia(tipologia.id, 'area', Number(e.target.value))}
                />
              </Field>
              <Field>
                Quartos *
                <input
                  type="number"
                  value={tipologia.quartos}
                  onChange={(e) => updateTipologia(tipologia.id, 'quartos', Number(e.target.value))}
                />
              </Field>
              <Field>
                Vagas *
                <input
                  type="number"
                  value={tipologia.vagas}
                  onChange={(e) => updateTipologia(tipologia.id, 'vagas', Number(e.target.value))}
                />
              </Field>
              <Field>
                Preco (R$) *
                <input
                  type="number"
                  value={tipologia.preco}
                  onChange={(e) => updateTipologia(tipologia.id, 'preco', Number(e.target.value))}
                />
              </Field>
            </Grid>
            <ActionsRow>
              <MiniButton type="button" onClick={() => removeTipologia(tipologia.id)}>
                Remover tipologia
              </MiniButton>
            </ActionsRow>
          </TipologiaCard>
        ))}

        <MiniButton type="button" onClick={addTipologia}>
          + Adicionar tipologia
        </MiniButton>

        <h3 style={{ marginTop: '12px' }}>Diferenciais (max. 6)</h3>
        <Field>
          Digite e pressione Enter
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={onTagKey} />
        </Field>
        <TagList>
          {briefing.diferenciais.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </TagList>
      </FormSection>

      <FormSection>
        <h3>Secao C — Contato e midia</h3>
        <Grid>
          <Field>
            WhatsApp do responsavel *
            <input
              placeholder="(41) 99999-9999"
              value={briefing.whatsappResponsavel}
              onChange={(e) => setField('whatsappResponsavel', e.target.value)}
            />
          </Field>
          <Field>
            Fotos do empreendimento * (min. 3, max. 10)
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const files = Array.from(e.target.files || []).map((file) => URL.createObjectURL(file));
                setField('fotos', files.slice(0, 10));
              }}
            />
          </Field>
        </Grid>
      </FormSection>

      <ActionsRow>
        <PrimaryButton type="submit">Proximo → Escolher modelo</PrimaryButton>
      </ActionsRow>
    </form>
  );
};

export default Passo1Briefing;
