import User from '../models/User.js';

export const syncAdminCredentials = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cardtechno.com';
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envPassword) {
      return; // If no password is set in env, do nothing
    }

    let admin = await User.findOne({ email: adminEmail }).select('+password');

    if (!admin) {
      // Create admin if doesn't exist
      await User.create({
        name: 'Admin CARD Technocrats',
        email: adminEmail,
        password: envPassword,
        role: 'admin',
      });
      console.log(`[Sync] Admin user created with email: ${adminEmail}`);
      return;
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(envPassword);
    
    if (!isMatch) {
      // Password in DB doesn't match the one in .env, so we update the DB
      admin.password = envPassword;
      await admin.save();
      console.log(`[Sync] Admin password was automatically updated from environment variables.`);
    } else {
      console.log(`[Sync] Admin credentials are up to date.`);
    }

  } catch (error) {
    console.error(`[Sync] Error syncing admin credentials: ${error.message}`);
  }
};
