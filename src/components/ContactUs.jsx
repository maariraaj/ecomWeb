import { useRef } from "react";

const ContactUs = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value
        };
        addUserHandler(user);
        event.target.reset();
    }
    async function addUserHandler(user) {
        const response = await fetch('https://react-http-bb1f2-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application.json'
            }
        });
        const data = await response.json();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mt-5 mb-5">Contact Us</h1>
            <h3 className="mb-5">Enter your details here</h3>
            <form onSubmit={formSubmitHandler}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter your name" ref={nameRef} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" ref={emailRef} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone number</label>
                            <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" ref={phoneRef} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactUs