const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      imageName
    );
    await fs.rename(tmpUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
