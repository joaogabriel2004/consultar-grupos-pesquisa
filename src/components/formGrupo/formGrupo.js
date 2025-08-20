import React, { useState, useEffect } from 'react';
import './formGrupo.css';

const FormGrupo = ({ grupo, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(grupo || {});

  useEffect(() => {
    setFormData(grupo || {}); // atualiza dados quando abrir modal
  }, [grupo]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      areasConcentracao: value.split(',').map(v => v.trim())
    }));
  };

  const handleRedesChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      redes: {
        ...prev.redes,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Grupo</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Nome:
            <input type="text" name="nome" value={formData.nome || ''} onChange={handleChange} required />
          </label>
          
          <label>
            Sigla:
            <input type="text" name="sigla" value={formData.sigla || ''} onChange={handleChange} />
          </label>
          
          <label>
            Instituição:
            <input type="text" name="instituicao" value={formData.instituicao || ''} onChange={handleChange} required />
          </label>
          
          <label>
            Cidade:
            <input type="text" name="cidade" value={formData.cidade || ''} onChange={handleChange} />
          </label>
          
          <label>
            Áreas de Concentração (separe por vírgula):
            <input type="text" value={formData.areasConcentracao?.join(', ') || ''} onChange={handleArrayChange} />
          </label>
          
          <label>
            Email:
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
          </label>
          
          <label>
            Website:
            <input type="text" name="website" value={formData.website || ''} onChange={handleChange} />
          </label>
          
          <label>
            Lattes:
            <input type="text" name="lattes" value={formData.redes?.lattes || ''} onChange={handleRedesChange} />
          </label>
          
          <label>
            LinkedIn:
            <input type="text" name="linkedin" value={formData.redes?.linkedin || ''} onChange={handleRedesChange} />
          </label>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-save">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormGrupo;
