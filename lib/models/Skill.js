import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Languages', 'Frameworks & Libraries', 'Tools & Technologies', 'Databases', 'Other'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate',
    },
    icon: {
      type: String,
      trim: true,
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
skillSchema.index({ category: 1, order: 1, isActive: 1 });

export default mongoose.model('Skill', skillSchema);
