import { User } from "../models/user.model.js";

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return res.json(user);
}catch(err){
    return res.json(err.message || "An error occurred while fetching user details");
}
}

const completeUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { fullName, bio, linkedin, portfolio } = req.body;

        if (!fullName || !bio || !linkedin || !portfolio) {
            throw new Error("All fields are required");
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, bio, linkedin, portfolio },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found or updation failed");
        }

        return res.json(updatedUser);
    } catch (err) {
        return res.json(err.message || "Error occurred while updating your profile");
    }
};


export { getUserDetails, completeUserProfile };