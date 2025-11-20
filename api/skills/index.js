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

  try {
    await connectDB();

    // GET - Get all skills
    if (req.method === 'GET') {
      const { active, category } = req.query;
      const query = {};
      
      if (active === 'true') {
        query.isActive = true;
      }
      
      if (category) {
        query.category = category;
      }
      
      const skills = await Skill.find(query).sort({ category: 1, order: 1, createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: skills.length,
        data: skills,
      });
    }

    // POST - Create new skill (Protected - Admin only)
    if (req.method === 'POST') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const skill = await Skill.create(req.body);

        return res.status(201).json({
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

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Skills API error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Skill already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
