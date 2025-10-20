import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../src/models/user.model';
import { SubscriptionModel } from '../src/models/subscription.model';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI as string;

async function main(){
  await mongoose.connect(MONGO_URI);
  const existing = await UserModel.findOne({ email: 'super@invoicepro.test' });
  if (!existing) {
    const hashed = await bcrypt.hash('SuperSecret123', Number(process.env.BCRYPT_SALT_ROUNDS || 10));
    await UserModel.create({ name: 'Super Admin', email: 'super@invoicepro.test', password: hashed, role: 'SUPER_ADMIN' });
    console.log('Super admin created: super@invoicepro.test / SuperSecret123');
  }
  const plan = await SubscriptionModel.findOne({ name: 'Starter' });
  if (!plan) {
    await SubscriptionModel.create({ name: 'Starter', price: 0, billingPeriod: 'monthly', features: ['Basic Invoicing'], isActive: true });
    await SubscriptionModel.create({ name: 'Pro', price: 25, billingPeriod: 'monthly', features: ['Unlimited Invoices'], isActive: true });
    console.log('Default plans created');
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
