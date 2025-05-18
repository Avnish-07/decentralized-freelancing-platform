import React, { useState } from "react";
import { registerUser } from "../../api";
import { Input, InputLabel, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
const Register = () => {

    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        username: "",
        email: "",
        password: "",
        cPassword: "",
        walletAddress: ""
    })

    const handleChange = (e) => {
        setFormdata(
            {
                ...formdata,
                [e.target.name]: e.target.value
            })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            if (formdata.password !== formdata.cPassword) {
                console.log("Password and cPassword must be same");
                return;
            }


            // console.log(formdata.username,formdata.email,formdata.password);


            const res = await registerUser(formdata.username, formdata.email, formdata.password, formdata.walletAddress)
            console.log(res.data);

            if (!res.data.username || !res.data.email || !res.data.password || !res.data.walletAddress) {
                console.log("User not registered");
                return;
            }



            // localStorage.setItem("username",res.data.username);
            localStorage.setItem("userId", res.data._id);

            navigate("/")

            // return res.data;

        } catch (err) {
            console.log(err);
        }
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const address = accounts[0];
                console.log(address)
                setFormdata((prevData) => ({ ...prevData, walletAddress: address }));
            } catch (err) {
                console.log("Wallet connection rejected:", err);
            }
        } else {
            alert("MetaMask not installed. Please install it first.");
        }
    };

    return (
        <>

            <Typography variant="h2" align="center" color='textSecondary' >Register</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "160px",
            }}>
                <form onSubmit={handleSubmit} method="post">

                    <InputLabel htmlFor="username">Enter Username:</InputLabel>
                    <Input type='text' id='username' name='username' onChange={handleChange} required />


                    <InputLabel htmlFor="email">Enter Email:</InputLabel>
                    <Input type='email' id='email' name='email' onChange={handleChange} required />


                    <InputLabel htmlFor="password">Enter Password:</InputLabel>
                    <Input type='password' id='password' name='password' onChange={handleChange} required />


                    <InputLabel htmlFor="cPassword">Confirm Password:</InputLabel>
                    <Input type='password' id='cPassword' name='cPassword' onChange={handleChange} required />
                    <br />
                    <Button variant="outlined" onClick={connectWallet} sx={{ mt: 2 }}>
                        {formdata.walletAddress ? `Connected: ${formdata.walletAddress.slice(0, 6)}...` : "Connect Wallet"}
                    </Button>

                    <Button variant="contained" sx={{ mt: "30px" }} type="submit">Register</Button>
                </form>
            </Box>
        </>
    )
}

export default Register