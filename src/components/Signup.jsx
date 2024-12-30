import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const signupHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQxqWAXQVnifXhqishJ95EfgRZb9DOkq0',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {
                alert("Account created successfully!");
                navigate('/auth');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <h3 className="card-header">Sign Up</h3>
                        <div className="card-body">
                            <form onSubmit={signupHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" ref={emailInputRef} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" ref={passwordInputRef} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirm-password" ref={confirmPasswordInputRef} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Already have an account? <Link to="/auth">Login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
