import mongoose from "mongoose";

const Pomodoro = new mongoose.Schema({
    duration: {type: Number, required: true},
    dateCreated: {type: Date, default: Date.now},
    user: {ref: 'users', type: mongoose.Schema.Types.ObjectId},
    category: {ref: 'categories', type: mongoose.Schema.Types.ObjectId},
})

export default mongoose.model('Pomodoro', Pomodoro)