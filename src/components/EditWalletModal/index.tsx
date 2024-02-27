import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useWallets } from "../../hooks/useWallets";

import closeImg from '../../assets/close.svg';

interface Wallet {
  _id: string;
  name: string;
  amount: number;
  createdAt?: string;
  createdBy?: string;
}

interface WalletEdit {
  _id: string;
  name: string;
  amount?: number;
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

  const [name, setName] = useState(selectedWallet.name);
  const [amount, setAmount] = useState(selectedWallet.amount);

  useEffect(() => {
    setName(selectedWallet.name);
    setAmount(selectedWallet.amount);
  }, [selectedWallet])

  async function handleEdit(event: FormEvent) {
    event.preventDefault();

    const wallet: WalletEdit = {
      _id: selectedWallet._id,
      name
    }

    handleEditWallet(wallet);
  
    onRequestClose();
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

      <h2>Editar Carteira</h2>

      <form onSubmit={handleEdit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Saldo"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <button type="submit">Salvar</button>
      </form>
    </Modal>
  );
}
