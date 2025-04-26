import axios from "axios";

export interface Etudiant {
  Matricule: string;
  IDNiveaux: string;
  IDParcours: string;
  Nom: string;
  Prenom: string;
  Sexe: string;
  Age: number;
  Adresse: string;
  Telephone: string;
  Email: string;
  Img: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// ➕ Créer un étudiant
export async function createEtudiant(
  data: Omit<Etudiant, "Matricule">
): Promise<Etudiant | undefined> {
  try {
    const response = await axios.post<Etudiant>(
      `${API_BASE_URL}/etudiants/`,
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

// 🔄 Modifier un étudiant
export async function updateEtudiant(data: Etudiant): Promise<Etudiant> {
  try {
    const response = await axios.put<Etudiant>(
      `${API_BASE_URL}/etudiants/${data.Matricule}`,
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

// ❌ Supprimer un étudiant
export async function deleteEtudiant(Matricule: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/etudiants/${Matricule}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression");
    }
    throw new Error("Erreur inattendue");
  }
}

// 📄 Obtenir tous les étudiants
export async function getAllEtudiants(): Promise<Etudiant[]> {
  try {
    const response = await axios.get<Etudiant[]>(`${API_BASE_URL}/etudiants/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erreur lors de la récupération"
      );
    }
    throw new Error("Erreur inattendue");
  }
}

// 🔍 Obtenir un seul étudiant
export async function getEtudiant(Matricule: string): Promise<Etudiant> {
  try {
    const response = await axios.get<Etudiant>(
      `${API_BASE_URL}/etudiants/${Matricule}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Étudiant non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}
