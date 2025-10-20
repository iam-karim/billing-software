import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { createClientSchema, updateClientSchema, queryClientSchema } from '../validations/client.schema';
import { ClientModel } from '../models/client.model';

// GET /api/clients
export const clientController = {
  getClients: asyncHandler(async (req: Request, res: Response) => {
    const query = queryClientSchema.parse(req.query);

    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const searchFilter = query.search
      ? {
          $or: [
            { name: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } },
            { company: { $regex: query.search, $options: 'i' } },
          ],
        }
      : {};

    const clients = await ClientModel.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ClientModel.countDocuments(searchFilter);

    res.json({ clients, total, page, limit });
  }),

  // GET /api/clients/:id
  getClientById: asyncHandler(async (req: Request, res: Response) => {
    const client = await ClientModel.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  }),

  // POST /api/clients
  createClient: asyncHandler(async (req: Request, res: Response) => {
    const data = createClientSchema.parse(req.body);
    const client = new ClientModel(data);
    await client.save();
    res.status(201).json(client);
  }),

  // PUT /api/clients/:id
  updateClient: asyncHandler(async (req: Request, res: Response) => {
    const data = updateClientSchema.parse(req.body);
    const client = await ClientModel.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  }),

  // DELETE /api/clients/:id
  deleteClient: asyncHandler(async (req: Request, res: Response) => {
    const client = await ClientModel.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(204).send();
  }),
};
