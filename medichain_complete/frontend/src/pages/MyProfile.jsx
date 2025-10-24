import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!token) return;
        const { data } = await axios.get(backendUrl + "/api/user/profile", { headers: { token } });
        setUser(data.user || null);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Failed to load profile");
      }
    };
    getUser();
  }, [backendUrl, token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {user ? (
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone || "-"}</p>
        </div>
      ) : (
        <p className="text-gray-600">No profile data found. Please log in.</p>
      )}
    </div>
  );
};

export default MyProfile;
