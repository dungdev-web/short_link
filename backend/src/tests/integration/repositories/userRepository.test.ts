import { PrismaClient } from '@prisma/client';
import PostgresUserRepository from '../../../infrastructure/repository/postgresUserRepository';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const repo = new PostgresUserRepository();

describe('PostgresUserRepository', () => {
  const testUserData = {
    username: 'testuser',
    email: 'test@example.com',
    passwordHash: 'hashed_password_example',
  };

  beforeAll(async () => {
    // Xoá trước nếu đã tồn tại
    await prisma.users.deleteMany({
      where: {
        OR: [
          { email: testUserData.email },
          { username: testUserData.username },
        ],
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a user and return it', async () => {
    const createdUser = await repo.create(testUserData);
    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(testUserData.email);
    expect(createdUser.username).toBe(testUserData.username);
  });

  test('should find user by email', async () => {
    const user = await repo.findByEmail(testUserData.email);
    expect(user).not.toBeNull();
    expect(user?.email).toBe(testUserData.email);
  });

  test('should find user by username', async () => {
    const user = await repo.findByUsername(testUserData.username);
    expect(user).not.toBeNull();
    expect(user?.username).toBe(testUserData.username);
  });
});
