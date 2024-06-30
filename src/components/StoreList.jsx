import { useContext } from "react"
import CartContext from "./cart-context"
import { NavLink } from "react-router-dom"

const StoreList = (props) => {
    const ctx = useContext(CartContext);

    return (
        <div key={props.id} className="card mt-3 p-3" >
            <NavLink to={`/store/${props.id}`} className="text-decoration-none text-dark">
                <h3 className="card-header">{props.title}</h3>
                <img src={props.imageUrl} className="card-img" />
            </NavLink>
            <div className="card-footer">
                <h5>Price: ₹{props.price}</h5>
                <button type="button" className="btn btn-success" onClick={() => { ctx.onAddToCart(props.id) }}>Add to Cart</button>
            </div>
        </div>
    )
}

export default StoreList;