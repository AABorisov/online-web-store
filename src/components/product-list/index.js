import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';


const getRemoteProducts = () => new Promise((resolves, rejects) => {
    const api = `https://my-json-server.typicode.com/AABorisov/online-web-store/db`;
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.onload = () => (request.status === 200) ?
        resolves(JSON.parse(request.response).products) :
        rejects(Error(request.statusText));
    request.onerror = err => rejects(err);
    request.send();
});

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            loading: false,
            error: null
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        getRemoteProducts().then(
            products => {
                this.setState({products, loading: false});
            },
            error => {
                this.setState({error, loading: false});
            }
        );
    }

    render() {
        const { products, loading } = this.state;
        return (
            <div className='product-list'>
                {
                    (loading) ?
                        <span>Loading Products...</span> :
                        (products.length) ?
                            products.map(product =>
                                <ProductListItem
                                    product={product}
                                    addToCart={this.props.addToCart}
                                    removeFromCart={this.props.removeFromCart}
                                    cart={this.props.cart}
                                    key={product.id}
                                /> ) :
                            <span>0 products loaded</span>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (item) => {
            dispatch({
                type: 'ADD',
                payload: item
            });
        },
        removeFromCart: (item) => {
            dispatch({
                type: 'REMOVE',
                payload: item
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);