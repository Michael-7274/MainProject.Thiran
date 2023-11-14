import React, { useEffect, useState } from 'react'
import './loginStyle.css'
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }) {
    //state to store 
    const [userData, setUserData] = useState([]);
    const [userCred, setUserCred] = useState({
        username: "",
        password: ""
    });

    const [errorObject, setErrorObject] = useState({
        userNameError: "",
        passwordError: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const tempObject = { ...errorObject };


    // invoke getData to  get details of various users from json document
    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();

    //get user data from json if it doesn't exist in local storage
    const getData = async () => {
        try {
            const response = await fetch('users.json');
            const data = await response.json();
            setUserData(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    //get username and set username state
    function getChange(event) {
        const { name, value } = event.target;
        setUserCred({
            ...userCred,
            [name]: value
        });
    }

    //set user data to local storage
    function setToLocalStorage(obj) {
        localStorage.setItem('authentication', JSON.stringify(obj));
    }

    //check the format of the input credentials
    const isDataValid = () => {
        let isValid = true;
        if (!((userCred.username.indexOf("@seller.com") === -1) ^ (userCred.username.indexOf("@buyer.com") === -1))) {
            tempObject.userNameError = "Enter proper username";
            isValid = false;
        }
        else {
            tempObject.userNameError = ""
        }

        if (userCred.password.length < 8) {
            tempObject.passwordError = "Invalid password"
            isValid = false;
        } else {
            tempObject.passwordError = ""
        }
        setErrorObject(tempObject);
        return isValid;
    }

    //check user credentials and if correct then go to respective pages
    function isUserValid(e) {
        e.preventDefault();
        if (isDataValid()) {
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].userName === userCred.username) {
                    if (userData[i].password === userCred.password) {
                        if (userData[i].role === "buyer") {
                            setToLocalStorage({
                                authentication: true,
                                role: 'buyer',
                                id: userData[i].id
                            });
                            setAuth({
                                authentication: true,
                                role: 'buyer',
                                id: userData[i].id
                            });
                            navigate('/catalog');
                        }
                        else {
                            setToLocalStorage({
                                authentication: true,
                                role: 'seller',
                                id: userData[i].id
                            });
                            setAuth({
                                authentication: true,
                                role: 'seller',
                                id: userData[i].id
                            });
                            navigate('/seller')
                        }
                    }
                    else {
                        tempObject.passwordError = "Incorrect password";
                    }
                    break;
                }
                else if (i === userData.length - 1) {
                    tempObject.userNameError = "Username not found";
                }
            }
        }
        setErrorObject(tempObject);
    }

    return (
        <>
            <form onSubmit={isUserValid}>
                <div className="login-container">

                    <div className="centerdiv">
                        <h1 id='login-text0'>Login</h1>
                    </div>
                    <br /><br /><br /><br /><br /><br />

                    <div className='centerdiv'>
                        <label><span className='login-text1'>User Name:</span>
                            <input type="text" id="username" name="username" placeholder='Enter username'
                                onChange={getChange} />
                        </label>
                    </div>

                    <div className='centerdiv error-message-one'>
                        {errorObject.userNameError}
                    </div>

                    <br /><br /><br />
                    <div className='centerdiv'>
                        <label>
                            <span className='login-text2'>Password:</span>
                            <input type={showPassword ? "text" : "password"} id="password" name="password" 
                            placeholder='Enter password' onChange={getChange} />
                        </label><br />
                    </div>
                    <div className='centerdiv error-message-two'>
                        {errorObject.passwordError}
                    </div>
                    <div className='centerdiv show-password'>
                            <label><span className='login-text3'>Show password:</span>
                                <input id="show-checkbox" type="checkbox" value={showPassword}
                                    onChange={() => { setShowPassword(!showPassword) }} />
                            </label>
                        </div>
                    <br /><br /><br /><br />
                    <div className='centerdiv'>
                        <button className='signin' onClick={isUserValid}>Sign in</button>
                    </div>

                </div>
            </form>
        </>
    )
}
