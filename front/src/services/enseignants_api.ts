import axios from "axios";

export interface Enseignant {
  cinEns: string;
  Nom: string;
  Prenom: string;
  Sexe: string;
  Grade: string;
  Adresse: string;
  Telephone: string;
  Email: string;
  Specialite: string;
  Descriptions: string;
  Img: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// Créer un enseignant
export async function createEnseignant(
  data: Omit<Enseignant, "cinEns">
): Promise<Enseignant | undefined> {
  try {
    const response = await axios.post<Enseignant>(
      `${API_BASE_URL}/enseignants/`,
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

// Modifier un enseignant
export async function updateEnseignant(data: Enseignant): Promise<Enseignant> {
  try {
    const response = await axios.put<Enseignant>(
      `${API_BASE_URL}/enseignants/${data.cinEns}`,
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

// Supprimer un enseignant
export async function deleteEnseignant(cinEns: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/enseignants/${cinEns}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir tous les enseignants
export async function getAllEnseignants(): Promise<Enseignant[]> {
  try {
    const response = await axios.get<Enseignant[]>(
      `${API_BASE_URL}/enseignants/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération");
    }
    throw new Error("Erreur inattendue");
  }
}

// Obtenir un seul enseignant
export async function getEnseignant(cinEns: string): Promise<Enseignant> {
  try {
    const response = await axios.get<Enseignant>(
      `${API_BASE_URL}/enseignants/${cinEns}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Enseignant non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}
