import React from 'react';
import { LayoutGrid, Grid3X3, Grid2X2, Table as TableIcon } from 'lucide-react';
import { CUTS, TONES } from '../data/tshirts';

export default function Header({
  activeCut,
  setActiveCut,
  activeTone,
  setActiveTone,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
}) {
  return (
    <header className="site-header">
      {/* Top micro bar */}
      <div className="header-top">
        <div className="brand-section">
          <span className="brand-title caps">EXHIBIT </span>
          <span className="brand-tag caps mono">SERIES 2026</span>
        </div>

        <div className="header-meta caps mono">
          <span className="meta-item">
            <span className="meta-dot"></span>
            CATALOGUE: {totalCount} ITEMS
          </span>
          <span className="meta-item">ORIGIN: GLOBAL SPEC</span>
          <span className="meta-item">PURE B&W MONOCHROME</span>
        </div>
      </div>

      {/* Primary control bar */}
      <div className="header-bar">
        <div className="filter-group">
          {/* Silhouette filter */}
          <div className="filter-row">
            <span className="filter-label mono caps">CUT:</span>
            {CUTS.map((cut) => (
              <button
                key={cut}
                className={`pill-btn mono ${activeCut === cut ? 'active' : ''}`}
                onClick={() => setActiveCut(cut)}
              >
                {cut}
              </button>
            ))}
          </div>

          {/* Tone filter */}
          <div className="filter-row">
            <span className="filter-label mono caps">TONE:</span>
            {TONES.map((tone) => (
              <button
                key={tone}
                className={`pill-btn mono ${activeTone === tone ? 'active' : ''}`}
                onClick={() => setActiveTone(tone)}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* View Switchers */}
        <div className="view-controls">
          <span className="filter-label mono caps">VIEW:</span>
          
          <button
            className={`view-btn mono ${viewMode === '2' ? 'active' : ''}`}
            onClick={() => setViewMode('2')}
            title="2-Column Grid"
          >
            <Grid2X2 size={15} />
            <span>2 COL</span>
          </button>

          <button
            className={`view-btn mono ${viewMode === '3' ? 'active' : ''}`}
            onClick={() => setViewMode('3')}
            title="3-Column Grid"
          >
            <Grid3X3 size={15} />
            <span>3 COL</span>
          </button>

          <button
            className={`view-btn mono ${viewMode === '4' ? 'active' : ''}`}
            onClick={() => setViewMode('4')}
            title="4-Column Grid"
          >
            <LayoutGrid size={15} />
            <span>4 COL</span>
          </button>

          <button
            className={`view-btn mono ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Technical Index Table"
          >
            <TableIcon size={15} />
            <span>INDEX</span>
          </button>
        </div>
      </div>

      {/* Sub-info metadata strip */}
      <div className="info-strip mono">
        <div>
          <span>DISPLAYING {filteredCount} OF {totalCount} SPECIMENS</span>
          {activeCut !== 'ALL' && <span> [CUT: {activeCut}]</span>}
          {activeTone !== 'ALL' && <span> [TONE: {activeTone}]</span>}
        </div>
        <div>
          <span>SOURCE: UNSPLASH ARCHIVE / SCALE: CM</span>
        </div>
      </div>
    </header>
  );
}
