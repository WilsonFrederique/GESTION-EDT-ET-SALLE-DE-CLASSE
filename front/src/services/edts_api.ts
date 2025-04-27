import axios from "axios";

export interface Edt {
  IDEdt: number;
  IDSalle: string;
  IDNiveaux: string;
  IDParcours: string;
  IDCreneaux: number;
  IDMatiere: string;
  cinEns: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

// ➕ Créer un emploi du temps
export async function createEdt(
  data: Omit<Edt, "IDEdt">
): Promise<Edt | undefined> {
  try {
    const response = await axios.post<Edt>(`${API_BASE_URL}/edts/`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la création");
    }
    throw new Error("Erreur inattendue");
  }
}

// 🔄 Modifier un emploi du temps
export async function updateEdt(data: Edt): Promise<Edt> {
  try {
    const response = await axios.put<Edt>(
      `${API_BASE_URL}/edts/${data.IDEdt}`,
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

// ❌ Supprimer un emploi du temps
export async function deleteEdt(IDEdt: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/edts/${IDEdt}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la suppression");
    }
    throw new Error("Erreur inattendue");
  }
}

// 📄 Obtenir tous les emplois du temps
export async function getAllEdts(): Promise<Edt[]> {
  try {
    const response = await axios.get<Edt[]>(`${API_BASE_URL}/edts/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération");
    }
    throw new Error("Erreur inattendue");
  }
}

// 🔍 Obtenir un seul emploi du temps
export async function getEdt(IDEdt: number): Promise<Edt> {
  try {
    const response = await axios.get<Edt>(`${API_BASE_URL}/edts/${IDEdt}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "EDT non trouvé");
    }
    throw new Error("Erreur inattendue");
  }
}

// 📄 Obtenir tous les emplois du temps avec les dernières dates par niveau
export async function getAllEdtsWithLatestDates(): Promise<Edt[]> {
  try {
    const response = await axios.get<Edt[]>(`${API_BASE_URL}/edts/latest`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erreur lors de la récupération");
    }
    throw new Error("Erreur inattendue");
  }
}
