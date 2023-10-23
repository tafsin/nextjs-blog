import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the user ID from the request parameters (or query if it's in the URL)
    const userEmail = Array.isArray(req.query.email)
                     ? req.query.email[0]
                     : req.query.email;

    if (!userEmail) {
      throw new Error('User ID is required');
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete the user
    await prisma.user.delete({
      where: { email: userEmail },
    });

    res.status(200).json({
      text: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      text: 'Failed to delete user',
      error: error.message,
    });
  }
}
