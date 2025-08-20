import React from 'react';

function FormGrupo({ isOpen, onClose, onSubmit, initialData = {} }) {
    const [form, setForm] = React.useState({
        nome: initialData.nome || '',
        area: initialData.area || '',
        descricao: initialData.descricao || '',
        lider: initialData.lider || ''
    });

    React.useEffect(() => {
        setForm({
            nome: initialData.nome || '',
            area: initialData.area || '',
            descricao: initialData.descricao || '',
            lider: initialData.lider || ''
        });
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 350 }}>
                <button onClick={onClose} style={{ float: 'right' }}>Fechar</button>
                <h2>Informações do Grupo</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Área:</label>
                        <input
                            type="text"
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <textarea
                            name="descricao"
                            value={form.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Líder:</label>
                        <input
                            type="text"
                            name="lider"
                            value={form.lider}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormGrupo;
