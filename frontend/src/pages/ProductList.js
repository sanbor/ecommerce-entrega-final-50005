
import React, { useEffect, useState } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => setProducts(products.filter(product => product._id !== productId)));
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - {product.description} - {product.price}
                        <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
