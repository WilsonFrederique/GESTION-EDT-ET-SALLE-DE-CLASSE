import axios from "axios";

// Interface correspondant à la table `matieres`
export interface Matiere {
  IDMatiere: string;
  Matiere: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer une matière
export async function createMatiere(
  data: Omit<Matiere, "IDMatiere">
): Promise<Matiere | undefined> {
  try {
    const response = await axios.post<Matiere>(
      `${API_BASE_URL}/matieres/`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création de la matière");
    }
    throw new Error("Erreur inattendue");
  }
}

// Modifier une matière
export async function updateMatiere(data: Matiere): Promise<Matiere> {
  try {
    const response = await axios.put<Matiere>(
      `${API_BASE_URL}/matieres/${data.IDMatiere}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la modification de la matière");
    }
    throw new Error("Erreur inattendue");
  }
}

// Supprimer une matière
export async function deleteMatiere(IDMatiere: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/matieres/${IDMatiere}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression de la matière");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir toutes les matières
export async function getAllMatieres(): Promise<Matiere[]> {
  try {
    const response = await axios.get<Matiere[]>(
      `${API_BASE_URL}/matieres/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération des matières");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir une matière par ID
export async function getMatiere(IDMatiere: string): Promise<Matiere> {
  try {
    const response = await axios.get<Matiere>(
      `${API_BASE_URL}/matieres/${IDMatiere}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Matière non trouvée");
    }
    throw new Error("Erreur inattendue");
  }
}
