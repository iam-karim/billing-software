import { Router } from 'express';
import { authController } from './controllers/auth.controller';
import { userController } from './controllers/user.controller';
import { clientController } from './controllers/client.controller';
import { invoiceController } from './controllers/invoice.controller';
import { superAdminController } from './controllers/superAdmin.controller';
import { authenticate } from './middlewares/auth.middleware';
import { authorize } from './middlewares/authorize.middleware';

const router = Router();

// Auth
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.post('/api/auth/logout', authenticate, authController.logout);

// User
router.get('/api/user/profile', authenticate, userController.getProfile);
router.put('/api/user/profile', authenticate, userController.updateProfile);

// Clients
router.get('/api/clients', authenticate, clientController.getClients);
router.post('/api/clients', authenticate, clientController.createClient);
// etc...

// Invoices
router.get('/api/invoices', authenticate, invoiceController.getInvoices);
// etc...

// Super Admin (protect with role)
router.get('/api/super-admin/users', authenticate, authorize(['SUPER_ADMIN']), superAdminController.getUsers);
router.put('/api/super-admin/users/:id/role', authenticate, authorize(['SUPER_ADMIN']), superAdminController.updateUserRole);
router.get('/api/super-admin/analytics', authenticate, authorize(['SUPER_ADMIN']), superAdminController.getAnalytics);
router.get('/api/super-admin/plans', authenticate, authorize(['SUPER_ADMIN']), superAdminController.getPlans);
router.post('/api/super-admin/plans', authenticate, authorize(['SUPER_ADMIN']), superAdminController.createPlan);

export default router;
