import Modal from "react-modal";
import { Container, ContentModalDelete } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

import deleteImg from '../../assets/delete-icon.svg';
import editImg from '../../assets/pencil-icon.svg';
import { useState } from "react";

import { EditTransitionModal } from "../EditTransactionModal";

interface Transaction {
  _id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

export function TransactionsTable () {
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { transactions } = useTransactions();
  const [selectedTransaction, setSelectedTransaction] = useState({} as Transaction);

  const { handleDeleteTransaction } = useTransactions();
    
  return (
    <>
      <EditTransitionModal
        isOpen={isOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
        selectedTransaction={selectedTransaction}
      />
      <Modal
        isOpen={isOpenDel}
        onRequestClose={() => setIsOpenDel(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir Transação?</h2>
          <img src={deleteImg} alt="lixeira" />
          <p>Tem certeza que deseja excluir
            <strong> {selectedTransaction.title}</strong> ?
          </p>
          <div>
            <button
              type="button"
              onClick={() => {
                handleDeleteTransaction(selectedTransaction._id)
                setIsOpenDel(false)
              }}
            >Sim</button>
            <button
              type="button"
              onClick={() => setIsOpenDel(false)}
              className="cancel"
            >
                Não
            </button>
          </div>
        </ContentModalDelete>
      </Modal>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === 'withdraw' && '- '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td className="actions">
                <button 
                  type="button"
                  onClick={() => {
                    setIsOpenEdit(true)
                    setSelectedTransaction(transaction)
                  }}
                
                >
                  <img 
                  src={editImg} 
                  alt="Editar transação"
                  />
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setIsOpenDel(true)
                    setSelectedTransaction(transaction)
                  }}
                >
                <img 
                src={deleteImg} 
                alt="Deletar transação"           
                />
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  )
}