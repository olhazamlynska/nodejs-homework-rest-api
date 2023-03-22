const path = require('path');

const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');

const avatartDir = path.join(__dirname, '../../', 'public', 'avatart');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  try {
    const resultUload = path.join(avatartDir, filename);
    Jimp.read(tempUpload, (err, avatar) => {
      if (err) {
        throw err;
      }

      avatar.resize(250, 250).write(resultUload);
    });

    const avatarURL = path.join('avatarts', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
