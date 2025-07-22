import { getGruposPorEstado } from '../services/api';
import { GrupoCache } from '../services/cache';

export function configurarEventos(estadoAtivoRef, onEstadoSelecionado) {
  const aplicarHover = (el) => {
    const zoomLayer = document.getElementById('layer-zoom');
    if (zoomLayer) zoomLayer.appendChild(el);

    el.style.transform = 'scale(1.2)';
    el.style.transformOrigin = 'center';
    el.style.transformBox = 'fill-box';
    el.style.transition = 'transform 0.3s ease';
  };

  const removerHover = (el) => {
    el.style.transform = 'scale(1)';
  };

  const clickEstado = async (el) => {
    const nome = el.dataset.nome;
    const codigo = el.dataset.codigo;
    const link = el.dataset.link;

    // Remove a cor do estado anterior (se existir)
    if (estadoAtivoRef.current) {
      estadoAtivoRef.current.style.fill = estadoAtivoRef.current.dataset.fillOriginal || '';
    }

    // Aplica a cor ao novo estado clicado
    el.style.fill = '#fc9d03';
    estadoAtivoRef.current = el;

    try {
      // Verifica cache e necessidade de atualização
      let grupos = GrupoCache.get(nome);
      const shouldRefresh = GrupoCache.needsRefresh(nome);
      
      if (!grupos || shouldRefresh) {
        grupos = await getGruposPorEstado(nome);
        GrupoCache.set(nome, grupos);
      }

      if (onEstadoSelecionado) {
        onEstadoSelecionado({
          estado: nome,
          codigo,
          link,
          grupos,
          fromCache: !shouldRefresh
        });
      }
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
      
      // Fallback para cache existente
      const cached = GrupoCache.get(nome);
      if (cached && onEstadoSelecionado) {
        onEstadoSelecionado({
          estado: nome,
          codigo,
          link,
          grupos: cached,
          fromCache: true,
          error: true
        });
      } else {
        onEstadoSelecionado(null);
      }
    }
  };

  // Guarda cor original para restaurar depois
  document.querySelectorAll('g.estado').forEach(el => {
    if (!el.dataset.fillOriginal) {
      el.dataset.fillOriginal = el.style.fill || '';
    }
  });

  document.querySelectorAll('g.estado').forEach(el => {
    const novo = el.cloneNode(true);
    el.parentNode.replaceChild(novo, el);

    novo.addEventListener('mouseenter', () => {
      aplicarHover(novo);
    });

    novo.addEventListener('mouseleave', () => {
      removerHover(novo);
    });

    novo.addEventListener('click', async (e) => { // Tornada async
      e.stopPropagation();
      await clickEstado(e.currentTarget);
    });
  });
}