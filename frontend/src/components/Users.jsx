import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);



  return (
    <div style={styles.container}>
      <div style={styles.header}>Users  </div>
      <div style={styles.searchContainer}>
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          style={styles.searchInput}
        />
      </div>
      <div style={styles.userList}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};



const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.userCard}>
      <div style={styles.userDetails}>
        <div style={styles.avatar}>
          <div style={styles.avatarText}>{user.firstName[0]}</div>
        </div>
        <div style={styles.userName}>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};

// Inline styles with keyframes
const styles = {
  container: {
    color: '#fce4ec', // Light pink text color
    fontWeight: 'bold',
    marginTop: '1.5rem',
    fontSize: '1.125rem',
    padding: '1rem',
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    animation: 'fadeIn 1s ease-out',
  },
  searchContainer: {
    marginBottom: '1rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '0.375rem',
    backgroundColor: '#2d3748', // Dark gray background
    color: '#fce4ec', // Light pink text color
    outline: 'none',
    animation: 'slideIn 0.5s ease-out',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  userCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#4a5568', // Darker gray background
    borderRadius: '0.375rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeInUp 0.5s ease-out',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: '#2d3748', // Dark gray background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '0.75rem',
  },
  avatarText: {
    fontSize: '1.5rem',
    color: '#fce4ec', // Light pink text color
  },
  userName: {
    fontSize: '1.25rem',
    color: '#fce4ec', // Light pink text color
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

// Injecting keyframes inline
const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideIn {
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

// Injecting keyframes into the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);
