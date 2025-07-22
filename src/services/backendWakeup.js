// Configurações
const BACKEND_URL = process.env.REACT_APP_API_URL;
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos

// Função principal para "acordar" o backend
export const wakeBackend = async () => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'HEAD', // Chamada leve
      cache: 'no-store',
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend está iniciando... (pode levar até 30s no Render)');
    return false;
  }
};

// Serviço de keep-alive (chamadas periódicas)
export const startKeepAlive = () => {
  // Primeira verificação imediata
  wakeBackend();

  // Configura chamadas periódicas
  const intervalId = setInterval(() => {
    wakeBackend().then(ready => {
      if (ready) console.log('Backend ativo (keep-alive)');
    });
  }, CHECK_INTERVAL);

  // Retorna função para parar o keep-alive
  return () => {
    clearInterval(intervalId);
  };
};