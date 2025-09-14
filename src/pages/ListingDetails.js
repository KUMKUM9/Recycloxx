import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useGamePoints } from "../context/GamePointsContext";
import { toast } from "react-toastify";
import { FaRecycle, FaLeaf, FaRedo, FaCrown } from "react-icons/fa";

const principles = [
  {
    title: "Reduce",
    icon: <FaLeaf size={40} color="#4CAF50" />,
    description:
      "Minimize waste by choosing products with less packaging and opting for durable, long-lasting items. Every small step helps conserve resources.",
  },
  {
    title: "Reuse",
    icon: <FaRedo size={40} color="#2196F3" />,
    description:
      "Give items a second life! Before discarding, consider how they can be reused, repurposed, or donated. Reusing saves energy and reduces landfill.",
  },
  {
    title: "Recycle",
    icon: <FaRecycle size={40} color="#FFC107" />,
    description:
      "Sort and recycle materials like paper, plastic, glass, and metal. Recycling keeps valuable resources in use and helps protect our planet.",
  },
];

const ListingDetails = () => {
  const { user } = useContext(AuthContext);
  const { points, addPoints } = useGamePoints();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [showRedeemPopup, setShowRedeemPopup] = useState(false);
  // Example listing data (replace with actual props or API data)
  const listing = {
    title: "Eco-Friendly Water Bottle",
    description:
      "A reusable stainless steel water bottle. Perfect for reducing single-use plastic waste.",
    image:
      "https://res.cloudinary.com/totalmerchandise/image/fetch/f_auto,q_auto:eco,w_500/https://www.totalmerchandise.co.uk/media/20263/6602cf9f2f5ac_000000971864-536999999-3d090-ins-pro04-2023-fal.png",
    postedBy: "GreenEarth Store",
    location: "Bangalore, India",
    price: 499
  };

  const calculateDiscount = () => {
    if (!usePoints || points < 100) return 0;
    const maxDiscount = listing.price * 0.3; // Maximum 30% discount
    const pointsDiscount = Math.floor(points / 100) * 10; // Every 100 points = ₹10 discount
    return Math.min(maxDiscount, pointsDiscount);
  };

  const handleBuy = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    const discount = calculateDiscount();
    if (usePoints && discount > 0) {
      const pointsUsed = Math.floor(discount * 10); // ₹10 discount = 100 points
      addPoints(-pointsUsed);
      toast.success(`Used ${pointsUsed} points for ₹${discount} discount!`);
    }
    toast.success('Purchase successful!');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: '2rem', background: '#f5f7fa' }}>
      <h1 style={{ color: '#388e3c', marginBottom: '1rem' }}>{listing.title}</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        />
        <div>
          <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>{listing.description}</p>
          <p style={{ color: '#388e3c', fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.7rem' }}>
            Price: <span style={{ color: '#1976d2' }}>
              {usePoints && calculateDiscount() > 0 ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: '#666' }}>₹{listing.price}</span>
                  {' '}₹{listing.price - calculateDiscount()}
                </>
              ) : (
                <>₹{listing.price}</>
              )}
            </span>
          </p>
          {user && points >= 100 && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '1rem',
              background: '#f0f7f7',
              padding: '10px',
              borderRadius: '8px'
            }}>
              <FaCrown color="#ffc107" />
              <div style={{ flex: 1 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                  />
                  Use points for discount (You have {points} points)
                </label>
                {usePoints && (
                  <p style={{ color: '#388e3c', marginTop: '5px', fontSize: '0.9rem' }}>
                    Discount: ₹{calculateDiscount()} ({Math.floor(calculateDiscount() * 10)} points)
                  </p>
                )}
              </div>
            </div>
          )}
          <p style={{ color: '#757575', marginBottom: '0.5rem' }}><strong>Posted by:</strong> {listing.postedBy}</p>
          <p style={{ color: '#757575' }}><strong>Location:</strong> {listing.location}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}>
            <button
              style={{
                background: '#338a86',
                color: '#fff',
                border: 'none',
                borderRadius: '1rem',
                padding: '0.6rem 1.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s',
              }}
              onClick={() => {
                if (!user) setShowLoginPopup(true);
                else alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
            <button
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '1rem',
                padding: '0.6rem 1.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s',
              }}
              onClick={handleBuy}
            >
              Buy Now
            </button>
          </div>
      {showLoginPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 16px rgba(56,142,60,0.15)',
            padding: '2rem 2.5rem',
            textAlign: 'center',
            minWidth: '320px'
          }}>
            <h2 style={{ color: '#d84315', marginBottom: '1rem' }}>Login Required</h2>
            <p style={{ color: '#388e3c', marginBottom: '1.5rem', fontSize: '1.08rem' }}>
              Please login first to add items to cart or buy products.
            </p>
            <button
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '1rem',
                padding: '0.5rem 1.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
              onClick={() => {
                window.location.href = '/auth';
              }}
            >
              Login
            </button>
            <button
              style={{
                background: '#e8f5e9',
                color: '#388e3c',
                border: '1px solid #388e3c',
                borderRadius: '1rem',
                padding: '0.5rem 1.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => setShowLoginPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
      <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>3R Principle: Reduce, Reuse, Recycle</h2>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
        {principles.map((p) => (
          <div key={p.title} style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem', width: '260px', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.5rem' }}>{p.icon}</div>
            <h3 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>{p.title}</h3>
            <p style={{ color: '#555', fontSize: '1rem' }}>{p.description}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          style={{
            background: 'linear-gradient(90deg, #388e3c 0%, #1976d2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '2rem',
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.3s',
          }}
          onClick={() => alert('Thank you for supporting the 3R Principle!')}
        >
          Support Sustainability
        </button>
      </div>
    </div>
  );
};

export default ListingDetails;
