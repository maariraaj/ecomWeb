import { Fragment, useContext } from "react"
import CartContext from "./cart-context"
import StoreList from "./StoreList";

const Store = () => {
    const ctx = useContext(CartContext);

    return (
        <Fragment>
            <div className="container">
                <div className="card-group">
                    {ctx.items.map((item) => (
                        <StoreList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price} />
                    ))}
                </div>
            </div>

        </Fragment>
    )
}

export default Store;