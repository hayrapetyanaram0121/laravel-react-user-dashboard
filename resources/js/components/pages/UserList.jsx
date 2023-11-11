import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import UserTable from './UsersTable';
import UserForm from '../partials/UserForm';
import Modal from '../partials/Modal';
import Pagination from '../partials/Pagination';
import ConfirmDialog from '../partials/ConfirmDialog';
import MessageAlert from '../partials/MessageAlert';
import "../../../css/user-list.css";

const UserList = () => {
  const [cookie] = useCookies();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [optionalFields, setOptionalFields] = useState([]);
  const [message, setMessage] = useState({title: '', content: ''});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formAction, setFormAction] = useState('Create User');
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Modal/Dialog states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const setUserList = () => {
    axios.get(`/api/user?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + cookie.test_token
      }
    })
      .then(function (response) {
        if (response.data.status === "success") {
          setTotalUsers(response.data.users.total);
          setPages(response.data.users.last_page);
          setUsers(response.data.users.data);
        }
      });
  }

  useEffect(() => {
    setUserList();
  }, [page]);

  const handleSubmit = () => {
    if (userID == 0) {
      handleCreate(userID);
    } else {
      handleEdit(userID);
    }
  };

  const handleEdit = (userId) => {
    axios.put(`/api/user/${userId}`, formData, {
      headers: {
        Authorization: 'Bearer ' + cookie.test_token
      }
    })
      .then(function (response) {
        if (response.data.status === "success") {
          setUserList();
          setIsModalOpen(false);
        }
      })
      .catch(function({response}) {
        setMessage({
          title: response.data.title,
          content: response.data.message
        })
        setIsAlertOpen(true);
      });
  };

  const handleCreate = (userId) => {
    axios.post('/api/user', formData, {
      headers: {
        Authorization: 'Bearer ' + cookie.test_token
      }
    })
      .then(function (response) {
        if (response.data.status === "success") {
          setUserList();
          setIsModalOpen(false);
        }
      })
      .catch(function({response}) {
        setMessage({
          title: response.data.title,
          content: response.data.message
        })
        setIsAlertOpen(true);
      });
  };

  const handleDelete = () => {
    if (userID) {
      axios.delete(`/api/user/${userID}`, {
        headers: {
          Authorization: 'Bearer ' + cookie.test_token
        }
      })
        .then(function (response) {
          if (response.data.status === "success") {
            setPage(1);
            setIsDialogOpen(false);
          }
        });
    } else {
      axios.post(`/api/user/delete-many`, {
        ids: selectedUsers
      }, {
        headers: {
          Authorization: 'Bearer ' + cookie.test_token
        }
      })
        .then(function (response) {
          if (response.data.status === "success") {
            setPage(1);
            setSelectedUsers([]);
            setIsDialogOpen(false);
          }
        });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.filter(({role}) => role === 'user').map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handeFormModal = (userId) => {
    setFormAction(userId ? 'Edit User' : 'Create User');
    setOptionalFields(userId ? ['password']: []);

    if (userId) {
      axios.get(`/api/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + cookie.test_token
      }
    })
      .then(function (response) {
        if (response.data.status === "success") {
          setFormData({
            name: response.data.user.name,
            email: response.data.user.email,
            password: '',
            confirmPassword: '',
          })
        }
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    }

    setUserID(userId);
    setIsModalOpen(true);
  }

  const handleDeleteDialog = (userId) => {
    setUserID(userId);
    setIsDialogOpen(true);
  }

  return (
    <>
      <div className="user-list">
        <div className="actions">
          <button className='button-primary' onClick={() => handeFormModal(0)}>Create</button>
          <button className='button-primary' onClick={() => handleDeleteDialog(0)}>
            Delete Selected
          </button>
          <div className='total-users-line'>Total users: {totalUsers}</div>
        </div>
        <UserTable users={users} onEdit={handeFormModal} onDelete={handleDeleteDialog} onSelectAll={handleSelectAll} onSelect={handleSelect} selectedUsers={selectedUsers} />
        <Pagination totalPages={pages} currentPage={page} onPageChange={setPage}></Pagination>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>User Modal</h2>
        <UserForm formSubmit={handleSubmit} formData={formData} setFormData={setFormData} formAction={formAction} optional={optionalFields}></UserForm>
      </Modal>
      <ConfirmDialog isOpen={isDialogOpen} onCancel={() => setIsDialogOpen(false)} message={'Are you sure?'} onConfirm={handleDelete}  />
      <MessageAlert
        title={message.title}
        text={message.content}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  );
};

export default UserList;
