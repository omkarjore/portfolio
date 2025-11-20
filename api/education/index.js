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

  try {
    await connectDB();

    // GET - Get all education entries
    if (req.method === 'GET') {
      const { active } = req.query;
      const query = active === 'true' ? { isActive: true } : {};
      const education = await Education.find(query).sort({ order: 1, startYear: -1 });

      return res.status(200).json({
        success: true,
        count: education.length,
        data: education,
      });
    }

    // POST - Create new education entry (Protected - Admin only)
    if (req.method === 'POST') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const education = await Education.create(req.body);

        return res.status(201).json({
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

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Education API error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Education entry already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
