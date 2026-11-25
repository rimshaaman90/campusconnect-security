
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const FileType = require("file-type");

// Store the image temporarily in memory
const storage = multer.memoryStorage();

// Accept only JPG and PNG files
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG images are allowed!"));
        }
    }
});

// Profile image upload route
router.post("/upload", (req, res) => {
    upload.single("profilePicture")(req, res, async (err) => {

        if (err) {
            if (err instanceof multer.MulterError &&
                err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).send("Image is too large! Maximum size is 2MB.");
            }

            return res.status(400).send(err.message);
        }

        if (!req.file) {
            return res.status(400).send("Please select an image.");
        }

        try {
            // Check the actual image format
            const detectedType = await FileType.fromBuffer(req.file.buffer);

            if (!detectedType ||
                !["image/jpeg", "image/png"].includes(detectedType.mime)) {
                return res.status(400).send("Invalid image content! Only JPG and PNG are allowed.");
            }

            // Create a unique filename
            const extension = detectedType.mime === "image/jpeg" ? ".jpg" : ".png";
            const filename = crypto.randomUUID() + extension;

            const uploadFolder = path.join(__dirname, "..", "private_uploads");

            await fs.promises.mkdir(uploadFolder, { recursive: true });

            await fs.promises.writeFile(
                path.join(uploadFolder, filename),
                req.file.buffer
            );

            res.send("Profile image uploaded securely!");

        } catch (error) {
            console.error(error);
            res.status(500).send("Image upload failed.");
        }
    });
});

module.exports = router;
