import React from 'react';
import './infoFilter.css';

function InfoFilter({ onFiltrar}) {
    const handleCache = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    };

    const handleFiltrar = (e) => {
        e.preventDefault();
        const searchInput = document.querySelector('.filtros-pesquisar input');
        const searchValue = searchInput ? searchInput.value.trim() : '';
        if (onFiltrar) {
            onFiltrar(searchValue);
        }
    };

    return (
        <div className='info-filter'>
            <div className='filtros-pesquisar'>
                <input type="text" placeholder="Pesquisar grupos de pesquisa..." />
                <a className="btn btn-filtrar" href="#" rel="noopener noreferrer" title="Filtrar Grupos" onClick={handleFiltrar}>
                    Filtrar
                </a>
            </div>
            <a className="btn btn-cache" href="/" rel="noopener noreferrer" title="Limpar Cache" onClick={handleCache}>
                Limpar Cache 
            </a>
        </div>
    );
}

export default InfoFilter;