import dbConnect from '@/db/connect';
import TaskModel from '@/db/models/Task';
import { Task } from '@/types/tasks';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>,
): Promise<void> {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const tasks = await TaskModel.find({ completed: false }).sort(
        '-created_at',
      );
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch tasks' });
    }
  }
}
