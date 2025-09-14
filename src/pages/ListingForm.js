import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";

// Add CSS animations
const styles = document.createElement('style');
styles.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .listing-form-container {
    animation: slideDown 0.5s ease-out;
  }

  .listing-form-input {
    transition: all 0.3s ease !important;
  }

  .listing-form-input:focus {
    border-color: #FF6B6B !important;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
  }

  .listing-form-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3) !important;
  }
`;
document.head.appendChild(styles);

const ListingForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/listings", {
        title,
        description,
        category: "Other", // You can add category selection
        price: 0, // You can add price input
        image,
        owner: user.id // Using the user's ID instead of email
      });
      alert("Listing added!");
      setTitle("");
      setDescription("");
      setImage("");
      setPreview("");
      // Optionally, redirect or refresh listings
      window.location.href = "/browse";
    } catch (err) {
      alert("Error adding listing");
    }
  };

  if (!user) {
    return (
      <div style={{
        background: "linear-gradient(145deg, #ffffff, #fff5f5)",
        borderRadius: "1.5rem",
        boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
        padding: "2.5rem",
        maxWidth: "400px",
        margin: "2rem auto",
        textAlign: "center",
        color: "#666",
        animation: "slideDown 0.5s ease-out"
      }}>
        <h2 style={{ 
          color: "#FF6B6B", 
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          fontWeight: "600"
        }}>Login Required</h2>
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          opacity: "0.9"
        }}>You must be logged in to add a new item listing.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
      borderRadius: "1.5rem",
      boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
      padding: "2.5rem",
      maxWidth: "450px",
      margin: "2rem auto",
      textAlign: "center",
      transition: "all 0.3s ease-in-out",
      transform: "translateY(0)",
      ":hover": {
        transform: "translateY(-5px)"
      }
    }}>
      <h2 style={{ 
        color: "#FF6B6B", 
        marginBottom: "1.5rem",
        fontSize: "2rem",
        fontWeight: "600",
        animation: "slideDown 0.5s ease-out"
      }}>Create Listing</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ 
          marginBottom: "1rem",
          padding: "0.8rem",
          width: "90%",
          borderRadius: "0.8rem",
          border: "2px solid #FFE066",
          backgroundColor: "rgba(255, 224, 102, 0.1)",
          transition: "all 0.3s ease",
          outline: "none",
          ":focus": {
            borderColor: "#FF6B6B",
            boxShadow: "0 0 0 3px rgba(255, 107, 107, 0.2)"
          }
        }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ 
          marginBottom: "1.2rem",
          padding: "0.8rem",
          width: "90%",
          borderRadius: "0.8rem",
          border: "2px solid #FFE066",
          backgroundColor: "rgba(255, 224, 102, 0.1)",
          minHeight: "100px",
          transition: "all 0.3s ease",
          outline: "none",
          ":focus": {
            borderColor: "#FF6B6B",
            boxShadow: "0 0 0 3px rgba(255, 107, 107, 0.2)"
          }
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ 
          marginBottom: "1.2rem",
          width: "90%",
          cursor: "pointer"
        }}
      />
      {preview && (
        <img 
          src={preview} 
          alt="Preview" 
          style={{ 
            width: "150px", 
            height: "150px", 
            objectFit: "cover", 
            borderRadius: "1rem", 
            marginBottom: "1.2rem", 
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.5s ease-out"
          }} 
        />
      )}
      <button
        onClick={submit}
        style={{
          background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
          color: "#fff",
          border: "none",
          borderRadius: "1.2rem",
          padding: "0.8rem 2rem",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1.1rem",
          transition: "all 0.3s ease",
          transform: "translateY(0)",
          boxShadow: "0 4px 15px rgba(255, 107, 107, 0.2)",
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)"
          },
          ":active": {
            transform: "translateY(1px)"
          }
        }}
      >
        Create Listing
      </button>
      <p style={{ 
        marginTop: "2rem", 
        color: "#4A90E2",
        fontSize: "1.1rem",
        animation: "fadeIn 0.5s ease-out",
        opacity: "0.9"
      }}>
        <strong>List items to Reduce, Reuse, and Recycle! 🌱</strong>
      </p>
    </div>
  );
};

export default ListingForm;
