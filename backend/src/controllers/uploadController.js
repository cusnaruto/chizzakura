const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.file.path;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'chizza',
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = { uploadImage };