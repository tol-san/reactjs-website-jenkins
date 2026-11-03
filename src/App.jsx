import React, { useState } from 'react';
import Header from './components/Header';
import TShirtCard from './components/TShirtCard';
import TableView from './components/TableView';
import DetailModal from './components/DetailModal';
import Footer from './components/Footer';
import { TSHIRTS } from './data/tshirts';

export default function App() {
  const [activeCut, setActiveCut] = useState('ALL');
  const [activeTone, setActiveTone] = useState('ALL');
  const [viewMode, setViewMode] = useState('3'); // '2', '3', '4', 'table'
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items based on active criteria
  const filteredItems = TSHIRTS.filter((item) => {
    const matchCut = activeCut === 'ALL' || item.cut === activeCut;
    const matchTone = activeTone === 'ALL' || item.tone === activeTone;
    return matchCut && matchTone;
  });

  return (
    <div className="app-layout">
      {/* Navigation & Controls */}
      <Header
        activeCut={activeCut}
        setActiveCut={setActiveCut}
        activeTone={activeTone}
        setActiveTone={setActiveTone}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={filteredItems.length}
        totalCount={TSHIRTS.length}
      />

      {/* Main Exhibition Area */}
      <main className="main-content">
        {viewMode === 'table' ? (
          <TableView
            items={filteredItems}
            onSelect={(item) => setSelectedItem(item)}
          />
        ) : (
          <div className={`gallery-grid grid-cols-${viewMode}`}>
            {filteredItems.map((item) => (
              <TShirtCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div
            className="mono caps"
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-faint)',
              fontSize: 'var(--fs-xs)',
              border: '1px solid var(--border-line)',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
            }}
          >
            NO SPECIMENS MATCH CURRENT CRITERIA [CUT: {activeCut} / TONE: {activeTone}]
          </div>
        )}
      </main>

      {/* Detail Inspection Modal */}
      {selectedItem && (
        <DetailModal
          key={selectedItem.id}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Archival Information Footer */}
      <Footer />
    </div>
  );
}
