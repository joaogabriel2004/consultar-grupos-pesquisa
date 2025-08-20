import React, { useState, useEffect } from 'react';
import './info.css';
import InfoFilter from './infoFilter';

const Info = ({ dados }) => {
  const [filtro, setFiltro] = useState('');
  const [gruposFiltrados, setGruposFiltrados] = useState(dados?.grupos || []);

  useEffect(() => {
    if (dados && filtro) {
      setGruposFiltrados(
        dados.grupos.filter(grupo =>
          grupo.nome.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    } else if (dados) {
      setGruposFiltrados(dados.grupos);
    }
  }, [dados, filtro]);
    
  // Se não houver dados, mostra mensagem padrão
  if (!dados) {
    return (
      <div className="info-container info-vazio">
        <div className="info-placeholder">
          <i className="fas fa-map-marked-alt"></i>
          <h3>Selecione um estado no mapa</h3>
          <p>Clique em um estado para visualizar os grupos de pesquisa</p>
        </div>
      </div>
    );
  }

  // Se houver dados mas nenhum grupo
  if (dados.grupos.length === 0) {
    return (
      <div className="info-container">
        <h2 className="info-title">
          <i className="fas fa-map-marker-alt"></i> {dados.estado}
        </h2>
        <div className="info-empty">
          <i className="fas fa-info-circle"></i>
          <p>Nenhum grupo de pesquisa encontrado neste estado</p>
        </div>
      </div>
    );
  }

  // Caso normal com grupos
  return (
    <div className="info-container">
      <div className="info-header">
        <h2 className="info-title">
          <i className="fas fa-map-marker-alt"></i> Grupos em <span>{dados.estado}</span>
        </h2>
        <div className="info-count">{gruposFiltrados.length} grupo(s) encontrado(s)</div>

        <InfoFilter onFiltrar={setFiltro}/>
      </div>

      <div className="grupos-lista">
        {gruposFiltrados.map(grupo => (
          <div key={grupo.id} className="grupo-card">
            <div className="grupo-header">
              {grupo.logo && (
                <img 
                  src={grupo.logo} 
                  alt={`Logo ${grupo.nome}`} 
                  className="grupo-logo" 
                  onError={(e) => {
                    e.target.src = 'https://media.istockphoto.com/id/2147589548/pt/vetorial/white-gradient-background-abstract-studio-presentation-product-vector-illustration.jpg?s=612x612&w=0&k=20&c=Qcxn7yW_qtfdB-1ABHojTxK6AdwJXXBeGaeIK-nU2OA=';
                  }}
                />
              )}
              <div className="grupo-titulo">
                <h3>{grupo.nome}</h3>
                {grupo.sigla && <span className="grupo-sigla">{grupo.sigla}</span>}
              </div>
            </div>

            <div className="grupo-body">
              <div className="grupo-info">
                <p>
                  <i className="fas fa-university"></i>
                  <strong>Instituição:</strong> {grupo.instituicao}
                </p>
                
                <p>
                  <i className="fas fa-map-pin"></i>
                  <strong>Cidade:</strong> {grupo.cidade}
                </p>

                {grupo.areasConcentracao?.length > 0 && (
                  <div className="grupo-areas">
                    <h4>
                      <i className="fas fa-flask"></i>
                      Áreas de Pesquisa
                    </h4>
                    <div className="tags">
                      {grupo.areasConcentracao.map((area, index) => (
                        <span key={index} className="tag">{area}</span>
                      ))}
                    </div>
                  </div>
                )}

                {grupo.descricao && (
                  <div className="grupo-descricao">
                    <h4>
                      <i className="fas fa-info-circle"></i>
                      Sobre o Grupo
                    </h4>
                    <p>{grupo.descricao}</p>
                  </div>
                )}
              </div>

              <div className="grupo-footer">
                <div className="grupo-contatos">
                  {grupo.email && (
                    <a href={`mailto:${grupo.email}`} className="btn btn-email">
                      <i className="fas fa-envelope"></i> Email
                    </a>
                  )}

                  {grupo.website && (
                    <a 
                      href={grupo.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-site"
                    >
                      <i className="fas fa-globe"></i> Site
                    </a>
                  )}
                </div>

                {grupo.redes && (
                  <div className="grupo-redes">
                    <h4>
                      <i className="fas fa-share-alt"></i>
                      Redes Sociais
                    </h4>
                    <div className="social-links">
                      {grupo.redes.lattes && (
                        <a 
                          href={grupo.redes.lattes} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn lattes"
                          title="Currículo Lattes"
                        >
                          <i className="ai ai-lattes"></i>
                        </a>
                      )}
                      {grupo.redes.linkedin && (
                        <a 
                          href={grupo.redes.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn linkedin"
                          title="LinkedIn"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <a 
                  href="#"
                  rel="noopener noreferrer" 
                  className="btn btn-edit"
                  title="Editar"
                >
                  <i class="fas fa-edit"></i> Editar
                  
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;