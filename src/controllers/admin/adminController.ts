// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../../config/database'
import { Admin } from '../../entities/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

const adminRepository = AppDataSource.getRepository(Admin);

// Register Admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { fname, lname, Dob, number, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = adminRepository.create({ fname, lname,number,Dob, email, password: hashedPassword });
    await adminRepository.save(admin);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register admin' });
  }
};

// Login Admin
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await adminRepository.findOneBy({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// CRUD Operations
export const getAdmins = async (_: Request, res: Response) => {
  const admins = await adminRepository.find();
  res.json(admins);
};

export const getAdminById = async (req: Request, res: Response) => {
  const admin = await adminRepository.findOneBy({ id: Number(req.params.id) });
  admin ? res.json(admin) : res.status(404).json({ error: 'Admin not found' });
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await adminRepository.findOneBy({ id: Number(req.params.id) });
    if (admin) {
      adminRepository.merge(admin, req.body);
      const result = await adminRepository.save(admin);
      res.json(result);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminRepository.delete(req.params.id);
    result.affected ? res.json({ message: 'Admin deleted' }) : res.status(404).json({ error: 'Admin not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};
