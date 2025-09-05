import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
	
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		if (!localFilePath) return null;

		const ext = path.extname(localFilePath).toLowerCase();
		let resourceType = "auto";

		if (ext === ".pdf") {
			resourceType = "raw";
		}

		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: resourceType,
		});

		console.log("File uploaded to Cloudinary:", response.url);
		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
		return null;
	}
};

export { uploadOnCloudinary };
