import About from '../models/About.js';

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: about || {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      about = await About.create(req.body);
    }

    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
