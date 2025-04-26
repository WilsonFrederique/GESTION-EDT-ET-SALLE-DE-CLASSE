import axios from "axios";

// Interface correspondant à la table `salles`
export interface Salle {
  IDSalle: string;
  Salle: string;
  Disponibilite: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer une salle
export async function createSalle(
  data: Omit<Salle, "IDSalle">
): Promise<Salle | undefined> {
  try {
    const response = await axios.post<Salle>(
      `${API_BASE_URL}/salles/`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création de la salle");
    }
    throw new Error("Erreur inattendue");
  }
}

// Modifier une salle
export async function updateSalle(data: Salle): Promise<Salle> {
  try {
    const response = await axios.put<Salle>(
      `${API_BASE_URL}/salles/${data.IDSalle}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification de la salle");
    }
    throw new Error("Erreur inattendue");
  }
}

// Supprimer une salle
export async function deleteSalle(IDSalle: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/salles/${IDSalle}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression de la salle");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir toutes les salles
export async function getAllSalles(): Promise<Salle[]> {
  try {
    const response = await axios.get<Salle[]>(
      `${API_BASE_URL}/salles/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération des salles");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir une salle par ID
export async function getSalle(IDSalle: string): Promise<Salle> {
  try {
    const response = await axios.get<Salle>(
      `${API_BASE_URL}/salles/${IDSalle}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Salle non trouvée");
    }
    throw new Error("Erreur inattendue");
  }
}
