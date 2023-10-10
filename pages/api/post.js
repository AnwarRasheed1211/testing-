// pages/api/createScholarship.js
import connectDB from '../../lib/db';
import Scholarship from '../../models/Work';

connectDB();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      const scholarship = new Scholarship(formData);
      await scholarship.save();
      res.status(201).json(scholarship);
    } catch (error) {
      console.error('Error creating scholarship:', error);
      res.status(500).json({ error: 'Unable to create scholarship' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
