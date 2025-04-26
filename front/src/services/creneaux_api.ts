import axios from "axios";

// Interface correspondant à la table `creneaux`
export interface Creneau {
  IDCreneaux?: number;
  Jours: string;
  HeureDebut: string;
  HeureFin: string;
  DateDebut: string;
  DateFin: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer un créneau
export async function createCreneau(
  data: Omit<Creneau, "IDCreneaux">
): Promise<Creneau | undefined> {
  try {
    const response = await axios.post<Creneau>(
      `${API_BASE_URL}/creneaux/`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

// Modifier un créneau
export async function updateCreneau(data: Creneau): Promise<Creneau> {
  try {
    // Formater les dates si nécessaire avant l'envoi
    const formattedData = {
      ...data,
      DateDebut: data.DateDebut,
      DateFin: data.DateFin
    };
    
    const response = await axios.put<Creneau>(
      `${API_BASE_URL}/creneaux/${data.IDCreneaux}`,
      formattedData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification du créneau");
    }
    throw new Error("Erreur inattendue");
  }
}

// Supprimer un créneau
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

// Obtenir tous les créneaux
export async function getAllCreneaux(): Promise<Creneau[]> {
  try {
    const response = await axios.get<Creneau[]>(
      `${API_BASE_URL}/creneaux/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération des créneaux");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir un créneau par ID
export async function getCreneau(IDCreneaux: number): Promise<Creneau> {
  try {
    const response = await axios.get<Creneau>(
      `${API_BASE_URL}/creneaux/${IDCreneaux}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Créneau non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}
