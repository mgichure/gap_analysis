const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: 'angiemuteti@gmail.com',
        password: hashedPassword,
        firstName: 'Angie',
        lastName: 'Muteti',
        phone: '+254 700 123456',
        employeeId: 'EMP999',
        role: 'TENANT_ADMIN',
        department: 'Information Technology',
        mfaEnabled: false,
        trainingCompleted: true,
        lastTrainingDate: new Date(),
        complianceCertifications: ['ISO27001'],
        tenantId: 'tenant-equity-bank', // Use Equity Bank as the tenant
      },
    });
    
    console.log('✅ User created successfully:', user);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('ℹ️  User already exists, updating password...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const updatedUser = await prisma.user.update({
        where: { email: 'angiemuteti@gmail.com' },
        data: { password: hashedPassword }
      });
      
      console.log('✅ User password updated:', updatedUser);
    } else {
      console.error('❌ Error creating user:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
