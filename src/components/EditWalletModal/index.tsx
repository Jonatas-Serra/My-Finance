import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useWallets } from "../../hooks/useWallets";
import { useToast } from '../../hooks/Toast';

import { Container } from './styles';

import closeImg from '../../assets/close.svg';

interface Wallet {
  _id: string;
  name: string;
  createdAt?: string;
  createdBy?: string;
}

interface WalletEdit {
  _id: string;
  name: string;
  createdAt?: string;
  createdBy?: string;
  initialBalance?: number;
  balance?: number;
}


interface EditWalletModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedWallet: Wallet;
}

export function EditWalletModal({ isOpen, onRequestClose, selectedWallet }: EditWalletModalProps) {
  const { handleEditWallet } = useWallets();
  const { addToast } = useToast();

  const [name, setName] = useState(selectedWallet.name);

  useEffect(() => {
    setName(selectedWallet.name);
  }, [selectedWallet])

  async function handleEdit(event: FormEvent) {
    event.preventDefault();

    const wallet: WalletEdit = {
      _id: selectedWallet._id,
      name
    }

    handleEditWallet(wallet);
  
    onRequestClose();

    addToast({
      type: 'success',
      title: 'Carteira editada com sucesso!',
      description: `A carteira ${name} foi editada com sucesso.`
    });
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
      <Container onSubmit={handleEdit}>
        <h2>Editar Carteira</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit">Salvar</button>
      </Container>
    </Modal>
  );
}
