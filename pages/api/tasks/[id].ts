import TaskModel from '@/db/models/Task';
import dbConnect from '@/db/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { Task } from '@/types/tasks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string } | { status: string }>,
) {
  const { id } = req.query;

  if (!id) {
    return;
  }
  await dbConnect();

  if (req.method === 'DELETE') {
    await TaskModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Success!' });
  }

  if (req.method === 'PUT') {
    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ status: 'Task not found' });
      return;
    }

    await TaskModel.findByIdAndUpdate(id, {
      $set: { title: req.body.title },
    });

    res.status(200).json({
      status: `Task ${id} was successfully edited!`,
    });
  }

  if (req.method === 'PATCH') {
    let task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ status: 'Task not found' });
      return;
    }

    task = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: { completed: !task.completed },
      },
      { new: true },
    );

    res.status(200).json(task);
  }
}
