import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';
// The response is defined here
type ResponseData = {
  text: string;
  data?: object;
};
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Get the ID sent with the request
    const userId = req.query.id;
    if (userId === undefined) {
      res.status(400).json({ text: 'Missing ID parameter'});
      return;
    }
    // Check if the passed ID is valid or not
    const id: number = parseInt(userId as string);
    if (!isNaN(id)) {
      const user = await prisma.demoUser.findUnique({
        where: {
          id: id
        }
      });
      if (user === null) {
        res.status(404).json({ text: 'User not found of ID ${id}' });
        return;
      }
      res.status(200).json({ text: 'Success', data: user });
    } else {
      console.error(error);
      res.status(400).json({ text: 'Invalid ID format' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ text: 'Failed to fetch Driver User'});
  }
}