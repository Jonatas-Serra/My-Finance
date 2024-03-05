import { FormEvent, useState } from 'react';
import Modal from "react-modal";
import { useWallets } from '../../hooks/useWallets';
import { useUser } from '../../hooks/User';
import { useToast } from '../../hooks/Toast';

import { Container } from './styles';

import closeImg from '../../assets/close.svg';

interface TransferModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransferModal({ isOpen, onRequestClose }: TransferModalProps) {
  const { handleTransferWallet, wallets } = useWallets();
  const { user } = useUser();
  const { addToast } = useToast();

  const [sourceWalletId, setSourceWalletId] = useState('');
  const [targetWalletId, setTargetWalletId] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const createdBy = user._id;

  const filterAvailableSourceWallets = (selectedTargetId: string) => {
    return wallets.filter(wallet => wallet._id !== selectedTargetId && wallet._id !== targetWalletId);
  };
  
  const filterAvailableTargetWallets = (selectedSourceId: string) => {
    return wallets.filter(wallet => wallet._id !== selectedSourceId && wallet._id !== sourceWalletId);
  };


  async function handleTransfer(event: FormEvent) {
    event.preventDefault();

    await handleTransferWallet({
      sourceWalletId,
      targetWalletId,
      amount,
      description,
      createdBy,
      date: new Date().toISOString(),
    })

    onRequestClose();
    handleClear();

    addToast({
      type: 'success',
      title: 'Transferência realizada com sucesso!',
      description: `A transferência no valor de ${amount} foi realizada com sucesso.`
    });
  }

  const handleClear = () => {
    setSourceWalletId('');
    setTargetWalletId('');
    setAmount(0);
    setDescription('');
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
        onClick={() => {
          onRequestClose();
          handleClear();
        }}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleTransfer}>
        <h2>Transferir</h2>
        <div className='flex'>
        <select
          placeholder="Selecione a carteira de origem"
          value={sourceWalletId}
          onChange={event => setSourceWalletId(event.target.value)}
        >
          <option className='styledOption' value="" disabled>Selecione a origem</option>
          {filterAvailableSourceWallets(targetWalletId).map(wallet => (
            <option className='styledOption' key={wallet._id} value={wallet._id}>
              {wallet.name}
            </option>
          ))}
        </select>
        <select
          placeholder="Selecione a carteira de destino"
          value={targetWalletId}
          onChange={event => setTargetWalletId(event.target.value)}
        >
          <option className='styledOption' value="" disabled>Selecione o destino</option>
          {filterAvailableTargetWallets(sourceWalletId).map(wallet => (
            <option className='styledOption' key={wallet._id} value={wallet._id}>
              {wallet.name}
            </option>
          ))}
        </select>
        </div>
        <input
          type="text"
          placeholder="Valor"
          value={amount === 0 ? '' : new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(amount)}
          onChange={event => {
            const newValue = event.target.value;
            setTimeout(() => {
              setAmount(Number(newValue.replace(/\D/g, '')) / 100);
            }, 1);
          }}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input
          type="hidden"
          value={createdBy}
          />
        <button type="submit">Transferir</button>
      </Container>
    </Modal>
  )
}
