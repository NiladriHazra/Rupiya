import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          }
        });
        console.log("Balance response:", response); // Debugging line
        if (response.data && response.data.balance !== undefined) {
          setBalance(response.data.balance);  
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setError("Failed to fetch balance");
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  if (error) {
    return <div className="text-white text-4xl flex justify-center items-center h-screen">
    {error}
  </div> // Display error message
  }

  return (
    <div className="bg-gray-800 min-h-screen">
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};



