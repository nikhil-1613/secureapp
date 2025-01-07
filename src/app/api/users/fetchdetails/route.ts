import { NextApiRequest, NextApiResponse } from 'next';

import Details from '@/models/userDetails';
import { connect } from '@/dbConfig/dbConfig';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Ensure DB connection
      await connect();

      // Extract user email from the query (assumes user is authenticated and email is passed)
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Fetch user details
      const userDetails = await Details.findOne({ email });
      if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Respond with user details
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
