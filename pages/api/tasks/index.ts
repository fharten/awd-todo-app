import dbConnect from '@/db/connect';
import TaskModel from '@/db/models/Task';
import { Task } from '@/types/tasks';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { error: string }>,
) {
  await dbConnect();

  if (req.method === 'GET') {
    const tasks = await TaskModel.find().sort('-created_at');
    return res.status(200).json(tasks);
  }

  if (req.method === 'POST') {
    try {
      const taskTitle = req.body;
      const task = new TaskModel(taskTitle);
      const record = await task.save();
      return res.status(201).json(record);
    } catch (error: any | unknown) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
