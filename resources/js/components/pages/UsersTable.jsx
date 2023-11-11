import React, { useEffect, useRef, useState } from 'react';
import UserTableRow from './UserTableRow';

const UserTable = ({ users, onEdit, onDelete, onSelectAll, onSelect, selectedUsers }) => {
  const checkboxRef = useRef();
  const [allChecked, setAllChecked] = useState(false);
  const nonAdminUsers = users.filter(({role}) => role === 'user');

  const onSelectOne = (userId) => {
    let isAll = !selectedUsers.includes(userId) && 
      (selectedUsers.length + 1 === nonAdminUsers.length);

    if (checkboxRef?.current)
      checkboxRef.current.checked = isAll;

    if (isAll) {
      setAllChecked(true);
    }

    onSelect(userId);
  }

console.log(selectedUsers, allChecked)
  useEffect(() => {
    function onCheckboxClick() {
      setAllChecked(this.checked);
    }
    
    checkboxRef?.current.addEventListener('click', onCheckboxClick);
    
    return () => {
        if (checkboxRef?.current) {
        checkboxRef.current.removeEventListener('click', onCheckboxClick);
      }
    }
  }, []);

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" ref={checkboxRef} onChange={onSelectAll} />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Created</th>
          <th>Role</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserTableRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} onSelect={onSelectOne} checked={allChecked} allRef={checkboxRef} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
