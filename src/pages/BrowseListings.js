import React, { useState } from "react";
import ListingCard from "../shared/ListingCard";
import CategoryFilter from "../shared/CategoryFilter";

const MOCK_LISTINGS = [
  {
    _id: "1",
    title: "Reusable Water Bottle",
    description: "Stainless steel bottle, perfect for reducing single-use plastics.",
    category: "Metal",
    price: 499,
    image: "https://res.cloudinary.com/totalmerchandise/image/fetch/f_auto,q_auto:eco,w_500/https://www.totalmerchandise.co.uk/media/20263/6602cf9f2f5ac_000000971864-536999999-3d090-ins-pro04-2023-fal.png",
    location: "Bangalore, India",
    type: "reusable"
  },
  {
    _id: "2",
    title: "Eco Sofa",
    description: "Sofa made from recycled materials. Durable and sustainable.",
    category: "Sofa",
    price: 12999,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
    location: "Hyderabad, India",
    type: "eco friendly"
  },
  {
    _id: "3",
    title: "Upcycled Denim Jacket",
    description: "Fashionable jacket made from upcycled denim. Reuse and look great!",
    category: "Clothes",
    price: 899,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    location: "Delhi, India",
    type: "upcycled"
  },
  {
    _id: "4",
    title: "Second-hand Book Set",
    description: "A set of 5 classic novels in great condition. Reduce paper waste!",
    category: "Books",
    price: 350,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    location: "Mumbai, India",
    type: "secondhand"
  }
];

const FILTER_TYPES = ["all", "upcycled", "secondhand", "eco friendly", "reusable"];

const BrowseListings = () => {
  const [listings] = useState(MOCK_LISTINGS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("All");

  const filteredListings = listings.filter(l => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || l.type === filter;
    const matchesCategory = category === "All" || l.category === category;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  return (
    <div style={{ background: "#f5f7fa", minHeight: "80vh", padding: "2rem" }}>
      <h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>Browse Listings</h2>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "1rem",
            border: "1.5px solid #388e3c",
            width: "260px",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 1px 4px rgba(56,142,60,0.08)"
          }}
        />
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <CategoryFilter selected={category} onChange={setCategory} />
          <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
            <span style={{ color: "#388e3c", fontWeight: "500" }}>Filter:</span>
            {FILTER_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  background: filter === type ? "#388e3c" : "#e8f5e9",
                  color: filter === type ? "#fff" : "#388e3c",
                  border: "1px solid #388e3c",
                  borderRadius: "1rem",
                  padding: "0.4rem 1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s"
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
        gap: "2rem",
        marginTop: "1rem"
      }}>
        {filteredListings.length === 0 ? (
          <div style={{ color: "#757575", fontSize: "1.1rem" }}>No items found.</div>
        ) : (
          filteredListings.map((l) => (
            <ListingCard key={l._id} listing={l} />
          ))
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#1976d2" }}>
        <strong>Support the 3R Principle: Reduce, Reuse, Recycle</strong>
      </div>
    </div>
  );
};

export default BrowseListings;
