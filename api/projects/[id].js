import connectDB from '../../lib/mongodb.js';
import Project from '../../lib/models/Project.js';
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

    // GET - Get single project
    if (req.method === 'GET') {
      const project = await Project.findOne({ id });

      if (!project) {
        return res.status(404).json({
          success: false,
          error: 'Project not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: project,
      });
    }

    // PUT - Update project (Protected - Admin only)
    if (req.method === 'PUT') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const project = await Project.findOneAndUpdate({ id }, req.body, {
          new: true,
          runValidators: true,
        });

        if (!project) {
          return res.status(404).json({
            success: false,
            error: 'Project not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: project,
        });
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message,
        });
      }
    }

    // DELETE - Delete project (Protected - Admin only)
    if (req.method === 'DELETE') {
      try {
        const user = await protect(req);
        authorize(user, 'admin');

        const project = await Project.findOneAndDelete({ id });

        if (!project) {
          return res.status(404).json({
            success: false,
            error: 'Project not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: {},
          message: 'Project deleted successfully',
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
    console.error('Project API error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
}
