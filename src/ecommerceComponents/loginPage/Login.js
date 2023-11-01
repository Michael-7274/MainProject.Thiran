import React, { useEffect, useState } from 'react'
import './loginStyle.css'
import { useNavigate } from 'react-router-dom';

export default function Login({setAuth}) {
    const[userData,setUserData]=useState();
    const[userName,setuserName]=useState();
    const[userPassword,setUserPassword]=useState();

    useEffect(() => {
        getData();
    }, []);
    
    const navigate=useNavigate();

    const getData=async()=>{
        try{
            const response=await fetch('users.json');
            const data=await response.json();
            setUserData(data);
        }
        catch(err){
            console.error(err);
        }
    }

    function getName(event){
        setuserName(event.target.value);
    }

    function getPassword(event){
        setUserPassword(event.target.value);
    }

    function setToLocalStorage(obj){
        localStorage.setItem('authentication',JSON.stringify(obj));
    }

    function isUserValid(){
        for(let i=0;i<userData.length;i++)
        {
            if(userData[i].userName===userName){
                if(userData[i].password===userPassword){
                    if(userData[i].role==="buyer"){
                        setToLocalStorage({
                            authentication:true,
                            role:'buyer',
                            id:userData[i].id
                        });
                        setAuth({
                            authentication:true,
                            role:'buyer',
                            id:userData[i].id
                        });
                        navigate('/catalog');
                    }
                    else{
                        setToLocalStorage({
                            authentication:true,
                            role:'seller',
                            id:userData[i].id
                        });
                        setAuth({
                            authentication:true,
                            role:'seller',
                            id:userData[i].id
                        });
                        navigate('/seller')
                    }
                }
                else{
                    alert("Incorrect password")
                }
                break;
            }
            else if(i===userData.length-1){
                alert("Username not found")
            }
        }
    }
    return (
        <>
            <div className="centerdiv">
                <h1>Login</h1>
            </div>
            <br /><br /><br /><br /><br /><br />
            <div className='centerdiv'>
                <label><span className='login-text1'>User Name:</span>
                    <input type="text" placeholder='Enter username' onChange={getName}/>
                </label>
            </div>
            <br/><br/><br/>
            <div className='centerdiv'>
                <label>
                    <span className='login-text2'>Password:</span>
                    <input type="password" placeholder='Enter password' onChange={getPassword}/>
                </label>
            </div>
            <br/><br/><br/><br/>
            <div className='centerdiv'>
                <button className='signin' onClick={isUserValid}>Sign in</button>
            </div>
        </>
    )
}
