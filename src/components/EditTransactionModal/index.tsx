import { FormEvent, useEffect, useState } from 'react';
import Modal from "react-modal";
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from "../../assets/Receita.svg";
import outcomeImg from "../../assets/Despesa.svg";

interface Transaction {
  _id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface EditTransitionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedTransaction: Transaction;
}

export function EditTransitionModal ({ isOpen, onRequestClose, selectedTransaction} : EditTransitionModalProps) {
  const { handleEditTransaction } = useTransactions();

  const [title, setTitle] = useState(selectedTransaction.title);
  const [amount, setAmount] = useState(selectedTransaction.amount);
  const [category, setCategory] = useState(selectedTransaction.category);
  const [type, setType] = useState(selectedTransaction.type);

  useEffect(() => {
    setTitle(selectedTransaction.title);
    setAmount(selectedTransaction.amount);
    setCategory(selectedTransaction.category);
    setType(selectedTransaction.type);
  }, [selectedTransaction])


  async function handleEditTransition(event: FormEvent) {
    event.preventDefault();

    await handleEditTransaction({
      _id: selectedTransaction._id,
      title,
      amount,
      category,
      type,
      createdAt: selectedTransaction.createdAt
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

      <Container onSubmit={handleEditTransition}>
        <h2>Editar Transação</h2>
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
        <div className='formaction'>
          <button
            type="button"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button 
            type="submit"
          >
            Salvar
          </button>
        </div>
      </Container>
    </Modal>
  )

}
