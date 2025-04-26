import axios from "axios";

export interface Parcour {
  IDParcours: string;
  Parcours: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer un parcours
export async function createParcour(
  data: Parcour
): Promise<Parcour | undefined> {
  try {
    const response = await axios.post<Parcour>(
      `${API_BASE_URL}/parcours`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création");
    }
    throw new Error("Erreur inattendue");
  }
}

// Modifier un parcours
export async function updateParcour(data: Parcour): Promise<Parcour> {
  try {
    const response = await axios.put<Parcour>(
      `${API_BASE_URL}/parcours/${data.IDParcours}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification");
    }
    throw new Error("Erreur inattendue");
  }
}

// Supprimer un parcours
export async function deleteParcour(IDParcours: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/parcours/${IDParcours}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir tous les parcours
export async function getAllParcours(): Promise<Parcour[]> {
  try {
    const response = await axios.get<Parcour[]>(
      `${API_BASE_URL}/parcours`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir un seul parcours
export async function getParcour(IDParcours: string): Promise<Parcour> {
  try {
    const response = await axios.get<Parcour>(
      `${API_BASE_URL}/parcours/${IDParcours}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Parcours non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}
