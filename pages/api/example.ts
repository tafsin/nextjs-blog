// pages/api/example.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Access the request body
    const data = req.body;

    // Process the data and send a response
    res.status(200).json({ message: 'POST request received', data });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
