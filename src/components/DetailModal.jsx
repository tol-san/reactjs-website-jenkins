import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function DetailModal({ item, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [unit, setUnit] = useState('cm'); // 'cm' or 'in'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const toInches = (cmVal) => (cmVal / 2.54).toFixed(1);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Strip */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-title caps">{item.name}</span>
            <span className="modal-code mono">{item.code}</span>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="modal-body">
          {/* Gallery Column */}
          <div className="modal-gallery">
            <div className="modal-main-image-wrap">
              <img
                src={item.images[activeImageIndex]}
                alt={`${item.name} angle ${activeImageIndex + 1}`}
                className="modal-main-img"
              />
            </div>

            {/* Angle Thumbnails */}
            <div className="thumbnail-row">
              {item.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  title={`View angle 0${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail 0${idx + 1}`}
                    className="thumb-img"
                  />
                </button>
              ))}
            </div>

            <div className="caps mono" style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-faint)' }}>
              IMAGE SOURCE: UNSPLASH ARCHIVE // ANGLE {activeImageIndex + 1} OF {item.images.length}
            </div>
          </div>

          {/* Specifications Column */}
          <div className="modal-specs-panel">
            {/* Core Classification */}
            <div className="spec-block">
              <div className="spec-block-title mono">01 // CLASSIFICATION</div>
              <div className="spec-grid-dense mono">
                <div className="spec-item">
                  <span className="spec-label">ITEM ID</span>
                  <span className="spec-val">{item.id}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">SILHOUETTE</span>
                  <span className="spec-val">{item.cut}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">DENSITY</span>
                  <span className="spec-val">{item.weight}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">COLOR VALUE</span>
                  <span className="spec-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.hex,
                        border: '1px solid rgba(0,0,0,0.15)'
                      }}
                    ></span>
                    {item.color} ({item.hex})
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">KNIT ORIGIN</span>
                  <span className="spec-val">{item.origin}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">YARN SPEC</span>
                  <span className="spec-val">{item.yarn}</span>
                </div>
              </div>
            </div>

            {/* Construction Specs */}
            <div className="spec-block">
              <div className="spec-block-title mono">02 // CONSTRUCTION</div>
              <div className="spec-grid-dense mono">
                <div className="spec-item">
                  <span className="spec-label">COLLAR BAND</span>
                  <span className="spec-val">{item.collar}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">HEM DETAIL</span>
                  <span className="spec-val">{item.hem}</span>
                </div>
                <div className="spec-item" style={{ gridColumn: 'span 2' }}>
                  <span className="spec-label">BODY KNITTING</span>
                  <span className="spec-val">{item.construction}</span>
                </div>
              </div>
            </div>

            {/* Dimensional Matrix (Size chart) */}
            <div className="spec-block">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                <span className="spec-block-title mono" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  03 // DIMENSIONS MATRIX
                </span>
                <div className="measurement-unit-toggle mono">
                  <button
                    className={`unit-btn ${unit === 'cm' ? 'active' : ''}`}
                    onClick={() => setUnit('cm')}
                  >
                    CM
                  </button>
                  <button
                    className={`unit-btn ${unit === 'in' ? 'active' : ''}`}
                    onClick={() => setUnit('in')}
                  >
                    IN
                  </button>
                </div>
              </div>

              <table className="measure-table mono">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST</th>
                    <th>LENGTH</th>
                    <th>SHOULDER</th>
                    <th>SLEEVE</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(item.measurements).map(([size, m]) => (
                    <tr key={size}>
                      <td>{size}</td>
                      <td>{unit === 'cm' ? m.chest : toInches(m.chest)}</td>
                      <td>{unit === 'cm' ? m.length : toInches(m.length)}</td>
                      <td>{unit === 'cm' ? m.shoulder : toInches(m.shoulder)}</td>
                      <td>{unit === 'cm' ? m.sleeve : toInches(m.sleeve)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Specifications list */}
            <div className="spec-block">
              <div className="spec-block-title mono">04 // ATTRIBUTES</div>
              <ul className="spec-list">
                {item.specs.map((spec, i) => (
                  <li key={i} className="spec-list-item">
                    <span className="bullet-dash">—</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maintenance */}
            <div className="care-notice mono">
              <div className="spec-label caps" style={{ marginBottom: '2px' }}>MAINTENANCE PROTOCOL:</div>
              <div>{item.care}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
