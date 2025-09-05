import { Subject } from "../models/subject.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'

const addSubject = async (req, res) => {
	try {
		const { title, semister, branch, credits, faculty, topics } = req.body;

		const coverImagePath = req.files?.coverImage?.[0]?.path;
		const paperPdfPath = req.files?.paperPdf?.[0]?.path;

		if (!coverImagePath) {
			return res.status(400).json({ success: false, message: "Cover image is required" });
		}

		if (!paperPdfPath) {
			return res.status(400).json({ success: false, message: "Previous year paper PDF is required" });
		}

		const coverImage = await uploadOnCloudinary(coverImagePath);
		const paperPdf = await uploadOnCloudinary(paperPdfPath);

		if (!coverImage) return res.status(400).json({ success: false, message: "Cover image not uploaded to Cloudinary" });
		if (!paperPdf) return res.status(400).json({ success: false, message: "Paper PDF not uploaded to Cloudinary" });

		await Subject.create({
			title,
			branch,
			image: coverImage.secure_url,
			topics,
			previousYearPapersPdf: paperPdf.secure_url,
			semister,
			credits,
			faculty,
		});

		res.status(200).json({ success: true, message: "Subject added successfully" });
	} catch (error) {
		console.error("Error in addSubject:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};



const removeSubject = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await Subject.findByIdAndDelete(id);

		if (!data) {
			return res.status(404).json({ success: false, message: "Subject not found" });
		}

		res.status(200).json({ success: true, message: "Subject deleted successfully" });

	} catch (error) {
		console.log("Error in the remove subject controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal server error" })
	}
}

const getSubjectsData = async (req, res) => {
	try {
		const subjectsData = await Subject.find();
		res.status(200).json({success: true, subjectsData})
	} catch (error) {
		console.log("Error in get subjects data controller: ", error.message);
		res.status(400).json({success: false, message: "Internal server error"})
	}
}


const getSubject = async (req, res) => {
	try {
		const { id } =  req.params;

		const subject = await Subject.findById(id);
		if(!subject){
			return res.status(400).json({success: false, message: "Subject not found"})
		}
		res.status(200).json({success: true, subject})
		
	} catch (error) {
		console.log("Error in the getSubject controller: ", error.message);
		res.status(500).json({success: false, message: "Internal server error"})
	}
}


export { addSubject, removeSubject, getSubjectsData, getSubject };
