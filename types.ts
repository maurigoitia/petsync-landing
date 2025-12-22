import { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface PetNameResponse {
  names: string[];
  explanation: string;
}

// --- Database Schema Interfaces (Backend Alignment) ---

export type UserRole = 'vet' | 'admin' | 'tutor';
export type SubscriptionStatus = 'active' | 'inactive' | 'trial';

// Mesa 1: Organizaciones
export interface Clinic {
  id: string; // UUID
  name: string;
  subscription_status: SubscriptionStatus;
  logo_url?: string;
  created_at: string;
}

// Mesa 2: Perfiles
export interface Profile {
  id: string; // UUID (Auth)
  role: UserRole;
  clinic_id?: string; // Foreign Key -> Clinic
  email: string;
  full_name: string;
  avatar_url?: string;
}

// Mesa 3: Mascotas
export interface Pet {
  id: string; // UUID
  owner_id: string; // Foreign Key -> Profile (Tutor)
  clinic_id: string; // Foreign Key -> Clinic
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  chip_number?: string;
  birth_date?: string;
  avatar_url?: string;
}

// Mesa 4: Eventos Médicos
export interface MedicalEvent {
  id: string; // UUID
  pet_id: string; // Foreign Key -> Pet
  vet_id: string; // Foreign Key -> Profile (Vet)
  type: 'vacuna' | 'consulta' | 'cirugia' | 'estudio';
  diagnosis: string; // Visible to Tutor
  private_notes?: string; // Visible only to Vet
  created_at: string;
  files?: string[]; // URLs to PDFs/Images
}