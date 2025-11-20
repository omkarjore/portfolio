import connectDB from '../lib/mongodb.js';
import About from '../models/About.js';
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

    // GET - Get about information
    if (req.method === 'GET') {
      const about = await About.findOne();

      return res.status(200).json({
        success: true,
        data: about,
      });
    }

    // PUT - Update or create about information (Protected - Admin only)
    if (req.method === 'PUT') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        // Find if about exists, if not create new one
        let about = await About.findOne();
        
        if (about) {
          // Update existing about
          about = await About.findByIdAndUpdate(about._id, req.body, {
            new: true,
            runValidators: true,
          });
        } else {
          // Create new about
          about = await About.create(req.body);
        }

        return res.status(200).json({
          success: true,
          data: about,
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
    console.error('About API error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
