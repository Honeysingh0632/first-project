import React, { useState } from "react";

const UserProfile = () => {
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("yourname@gmail.com");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("USA");

  const handleSave = () => {
    // Handle save logic
    alert("Changes Saved");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.profileInfo}>
          <img
            src="https://via.placeholder.com/50" // Placeholder for profile image
            alt="Profile"
            style={styles.profileImage}
          />
          <div>
            <h3 style={styles.name}>{name}</h3>
            <p style={styles.email}>{email}</p>
          </div>
        </div>
        <button style={styles.closeButton}>✕</button>
      </div>
      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Email Account</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Mobile Number</label>
          <input
            type="text"
            placeholder="Add number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>
      <button onClick={handleSave} style={styles.saveButton}>
        Save Change
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  name: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  email: {
    margin: "0",
    fontSize: "14px",
    color: "#555",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  form: {
    marginBottom: "20px",
  },
  field: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UserProfile;
