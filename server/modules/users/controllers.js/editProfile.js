const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("photo");

const editProfile = async (req, res) => {
    const Users = mongoose.model("users");

    const { name, email, password, birthday, phone, city, province, profession} = req.body;

    // Handle the photo upload with multer
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: "Failed!",
                message: "Error uploading photo: " + err.message,
            });
        }

        // If there's a file uploaded, create the photo object
        let photo = undefined;
        if (req.file) {
            photo = {
                data: req.file.buffer,        // The image data (Buffer)
                contentType: req.file.mimetype,  // The MIME type of the image
            };
        }

        try {
            const updateProfile = await Users.updateOne(
                { _id: req.user._id },
                {
                    name,
                    email,
                    password,
                    photo,  
                    birthday,
                    phone,
                    city,
                    province,
                    profession
                }
            );

            if (updateProfile.nModified === 0) {
                return res.status(400).json({
                    status: "Failed!",
                    message: "No changes made to the profile.",
                });
            }

            res.status(200).json({
                status: "Profile updated!",
            });
        } catch (e) {
            res.status(400).json({
                status: "Failed!",
                error: e.message,
            });
        }
    });
};

module.exports = editProfile;
