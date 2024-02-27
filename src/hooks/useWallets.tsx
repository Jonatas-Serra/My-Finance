import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useUser } from './User';
import { useTransactions } from './useTransactions';

interface Wallet {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  balance: number;
  initialBalance: number;
  currency?: string;
}

type WalletInput = Omit<Wallet, '_id' | 'createdAt' | 'balance' | 'currency'>;

type WalletEdit = {
  _id: string;
  name: string;
};

interface WalletsProviderProps {
  children: React.ReactNode;
}

interface WalletsContextData {
  wallets: Wallet[];
  selectedWallet: Wallet;
  loading: boolean;
  createWallet: (wallet: WalletInput) => Promise<void>;
  handleEditWallet: (wallet: WalletEdit) => void; // Alterada para esperar um WalletEdit
  handleDeleteWallet: (id: string) => void;
  handleSelectWallet: (wallet: Wallet) => void;
  getWallets: () => Promise<void>;
}

const WalletsContext = createContext<WalletsContextData>(
  {} as WalletsContextData
)

export function WalletsProvider({ children }: WalletsProviderProps) {
  const { user } = useUser();
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({} as Wallet)
  const [loading, setLoading] = useState(true);

  const { getTransactions } = useTransactions();

  const token = localStorage.getItem('@Myfinance:token');

  const getWallets = async () => {
    try {
      const response = await api.get(`/wallets/user/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWallets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter carteiras:', error);
      setLoading(false); 
    }
  }

  useEffect(() => {
    if (token) { 
      getWallets();
    }
  }, [token]);

  const createWallet = async (wallet: WalletInput) => {
    try {
      const response = await api.post('/wallets', wallet, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWallets([...wallets, response.data]);
    } catch (error) {
      console.error('Erro ao criar carteira:', error);
    }
  }

  const handleEditWallet = async (wallet: WalletEdit) => {
    try {
      const updatedWallet = wallets.find(w => w._id === wallet._id);
      if (!updatedWallet) {
        return;
      }
      updatedWallet.name = wallet.name;
      
      await api.patch(`/wallets/${wallet._id}`, updatedWallet, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWallets(wallets.map(w => w._id === wallet._id ? updatedWallet : w));
    } catch (error) {
      console.error('Erro ao editar carteira:', error);
    }
  }
  
  const handleDeleteWallet = async (id: string) => {
    try {
      await api.delete(`/wallets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWallets(wallets.filter(wallet => wallet._id !== id));
      getTransactions();
    } catch (error) {
      console.error('Erro ao deletar carteira:', error);
    }
  }

  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  }

  return (
    <WalletsContext.Provider value={{ wallets, selectedWallet, loading, createWallet, handleEditWallet, handleDeleteWallet, handleSelectWallet, getWallets }}>
      {children}
    </WalletsContext.Provider>
  )
}

export function useWallets() {
  const context = useContext(WalletsContext);
  if (!context) {
    throw new Error('useWallets must be used within a WalletsProvider');
  }
  return context;
}
