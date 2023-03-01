import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET': {
      try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
      }
      break;
    }

    case 'POST': {
      const { description } = body;
      try {
        const newTask = await prisma.task.create({
          data: { description },
        });
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
      }
      break;
    }

    case 'PUT': {
      const { id } = query;
      const { description, completed } = body;
      try {
        const updatedTask = await prisma.task.update({
          where: { id: Number(id) },
          data: { description, completed },
        });
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
      }
      break;
    }

    case 'DELETE': {
      const { id } = query;
      try {
        const deletedTask = await prisma.task.delete({
          where: { id: Number(id) },
        });
        res.status(200).json(deletedTask);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
      }
      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${method} not allowed` });
    }
  }
}
