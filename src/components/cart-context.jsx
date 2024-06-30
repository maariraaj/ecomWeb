import React, { useState } from 'react';
import axios from 'axios';

const CartContext = React.createContext({
    items: [],
    cartItems: [],
    tourList: [],
    onAddToCart: (itemId) => { },
    onRemove: (itemId) => { },
    onDecrease: (itemId) => { },
    onIncrease: (itemId) => { },
    login: (token) => { },
    isLoggedIn: false,
    onLogout: () => { }
});

export const CartContextProvider = (props) => {
    const productsArr = [
        {
            id: "p1",
            title: 'Colors',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
            category: "Music",
            details: "Lorem ipsum carrots enhanced rebates. Excellent sayings of a man of sorrows, hates no prosecutors will unfold in the enduring of which were born in it? this is often not at once take the hardships of the life of harsh condemn, we are accusing him? Him whom something large cisterns. ",
            quantity: 0
        },
        {
            id: "p2",
            title: 'Black and white Colors',
            price: 50,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
            category: "Music",
            details: "Often leads smallest mistake some pain main responsibilities are to stand for the right builder of pleasure, accepted explain up to now.Lorem ipsum dolor, sit amet consectetur rebates. The distinction, that arise from or to. The greater, therefore, an obstacle to the duties of the debts",
            quantity: 0
        },
        {
            id: "p3",
            title: 'Yellow and Black Colors',
            price: 70,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
            category: "Music",
            details: "The things we are accusing of these in the explication of the truth receives from the flattery of her will never be the trouble and they are refused to the pleasures and the pleasures of the pain, explain the treatment of excepturi of the blessed sufferings.",
            quantity: 0
        },
        {
            id: "p4",
            title: 'Blue Color',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
            category: "Music",
            details: "I never said will unfold in him receives at another time he may please the one that those works, we are less than they, this refused to the pleasures of deleniti? Those are! Will unfold in times of pleasure, this pain will be a right enjoyed by corrupt, are accusing him of all pleasures.",
            quantity: 0
        }
    ];

    const tourList = [
        {
            id: 1,
            title: "DTE ENERGY MUSIC THEATRE",
            location: "DETROIT, MI",
            date: "JUL 16"
        },
        {
            id: 2,
            title: "BUDWEISER STAGE",
            location: "TORONTO,ON",
            date: "JUL 19"
        },
        {
            id: 3,
            title: "JIGGY LUBE LIVE",
            location: "BRISTOW, VA",
            date: "JUL 22"
        },
        {
            id: 4,
            title: "AK-CHIN PAVILION",
            location: "PHOENIX, AZ",
            date: "JUL 29"
        },
        {
            id: 5,
            title: "T-MOBILE ARENA",
            location: "LAS VEGAS, NV",
            date: "AUG 2"
        },
        {
            id: 6,
            title: "CONCORD PAVILION",
            location: "CONCORD, CA",
            date: "AUG 7"
        }
    ];

    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const [cartItems, setCartItems] = useState(productsArr);
    const [loggedInEmail, setLoggedInEmail] = useState('');

    const firebaseAPI = 'https://react-http-bb1f2-default-rtdb.firebaseio.com/';

    const firebaseEndpoint = `cart/${loggedInEmail.replace(/[.@]/g, '')}.json`;

    const loginHandler = async (token, email) => {
        setLoggedInEmail(email);
        setToken(token);
        localStorage.setItem("token", token);
        const firebaseEpoint = `cart/${email.replace(/[.@]/g, '')}.json`;

        try {
            const response = await axios.get(`${firebaseAPI}${firebaseEpoint}`);
            const responseData = response.data;

            let mergedObj = {};
            for (const key in responseData) {
                const obj = responseData[key];
                if (!mergedObj[obj.title]) {
                    mergedObj[obj.title] = { ...obj };
                } else {
                    const existingObj = mergedObj[obj.title];
                    mergedObj[obj.title] = { ...obj, quantity: obj.quantity + existingObj.quantity };
                }
            }

            const result = Object.values(mergedObj);

            if (result.length === 0) {
                setCartItems(productsArr)
            } else {
                setCartItems(result)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const logoutHandler = () => {
        axios.delete(`${firebaseAPI}${firebaseEndpoint}`)
            .then(deleteResponse => {
                console.log('Deleted old data:', deleteResponse.data);
                for (const item of cartItems) {
                    axios.post(`${firebaseAPI}${firebaseEndpoint}`, item)
                        .then(postResponse => {
                            console.log('Posted new data:', postResponse.data);
                        })
                        .catch(postError => {
                            console.error('Error posting new data:', postError);
                        });
                }
                setCartItems(productsArr);
                setToken('');
                localStorage.removeItem("token");
                setLoggedInEmail('');
            })
            .catch(deleteError => {
                console.error('Error deleting old data:', deleteError);
            });
    };
    const addToCartHandler = (itemId) => {

        let obj = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })
        setCartItems(obj);
    };
    const removeFromCartHandler = (itemId) => {

        let obj = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: 0 };
            }
            return item;
        })
        setCartItems(obj);
    };
    const decreaseQuantityHandler = (itemId) => {

        let obj = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        })
        setCartItems(obj);
    };
    const increaseQuantityHandler = (itemId) => {
        let obj = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })
        setCartItems(obj);
    };

    return (
        <CartContext.Provider value={{
            items: productsArr,
            cartItems: cartItems,
            tourList: tourList,
            onAddToCart: addToCartHandler,
            onDecrease: decreaseQuantityHandler,
            onIncrease: increaseQuantityHandler,
            onRemove: removeFromCartHandler,
            login: loginHandler,
            isLoggedIn: userIsLoggedIn,
            onLogout: logoutHandler
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;