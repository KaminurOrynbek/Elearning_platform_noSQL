import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async () => {
    try {
      const { data } = await axios.put(
        `${server}/api/user/${selectedUser._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchUsers();
      setShowDialog(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openDialog = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedUser(null);
  };

  console.log(users);
  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border={"black"}>
          <thead>
            <tr>
              <td>#</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>update role</td>
            </tr>
          </thead>

          {users &&
            users.map((e, i) => (
              <tbody key={e._id}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <button
                      onClick={() => openDialog(e)}
                      className="common-btn"
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      {showDialog && (
        <ConfirmationDialog
          message={`Are you sure you want to update this user's role?`}
          onConfirm={handleUpdateRole}
          onCancel={closeDialog}
        />
      )}
    </Layout>
  );
};

export default AdminUsers;