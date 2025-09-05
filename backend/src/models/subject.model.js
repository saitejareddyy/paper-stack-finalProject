import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    title: {type: String, required: true, unique: true},
    branch: {type: String, required: true},
    image: {type: String, required: true},
    topics: {type: String, required: true},
    previousYearPapersPdf: {type: String, required: true},
    semister: {type: Number, required: true},
    credits: {type: Number, required: true},
    faculty: {type: String, required: true}
}, {timestamps: true})

export const Subject = mongoose.model("Subject", subjectSchema)