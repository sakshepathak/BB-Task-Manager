import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
        where: { userId: req.userId },
        orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, priority, deadline, status } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        status: status || "PENDING",
        deadline: deadline ? new Date(deadline) : null,
        userId: req.userId!,
      },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  const { title, description, priority, deadline, status } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id, userId: req.userId },
      data: { 
        title, 
        description, 
        priority, 
        deadline: deadline ? new Date(deadline) : undefined,
        status
      },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  try {
    const task = await prisma.task.findFirst({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { status: newStatus },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  try {
    await prisma.task.delete({ where: { id, userId: req.userId } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
