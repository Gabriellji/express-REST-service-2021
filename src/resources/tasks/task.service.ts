import { getRepository } from 'typeorm';
import { Task } from '../../entities/task.entity';

const getAllTasks = async (): Promise<Task[]> =>
  await getRepository(Task).find();

const getTaskById = async (id: string): Promise<Task | undefined> => {
  const task = await getRepository(Task).findOne(id);
  return task;
};

const createTask = async (data: Task): Promise<Task> => {
  const newTask: Task = getRepository(Task).create({
    ...data,
  });
  const results = await getRepository(Task).save(newTask);
  return results;
};

const updateTask = async (id: string, updatedTask: Task): Promise<Task> => {
  const taskToUpdate = await getRepository(Task).findOne(id);
  if (!taskToUpdate) {
    throw new Error('Task not found');
  }
  getRepository(Task).merge(taskToUpdate, updatedTask);
  const taskToSave = await getRepository(Task).save(taskToUpdate);
  return taskToSave;
};

const removeTask = async (id: string): Promise<void> => {
  await getRepository(Task).delete(id);
};

export { getAllTasks, getTaskById, createTask, updateTask, removeTask };
