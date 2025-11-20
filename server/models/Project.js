import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Tech stack cannot be empty',
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Please provide a valid GitHub URL'],
    },
    metrics: {
      type: String,
      trim: true,
    },
    isHero: {
      type: Boolean,
      default: false,
    },
    position: {
      type: [Number],
      default: [0, 0, 0],
      validate: {
        validator: function (v) {
          return v.length === 3;
        },
        message: 'Position must be an array of 3 numbers [x, y, z]',
      },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
projectSchema.index({ order: 1, isActive: 1 });

export default mongoose.model('Project', projectSchema);
