import React from 'react';

export default function ProductListItem(props) {
    let product = props.product;
    return <div className='product-list-item'>
        <h3> { product.name } </h3>
        <img
            height = {100}
            alt = { product.name }
            src = { `/products/${product.image}` }
        />
        <div> { product.description } </div>
        <div> ${ product.price } </div>
        <div>
            <button
                onClick={() => props.addToCart(product)}
            >Add to cart ({
                props.cart.reduce((acc, item) => (item.id === product.id) ? item.quantity : acc, 0)
            })</button>
            {
                props.cart.find((item) => (item.id === product.id)) ?
                    <button
                        onClick={() => props.removeFromCart(product)}
                    >Remove</button> :
                    ""
            }
        </div>
    </div>
}