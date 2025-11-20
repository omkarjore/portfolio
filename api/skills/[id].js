import connectDB from '../../lib/mongodb.js';
import Skill from '../../lib/models/Skill.js';
import { protect, authorize } from '../../lib/auth.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  try {
    await connectDB();

    // GET - Get single skill
    if (req.method === 'GET') {
      const skill = await Skill.findById(id);

      if (!skill) {
        return res.status(404).json({
          success: false,
          error: 'Skill not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: skill,
      });
    }

    // PUT - Update skill (Protected - Admin only)
    if (req.method === 'PUT') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const skill = await Skill.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!skill) {
          return res.status(404).json({
            success: false,
            error: 'Skill not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: skill,
        });
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message,
        });
      }
    }

    // DELETE - Delete skill (Protected - Admin only)
    if (req.method === 'DELETE') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const skill = await Skill.findByIdAndDelete(id);

        if (!skill) {
          return res.status(404).json({
            success: false,
            error: 'Skill not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: {},
          message: 'Skill deleted successfully',
        });
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message,
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Skill API error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
