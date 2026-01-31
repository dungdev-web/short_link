const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostgresTaskRepository {
  async createTask(data) {
    return await prisma.task.create({
      data
    });
  }

  async findById(id) {
    return await prisma.task.findUnique({
      where: { id: Number(id) }
    });
  }

  async updateStatus(id, status, proofUrl = null) {
    return await prisma.task.update({
      where: { id: Number(id) },
      data: {
        status,
        ...(proofUrl && { proofUrl })
      }
    });
  }
}

module.exports = PostgresTaskRepository;
