import axios from "axios";

export interface Creneau {
  IDCreneaux?: number;
  Jours: string;
  HeureDebut: string;
  HeureFin: string;
  DateDebut: string;
  DateFin: string;
  isActive?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

export async function createCreneau(data: Omit<Creneau, "IDCreneaux">): Promise<Creneau> {
  try {
    const response = await axios.post<Creneau>(`${API_BASE_URL}/creneaux/`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function createMultipleCreneaux(creneaux: Omit<Creneau, "IDCreneaux">[]): Promise<Creneau[]> {
  try {
    const response = await axios.post<Creneau[]>(`${API_BASE_URL}/creneaux/multiple`, creneaux);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création des créneaux");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function checkExistingCreneaux(creneau: Omit<Creneau, "IDCreneaux">): Promise<boolean> {
  try {
    const response = await axios.post<{ exists: boolean }>(`${API_BASE_URL}/creneaux/check`, creneau);
    return response.data.exists;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la vérification du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function updateCreneau(data: Creneau): Promise<Creneau> {
  try {
    const response = await axios.put<Creneau>(
      `${API_BASE_URL}/creneaux/${data.IDCreneaux}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function deleteCreneau(IDCreneaux: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/creneaux/${IDCreneaux}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function getAllCreneaux(): Promise<Creneau[]> {
  try {
    const response = await axios.get<Creneau[]>(`${API_BASE_URL}/creneaux/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération des créneaux");
    }
    throw new Error("Erreur inattendue");
  }
}

export async function getCreneau(IDCreneaux: number): Promise<Creneau> {
  try {
    const response = await axios.get<Creneau>(`${API_BASE_URL}/creneaux/${IDCreneaux}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Créneau non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}