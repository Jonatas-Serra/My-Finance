import { FormEvent, useState } from 'react';
import Modal from "react-modal";
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import incomeImg from "../../assets/Receita.svg";
import outcomeImg from "../../assets/Despesa.svg";
import api from '../../services/api';

interface NewTransitionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransitionModal ({ isOpen, onRequestClose} : NewTransitionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  function handleCreateNewTransition(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type

    }    

    api.post('/transactions', data)    
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
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
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