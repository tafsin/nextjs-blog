import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate and sanitize input data (example)
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new Error('Invalid input data');
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: req.body.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        userName,
        email,
        password,
      },
    });

    res.status(200).json({
      text: 'User information updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      text: 'Failed to update user information',
      error: error.message, // Provide a more descriptive error message
    });
  }
}
