import mongoose from "mongoose";

const Category = new mongoose.Schema({
    title: {type: String, required: true},
    user: {ref: 'users', type: mongoose.Schema.Types.ObjectId},
})

export default mongoose.model('Category', Category)