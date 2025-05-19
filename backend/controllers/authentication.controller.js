import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const register = async (req, res) => {
    try {
        const { username, email, password, walletAddress } = req.body;
        if (!username.trim()) {
            throw new Error("username is required")
        }
        if (!email.trim()) {
            throw new Error("email is required")
        }
        if (!password.trim()) {
            throw new Error("password is required")
        }
        if (!walletAddress.trim()) {
            throw new Error("wallet Address is required")
        }
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }, {walletAddress: walletAddress }]
        })

        // res.json(user)

        if (user) {
            throw new Error("Username or email or Wallet address is already registered")
        }


        const hashedPassword = await bcryptjs.hash(password, 10);



        const registeredUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            walletAddress: walletAddress
        })

        res.json(registeredUser)


    } catch (err) {
        res.json(err.message || "Error in registration")
    }
}

const login = async (req, res) => {
    try {
        const { identifier, password, walletAddress } = req.body;

        if (!identifier || !password) {
            throw new Error("Identfier or Password is missing ")
        }

        const loggedinUser = await User.findOne(
            { $or: [{ username: identifier }, { email: identifier }] }
        )

        if(walletAddress !== loggedinUser.walletAddress){
        return res.json("Wallet address is not same");
        }


        if (!loggedinUser) {
            throw new Error("User doesn't exist, please Register");
        }

        const isMatch = await bcryptjs.compare(password, loggedinUser.password)

        if (!isMatch) {
            throw new Error("Incorrect password")
        }

        return res.json(loggedinUser)

    } catch (err) {
        res.json(err.message || "Error in login")
    }

}

export { register, login }