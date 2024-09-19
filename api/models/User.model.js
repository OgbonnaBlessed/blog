import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;