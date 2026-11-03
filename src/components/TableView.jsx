import React from 'react';

export default function TableView({ items, onSelect }) {
  return (
    <div className="table-container">
      <table className="archive-table mono">
        <thead>
          <tr>
            <th>ID</th>
            <th>THUMB</th>
            <th>DESIGNATION</th>
            <th>SILHOUETTE</th>
            <th>WEIGHT</th>
            <th>COLOR</th>
            <th>YARN</th>
            <th>ORIGIN</th>
            <th style={{ textAlign: 'right' }}>SPEC</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item)}>
              <td style={{ color: 'var(--text-faint)' }}>{item.id}</td>
              <td style={{ padding: '6px 14px' }}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="table-thumbnail"
                  loading="lazy"
                />
              </td>
              <td>
                <div style={{ fontWeight: 500, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)' }}>
                  {item.name}
                </div>
                <div style={{ color: 'var(--text-faint)', fontSize: 'var(--fs-2xs)' }}>
                  {item.code}
                </div>
              </td>
              <td>{item.cut}</td>
              <td>{item.weight}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: item.hex,
                      border: '1px solid rgba(0,0,0,0.15)',
                      display: 'inline-block'
                    }}
                  ></span>
                  <span>{item.color}</span>
                </div>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{item.yarn}</td>
              <td style={{ color: 'var(--text-muted)' }}>{item.origin}</td>
              <td style={{ textAlign: 'right' }}>
                <button
                  className="table-inspect-btn mono caps"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item);
                  }}
                >
                  VIEW
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
