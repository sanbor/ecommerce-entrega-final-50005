const Product = require('../models/Product');
const User = require('../models/user');
const { sendEmail } = require('../services/emailService');

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (product) {
            const user = await User.findById(product.userId);
            if (user.role === 'premium') {
                await sendEmail(user.email, 'Producto eliminado', 'Su producto ha sido eliminado.');
            }
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
