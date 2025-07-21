const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getGruposPorEstado = async (estado) => {
    try {
      console.log(process.env)
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(estado)}`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };