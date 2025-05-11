import React from 'react';
import './SpecialModal.css';

export default function SpecialModal({ special, onClose }) {
  if (!special) return null;

  const handleOrder = () => {
    const message = `Hi, I would like to order the special: ${special.title}`;
    const whatsappUrl = `https://wa.me/919545966155?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = () => {
    const websiteUrl = 'https://radinasfoodcorner.com';
    const shareText = `🌟 Today's Special at Radina's Foodcorner!\n\n` +
      `${special.title} - ${special.price}\n` +
      `${special.description}\n\n` +
      `Limited to ${special.totalPlates} plates only!\n` +
      `Orders open until ${special.orderingClosesAt}\n\n` +
      `Check it out here: ${websiteUrl}?special=true\n\n` +
      `#RadinasFoodcorner #TodaysSpecial #FoodieHeaven`;

    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappShareUrl, '_blank');
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

            <div className="special-actions">
              {special.isOrderingOpen && (
                <button className="order-special-btn" onClick={handleOrder}>
                  Order on WhatsApp
                </button>
              )}
              <button className="share-special-btn" onClick={handleShare}>
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 