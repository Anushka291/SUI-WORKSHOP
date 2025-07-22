// File: src/App.js
import React, { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import {
  useSignAndExecuteTransaction,
  ConnectButton,
  useCurrentAccount
} from '@mysten/dapp-kit';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NFTPreview from './components/NFTPreview';
import HistoryList from './components/HistoryList';
import './App.css';

const App = () => {
  const currentAccount = useCurrentAccount();
  const [packageId, setPackageId] = useState('');
  const [loading, setLoading] = useState(false);
  const [mintForm, setMintForm] = useState({
    customerId: '',
    imageUrl: '',
    name: '',
    description: '',
    gas: '10000'
  });
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleMintChange = (e) => {
    setMintForm({ ...mintForm, [e.target.name]: e.target.value });
  };

  const mintLoyalty = async () => {
    if (!currentAccount) {
      alert('Please connect your wallet');
      return;
    }

    try {
      setLoading(true);
      const tx = new Transaction();
      tx.setGasBudget(Number(mintForm.gas));
      tx.moveCall({
        target: `${packageId}::loyalty_card::mint_loyalty`,
        arguments: [
          tx.pure.address(mintForm.customerId),
          tx.pure.string(mintForm.imageUrl)
        ]
      });

      await signAndExecute({ transaction: tx });
      setHistory((prev) => [...prev, mintForm]);
      setMintForm({ customerId: '', imageUrl: '', name: '', description: '', gas: '10000' });
    } catch (err) {
      alert('Minting failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <main>
        <Header onToggleTheme={toggleTheme} />
        <div className="mint-form">
          <ConnectButton />

          <div className="grid-2">
            <div className="input-group">
              <label>Package ID</label>
              <input
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                placeholder="e.g. 0x123..."
              />
            </div>

            <div className="input-group">
              <label>Gas Budget</label>
              <input
                type="number"
                name="gas"
                value={mintForm.gas}
                onChange={handleMintChange}
                placeholder="e.g. 10000"
              />
            </div>

            <div className="input-group">
              <label>Customer Wallet</label>
              <input
                type="text"
                name="customerId"
                value={mintForm.customerId}
                onChange={handleMintChange}
                placeholder="Customer wallet address"
              />
            </div>

            <div className="input-group">
              <label>NFT Name</label>
              <input
                type="text"
                name="name"
                value={mintForm.name}
                onChange={handleMintChange}
                placeholder="Name your NFT"
              />
            </div>

            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>NFT Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={mintForm.imageUrl}
                onChange={handleMintChange}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea
                name="description"
                value={mintForm.description}
                onChange={handleMintChange}
                placeholder="Short description of the NFT"
              ></textarea>
            </div>
          </div>

          <button
            onClick={mintLoyalty}
            disabled={
              loading ||
              !mintForm.customerId ||
              !mintForm.imageUrl ||
              !packageId
            }
          >
            {loading ? 'Minting...' : 'Mint NFT'}
          </button>

          <NFTPreview imageUrl={mintForm.imageUrl} />
        </div>

        <HistoryList history={history} />
      </main>
    </div>
  );
};

export default App;
