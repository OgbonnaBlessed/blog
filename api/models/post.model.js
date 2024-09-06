import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://verpex.com/assets/uploads/images/blog/How-Many-Blogs-Should-You-Post-a-Wee.webp?v=1678462713',
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;