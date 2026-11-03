import React, { useState } from 'react';

export default function TShirtCard({ item, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage = isHovered && item.images[1] ? item.images[1] : item.images[0];

  return (
    <div
      className="tshirt-card"
      onClick={() => onSelect(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      {/* Visual Frame */}
      <div className="card-media">
        <img
          src={displayImage}
          alt={item.name}
          className="card-img"
          loading="lazy"
        />

        {/* Micro color badge */}
        <div className="card-badge mono caps">
          <span
            className="swatch-pip"
            style={{ backgroundColor: item.hex }}
            title={item.color}
          ></span>
          <span>{item.color}</span>
        </div>

        {/* Subtle hover prompt */}
        <div className="card-hover-prompt mono caps">
          INSPECT [DETAIL]
        </div>
      </div>

      {/* Structured Minimal Caption */}
      <div className="card-details">
        <div className="card-row-main">
          <span className="card-item-title caps">{item.name}</span>
          <span className="card-item-id mono">{item.id}</span>
        </div>

        <div className="card-row-sub mono">
          <div className="card-specs-line">
            <span>{item.weight}</span>
            <span className="spec-divider">/</span>
            <span>{item.cut}</span>
          </div>
          <span className="caps">{item.code}</span>
        </div>
      </div>
    </div>
  );
}
