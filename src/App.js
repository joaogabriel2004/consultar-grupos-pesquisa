import React, { useState, useEffect } from 'react';
import Mapa from './components/mapa/mapa';
import Info from './components/info/info';
import { wakeBackend, startKeepAlive } from './services/backendWakeup';


const App = () => {
    const [dadosEstado, setDadosEstado] = useState(null);

    useEffect(() => {
        // Inicia o keep-alive quando o app monta
        const stopKeepAlive = startKeepAlive();
        
        // Para o keep-alive se necessário
        return () => stopKeepAlive();
      }, []);

    // Função para forçar reset quando necessário
    const handleEstadoSelecionado = (novosDados) => {
        // Cria um novo objeto para forçar a atualização
        setDadosEstado(novosDados ? { ...novosDados } : null);
    };


    return (
        <div className="main-div">
            <Mapa onEstadoSelecionado={setDadosEstado} />
            <Info dados={dadosEstado} />
        </div>
    );
};

export default App;