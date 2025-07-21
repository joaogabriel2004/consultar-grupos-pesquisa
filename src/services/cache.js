export const GrupoCache = {
    get: (estado) => {
      const cacheKey = `grupos_${estado}`;
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    },
  
    set: (estado, data) => {
      const cacheKey = `grupos_${estado}`;
      localStorage.setItem(cacheKey, JSON.stringify(data));
      // Adiciona timestamp de atualização
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    },
  
    clear: (estado) => {
      const cacheKey = `grupos_${estado}`;
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(`${cacheKey}_timestamp`);
    },
  
    needsRefresh: (estado, maxAgeHours = 24) => {
      const cacheKey = `grupos_${estado}`;
      const timestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      if (!timestamp) return true;
      
      const ageMs = Date.now() - parseInt(timestamp);
      return ageMs > (maxAgeHours * 60 * 60 * 1000);
    },
  
    clearAll: () => {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('grupos_')) {
          localStorage.removeItem(key);
        }
      });
    }
  };