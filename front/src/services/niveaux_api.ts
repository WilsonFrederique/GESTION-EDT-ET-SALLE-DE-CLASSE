import axios from "axios";

export interface Niveaux {
  IDNiveaux: string;
  Niveaux: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer un niveau
export async function createNiveau(
  data: Omit<Niveaux, "IDNiveaux">
): Promise<Niveaux | undefined> {
  try {
    const response = await axios.post<Niveaux>(
      `${API_BASE_URL}/niveaux`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création du niveau");
    }
    throw new Error("Erreur inattendue");
  }
}

// Modifier un niveau
export async function updateNiveau(data: Niveaux): Promise<Niveaux> {
  try {
    const response = await axios.put<Niveaux>(
      `${API_BASE_URL}/niveaux/${data.IDNiveaux}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification du niveau");
    }
    throw new Error("Erreur inattendue");
  }
}

// Supprimer un niveau
export async function deleteNiveau(IDNiveaux: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/niveaux/${IDNiveaux}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression du niveau");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir tous les niveaux
export async function getAllNiveaux(): Promise<Niveaux[]> {
  try {
    const response = await axios.get<Niveaux[]>(
      `${API_BASE_URL}/niveaux`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération des niveaux");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir un seul niveau
export async function getNiveau(IDNiveaux: string): Promise<Niveaux> {
  try {
    const response = await axios.get<Niveaux>(
      `${API_BASE_URL}/niveaux/${IDNiveaux}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Niveau non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}
