const User = require('../models/user');
const { sendEmail } = require('../services/emailService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

exports.deleteInactiveUsers = async (req, res) => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    try {
        const users = await User.find({ lastConnection: { $lt: twoDaysAgo } });
        users.forEach(async (user) => {
            await User.findByIdAndDelete(user._id);
            await sendEmail(user.email, 'Cuenta eliminada por inactividad', 'Su cuenta ha sido eliminada por inactividad.');
        });
        res.json({ message: 'Usuarios inactivos eliminados' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuarios inactivos' });
    }
};

exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        await User.findByIdAndUpdate(id, { role });
        res.json({ message: 'Rol del usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol del usuario' });
    }
};
