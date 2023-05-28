import { useState } from "react";
import Modal from "react-modal";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransitionModal } from "./components/NewTransitionsModal";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root');


function App() {
  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setNewTransactionModalOpen(false);
  }
  
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransitionModal 
        isOpen={newTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        />      
      <GlobalStyle />
    </>
  )
}

export default App
