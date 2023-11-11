import React, { useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const UserTableRow = ({ user, onEdit, onDelete, onSelect, checked, allRef }) => {
    const checkboxRef = useRef();

    useEffect(() => {
        if (checkboxRef.current && checked === allRef?.current.checked) {
            checkboxRef.current.checked = checked;
        }
    },[checked, allRef?.current.checked]);

  return (
    <tr>
      <td>
        {user.role !== 'admin' ? <input type="checkbox" ref={checkboxRef} onChange={() => onSelect(user.id)} /> : ''}
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{(new Date(user.created_at)).toDateString()}</td>
      <td>{user.role}</td>
      <td>
        {user.role !== 'admin' ?
          <div className='user-action-container'>
            <button className='button-icon' onClick={() => onEdit(user.id)}><FaEdit/></button>
            <button className='button-icon' onClick={() => onDelete(user.id)}><FaTrash/></button>
          </div> : ''
        }
      </td>
    </tr>
  );
};

export default UserTableRow;
