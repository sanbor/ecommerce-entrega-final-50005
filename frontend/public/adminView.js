document.addEventListener('DOMContentLoaded', async () => {
    const userListDiv = document.getElementById('userList');

    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.textContent = `Nombre: ${user.nombre}, Correo: ${user.correo}, Rol: ${user.rol}`;
            userListDiv.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
});
