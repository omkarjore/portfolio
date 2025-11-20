import connectDB from '../lib/mongodb.js';
import Education from '../models/Education.js';
import { protect, authorize } from '../lib/auth.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
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

    // GET - Get single education entry
    if (req.method === 'GET') {
      const education = await Education.findById(id);

      if (!education) {
        return res.status(404).json({
          success: false,
          error: 'Education entry not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: education,
      });
    }

    // PUT - Update education entry (Protected - Admin only)
    if (req.method === 'PUT') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const education = await Education.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!education) {
          return res.status(404).json({
            success: false,
            error: 'Education entry not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: education,
        });
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message,
        });
      }
    }

    // DELETE - Delete education entry (Protected - Admin only)
    if (req.method === 'DELETE') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const education = await Education.findByIdAndDelete(id);

        if (!education) {
          return res.status(404).json({
            success: false,
            error: 'Education entry not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: {},
          message: 'Education entry deleted successfully',
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
    console.error('Education API error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
