
import React, { useEffect, useState } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const deleteUser = (userId) => {
        fetch(`/api/users/${userId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => setUsers(users.filter(user => user._id !== userId)));
    };

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.nombre} - {user.correo} - {user.rol}
                        <button onClick={() => deleteUser(user._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;
