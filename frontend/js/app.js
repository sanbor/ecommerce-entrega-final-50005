document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById('content');

    function loadHome() {
        content.innerHTML = '<h2>Welcome to our E-Commerce site</h2>';
    }

    function loadProducts() {
        content.innerHTML = '<h2>Products</h2><p>Here you will see our products.</p>';
    }

    async function loadAdmin() {
        const response = await fetch('/api/users');
        const users = await response.json();

        let usersHtml = `
            <h2>Admin Panel</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
        `;

        users.forEach(user => {
            usersHtml += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <select data-id="${user._id}" class="role-select">
                            <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                            <option value="premium" ${user.role === 'premium' ? 'selected' : ''}>Premium</option>
                        </select>
                    </td>
                    <td>
                        <button data-id="${user._id}" class="delete-user">Delete</button>
                    </td>
                </tr>
            `;
        });

        usersHtml += `</table>`;
        content.innerHTML = usersHtml;

        document.querySelectorAll('.role-select').forEach(select => {
            select.addEventListener('change', async function () {
                const userId = this.getAttribute('data-id');
                const newRole = this.value;
                await fetch(`/api/users/${userId}/role`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: newRole })
                });
            });
        });

        document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', async function () {
                const userId = this.getAttribute('data-id');
                await fetch(`/api/users/${userId}`, {
                    method: 'DELETE'
                });
                loadAdmin();
            });
        });
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);

            if (target === 'home') {
                loadHome();
            } else if (target === 'products') {
                loadProducts();
            } else if (target === 'admin') {
                loadAdmin();
            }
        });
    });

    loadHome();  // Load home by default
});
