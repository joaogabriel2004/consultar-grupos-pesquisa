import { useState, useEffect } from 'react';
import { wakeBackend } from '../../services/backendWakeup';
import './backendLoader.css';

export default function BackendLoader({ children }) {
  const [status, setStatus] = useState({
    loading: true,
    message: 'Conectando ao servidor...',
    attempts: 0
  });

  useEffect(() => {
    let mounted = true;
    const maxAttempts = 5;

    const checkBackend = async (attempt = 1) => {
      if (!mounted || attempt > maxAttempts) return;

      try {
        const isReady = await wakeBackend();
        
        if (mounted) {
          if (isReady) {
            setStatus({
              loading: false,
              message: 'Conexão estabelecida!',
              attempts: attempt
            });
          } else {
            setStatus({
              loading: true,
              message: `Tentativa ${attempt}/${maxAttempts}...`,
              attempts: attempt
            });
            setTimeout(() => checkBackend(attempt + 1), 15000);
          }
        }
      } catch (error) {
        if (mounted) {
          setStatus({
            loading: true,
            message: `Erro: ${error.message}`,
            attempts: attempt
          });
        }
      }
    };

    checkBackend();

    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) {
    return (
      <div className="backend-loader">
        <div className="spinner"></div>
        <p>{status.message}</p>
        {status.attempts > 3 && (
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  return children;
}