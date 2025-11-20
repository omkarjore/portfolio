import Education from '../models/Education.js';

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find({ isActive: true }).sort({ order: 1, startYear: -1 });
    res.status(200).json({ success: true, count: education.length, data: education });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!education) return res.status(404).json({ success: false, error: 'Education not found' });
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ success: false, error: 'Education not found' });
    res.status(200).json({ success: true, data: {}, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
