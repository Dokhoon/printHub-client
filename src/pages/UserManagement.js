import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline,MdArrowBack  } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";
import BASE_URL from "../../api";
 
 
 
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const navigate = useNavigate();  
 
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const fetchUsers = async () => {
    try {
const res = axios.get(`${BASE_URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
 
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
await axios.delete(`${BASE_URL}/api/users/${id}`);
        toast.success("User deleted successfully");
         
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      }
    }
  };
 
  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="container mt-4">
        <div className="mb-3">
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => navigate("/admin")}
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "50px",
            }}
            title="Back to Dashboard"
          >
            <MdArrowBack style={{ marginRight: "5px" }} />
           
          </button>
        </div>
 
        <h2 className="mb-4">User Management</h2>
 
        {loading && <p>Loading users...</p>}
        {error && <p className="text-danger">{error}</p>}
 
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td>
                      <MdDeleteOutline
                        style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                        onClick={() => deleteUser(user._id)}
                        title="Delete User"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
 
 