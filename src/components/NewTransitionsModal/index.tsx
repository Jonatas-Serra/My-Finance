import { FormEvent, useState } from 'react';
import Modal from "react-modal";
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from "../../assets/Receita.svg";
import outcomeImg from "../../assets/Despesa.svg";

interface NewTransitionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransitionModal ({ isOpen, onRequestClose} : NewTransitionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransition(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    onRequestClose();

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
  }  

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransition}>
        <h2>Cadastrar Transação</h2>
        <input 
        placeholder="Título" 
        value={title}
        onChange={event => setTitle(event.target.value)}
        />
        <input 
          type="number"
          step="any"
          min={0}
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          />
        <TransactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'}
            className={type === 'deposit' ? 'deposit' : ''}
            >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}
            className={type === 'withdraw' ? 'withdraw' : ''}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input 
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
          />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>

  )
}