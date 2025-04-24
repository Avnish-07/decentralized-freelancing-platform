import React, { useState } from "react";
import { loginUser } from "../../api";
import { Input, InputLabel, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate= useNavigate()

    const [loginData, setLoginData]=useState({
        identifier:"",
        password:""
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res= await loginUser(loginData.identifier, loginData.password)

        if(!res.data.username || !res.data.email || !res.data.password){
            console.log("Login unsuccessful");
            return;
        }

        localStorage.setItem("userId", res.data._id)
        console.log("user id saved");
        

        navigate("/",{replace:true})
    }

    const handleChange=(e)=>{
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }


    return (
        <>
        <Typography variant="h2" align="center" color='textSecondary' >Login</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "160px",
            }}>
                <form onSubmit={handleSubmit} method="post">
                    <InputLabel htmlFor='identfier'></InputLabel>
                    <Input type="text" name="identifier" placeholder="Enter username or email" onChange={handleChange} required />

                    <InputLabel htmlFor='password'></InputLabel>
                    <Input type="password" name="password" placeholder="Enter password" onChange={handleChange} required/>
                    <br/>
                    <Button variant="contained" sx={{mt:"30px"}} type="submit">submit</Button>
                </form>
            </Box>
        </>
    )
}

export default Login