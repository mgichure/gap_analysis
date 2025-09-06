const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    console.log('🔐 Updating password for angiemuteti@gmail.com...');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('🔑 Password hashed successfully');
    
    // Update the user's password
    const user = await prisma.user.update({
      where: { email: 'angiemuteti@gmail.com' },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Password updated successfully for:', user.email);
    console.log('👤 User ID:', user.id);
    console.log('👤 Name:', user.firstName, user.lastName);
    
  } catch (error) {
    console.error('❌ Error updating password:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();
