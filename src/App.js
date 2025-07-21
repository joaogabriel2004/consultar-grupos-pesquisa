import React, { useState } from 'react';
import Mapa from './components/mapa/mapa';
import Info from './components/info/info';

const App = () => {
    const [dadosEstado, setDadosEstado] = useState(null);

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