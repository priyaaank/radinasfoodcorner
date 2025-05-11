import React from 'react';
import './SpecialModal.css';

export default function SpecialModal({ special, onClose }) {
  if (!special) return null;

  const handleOrder = () => {
    const message = `Hi, I would like to order the special: ${special.title}`;
    const whatsappUrl = `https://wa.me/919545966155?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="special-modal-overlay" onClick={onClose}>
      <div className="special-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="special-modal-content">
          <div className="special-image-container">
            <img src={special.image} alt={special.title} className="special-image" />
            {special.isOrderingOpen && (
              <div className="special-badge">
                Limited to {special.totalPlates} plates
              </div>
            )}
          </div>
          
          <div className="special-details">
            <h2>{special.title}</h2>
            <p className="special-description">{special.description}</p>
            
            <div className="special-meta">
              <div className="special-price">{special.price}</div>
              <div className="special-status">
                {special.isOrderingOpen ? (
                  <span className="status-open">
                    Orders open until {special.orderingClosesAt}
                  </span>
                ) : (
                  <span className="status-closed">Orders closed</span>
                )}
              </div>
            </div>

            <div className="special-info">
              {special.dietaryInfo && (
                <div className="dietary-info">
                  <span className="info-label">Dietary:</span> {special.dietaryInfo}
                </div>
              )}
              {special.allergens && special.allergens.length > 0 && (
                <div className="allergens">
                  <span className="info-label">Contains:</span> {special.allergens.join(', ')}
                </div>
              )}
            </div>

            {special.isOrderingOpen && (
              <button className="order-special-btn" onClick={handleOrder}>
                Order on WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 