import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import Cart from "./Cart";
import CartContext from "./cart-context";

function MainNavigation() {
    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.cartItems.reduce((curNumber, item) => {
        return curNumber + item.quantity;
    }, 0);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">The Generics</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/store">Store</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        {!ctx.isLoggedIn && (<li className="nav-item">
                            <NavLink className="nav-link" to="/auth">Login</NavLink>
                        </li>)}
                        {ctx.isLoggedIn && (<li className="nav-item" onClick={ctx.onLogout}>
                            <NavLink className="nav-link" to="/auth">Logout</NavLink>
                        </li>)}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
                        </li>
                    </ul>
                    <div className="cart-icon-container position-relative d-inline-block">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numberOfCartItems}</span>
                        <Cart />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MainNavigation