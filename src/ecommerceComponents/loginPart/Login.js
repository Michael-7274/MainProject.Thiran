import React, { useEffect, useState } from 'react'
import './loginStyle.css'
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }) {
    //state to store 
    const [userData, setUserData] = useState([]);
    const [userName, setuserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [errorObject, setErrorObject] = useState({
        "userNameError": "",
        "passwordError": ""
    });
    const tempObject = { ...errorObject };


    // invoke getData to  get details of various users from json document
    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();

    //get user data from json
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
    function getName(event) {
        setuserName(event.target.value);
    }

    //get user's password and set it as state
    function getPassword(event) {
        setUserPassword(event.target.value);
    }

    //set user data to local storage
    function setToLocalStorage(obj) {
        localStorage.setItem('authentication', JSON.stringify(obj));
    }

    //check the format of the input credentials
    const isDataValid = () => {
        let isValid = true;
        if (!((userName.indexOf("@seller.com") === -1) ^ (userName.indexOf("@buyer.com") === -1))) {
            tempObject.userNameError = "Enter proper username";
            isValid = false;
        }
        else {
            tempObject.userNameError = ""
        }

        if (userPassword.length < 8) {
            tempObject.passwordError = "Invalid password"
            isValid = false;
        } else {
            tempObject.passwordError = ""
        }
        setErrorObject(tempObject);
        return isValid;
    }

    //check user credentials and if correct then go to respective pages
    function isUserValid() {
        if (isDataValid()) {
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].userName === userName) {
                    if (userData[i].password === userPassword) {
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
            <div className="login-container">

                <div className="centerdiv">
                    <h1 id='login-text0'>Login</h1>
                </div>
                <br /><br /><br /><br /><br /><br />

                <div className='centerdiv'>
                    <label><span className='login-text1'>User Name:</span>
                        <input type="text" id="username" placeholder='Enter username' onChange={getName} />
                    </label>
                </div>

                <div className='centerdiv error-message-one'>
                    {errorObject.userNameError}
                </div>

                <br /><br /><br />
                <div className='centerdiv'>
                    <label>
                        <span className='login-text2'>Password:</span>
                        <input type="password" id="password" placeholder='Enter password' onChange={getPassword} />
                    </label><br />
                </div>

                <div className='centerdiv error-message-two'>
                    {errorObject.passwordError}
                </div>

                <br /><br /><br /><br />
                <div className='centerdiv'>
                    <button className='signin' onClick={isUserValid}>Sign in</button>
                </div>

            </div>
        </>
    )
}
