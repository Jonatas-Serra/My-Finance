import { FormEvent, useState } from 'react';
import Modal from "react-modal";
import { useWallets } from '../../hooks/useWallets';
import { useUser } from '../../hooks/User';
import { useAccounts } from '../../hooks/useAccounts';

import { Container } from './styles';

import closeImg from '../../assets/close.svg';

interface NewAccountModalProps {
  typeOfAccount: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewAccountModal ({ typeOfAccount, isOpen, onRequestClose} : NewAccountModalProps) {
  const { user } = useUser();
  const { wallets } = useWallets();

  const [type, setType] = useState(typeOfAccount);
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const issueDate = new Date().toISOString();
  const [documentNumber, setDocumentNumber] = useState('');
  const [category, setCategory] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [payeeOrPayer, setPayeeOrPayer] = useState('');
  const isPaid = false;
  const repeatInterval = 1;
  const [repeat, setRepeat] = useState(0);
  const [customRepeat, setCustomRepeat] = useState('');
  const [walletId, setWalletId] = useState('');
  const createdBy = user._id;
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { createAccount } = useAccounts();

  async function handleCreateNewAccount(event: FormEvent) {
    event.preventDefault();

    setBtnDisabled(true);
    const repeatValue = customRepeat ? parseInt(customRepeat, 10) : repeat;

    await createAccount({
      type,
      value,
      dueDate,
      issueDate,
      documentNumber,
      category,
      documentType,
      description,
      payeeOrPayer,
      repeat: repeatValue,
      repeatInterval,
      createdBy,
      walletId,
      isPaid
    });

    onRequestClose();
    handleClear();
  }

  const handleClear = () => {
    setType(typeOfAccount);
    setValue(0);
    setDueDate('');
    setDocumentNumber('');
    setCategory('');
    setDocumentType('');
    setDescription('');
    setPayeeOrPayer('');
    setRepeat(0);
    setCustomRepeat('');
    setWalletId('');
  }

  const handleRepeatChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (event.target.tagName === 'SELECT' && inputValue !== 'Outra') {
      setRepeat(Number(inputValue));
      setCustomRepeat('');
    } else if (event.target.tagName === 'INPUT') {
      if (/^\d*$/.test(inputValue)) {
        setCustomRepeat(inputValue);
        const numericValue = Number(inputValue);
        if (numericValue > 0) {
          setTimeout(() => {
            setRepeat(numericValue);
          }, 500);
        }
      }
    } else {
      setCustomRepeat('');
      setRepeat(13); // This will allow us to show the input field
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => {
          onRequestClose();
          handleClear();
        }}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewAccount}>
        <h2>Nova Conta {typeOfAccount === 'receivable' ? 'a receber': 'a pagar' }</h2>
        <input
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <div className='flex'>
          <input 
            type="text"
            placeholder="Valor"
            value={value === 0 ? '' : new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value)}
            onChange={event => {
              const newValue = event.target.value;
              setTimeout(() => {
                setValue(Number(newValue.replace(/\D/g, '')) / 100);
              } , 1);
            }}
          />
          <input
            type="date"
            placeholder="Data de Vencimento"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
          />
        </div>
        <div className='flex'>
          <input
            type="text"
            placeholder="Número do Documento"
            value={documentNumber}
            onChange={event => setDocumentNumber(event.target.value)}
          />
          <select
          placeholder="Tipo de Documento"
          value={documentType}
          onChange={event => setDocumentType(event.target.value)}
          >
            <option value="" disabled>Selecione o tipo de documento</option>
            <option value="boleto">Boleto</option>
            <option value="pix">Pix</option>
          </select>

        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
          <select
            placeholder='Selecione a carteira'
            value={walletId}
            onChange={event => setWalletId(event.target.value)}
          >
            <option value="" disabled>Selecione uma carteira</option>
            {wallets.map(wallet => (
              <option key={wallet._id} value={wallet._id}>{wallet.name}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder={typeOfAccount === 'receivable' ? 'Pagador' : 'Beneficiário'}
          value={payeeOrPayer}
          onChange={event => setPayeeOrPayer(event.target.value)}
        />
        <div className="flex">
          <h5>Essa conta irá se repetir?</h5>
          <input
            className='checkbox'
            type="checkbox"
            onChange={event => setRepeat(event.target.checked ? 1 : 0)}
          />
        </div>
        {repeat > 0 && (
          <select
            value={repeat > 0 && repeat <= 12 ? repeat : 'Outra'}
            onChange={handleRepeatChange}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} parcela(s)</option>
            ))}
            <option value="Outra">{customRepeat === '' ? 'Outra' : `${customRepeat} parcela(s)`}</option>
          </select>
        )}
        {repeat === 13 && (
          <input
            type="number"
            min={1}
            value={customRepeat}
            onChange={handleRepeatChange}
            placeholder="Digite a quantidade de parcelas"
          />
        )}
        <button
          disabled={btnDisabled}
          type="submit"
        >
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
