# 📍 Mapa Interativo de Grupos de Pesquisa - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/react-18.2.0-blue" alt="React">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</div>

Aplicação frontend para visualização de grupos de pesquisa por estado do Brasil, integrada com um backend Node.js/Firebase.

![Screenshot da Aplicação](https://screenshot.png) <!-- Substitua por uma imagem real -->

## ✨ Funcionalidades
- Mapa interativo do Brasil com SVG
- Visualização detalhada de grupos de pesquisa
- Filtros por área de atuação
- Links para contato e redes sociais
- Layout responsivo para mobile

## 🛠 Estrutura do Projeto

```json
frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── mapa/
│ │ │ └── mapa.js # Componente do SVG interativo
│ │ │ └── mapa.css # Estilos do mapa
│ │ └── info/
│ │ └── info.js # Card de informações
│ │ └── info.css # Estilos dos cards
│ ├── services/
│ │ └── mapaEventos.js # Tratamento de clicks do mapa e gerenciamento de informações
│ ├── services/
│ │ └── api.js # Conexão com o backend
│ │ └── cache.js # Armazenamento em cache
│ ├── App.js
│ ├── index.js
│ └── styles/
│ ├── index.css # Estilos globais
├── .env
└── package.json
```


## 🔌 Integração com o Backend

### Endpoints utilizados:

| Método | Endpoint           | Descrição               |
|--------|--------------------|-------------------------|
| GET    | `/:estado`         | Busca grupos por estado |
| POST   | `/:estado/grupos`  | Cadastra novo grupo     |

### Estrutura dos Dados

```json
{
  "id": "string",
  "nome": "string",
  "sigla": "string?",
  "instituicao": "string",
  "cidade": "string",
  "areasConcentracao": ["string"],
  "email": "string",
  "website": "string?",
  "redes": {
    "lattes": "string?",
    "linkedin": "string?"
  }
}
```

## 🚀 Como Executar

1. Clone o repositório:
```
git clone https://github.com/joaogabrielsj2004/mapa-interativo.git
cd mapa-interativo/frontend
```

2. Instale as dependências:
```
npm install
```

3. Configure o ambiente:
```
cp .env.example .env
```
Edite o .env com a URL do seu backend:
```
REACT_APP_API_URL= link_backend
```

4. Inicie a aplicação:
```
npm start
```

### Componente do Mapa
Para ajustar:
- Edite src/components/mapa/brasil.svg
- Atualize os eventos em src/components/mapa/mapa.js

## 📱 Responsividade
A aplicação possui breakpoints para:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 📚 Dependências Principais

| Pacote       | Versão   | Uso                   | Licença    |
|--------------|----------|-----------------------|------------|
| react        | ^18.2.0  | Biblioteca principal  | MIT        |
| react-dom    | ^18.2.0  | Renderização          | MIT        |
| axios        | ^1.3.4   | Chamadas HTTP         | MIT        |
| font-awesome | ^6.4.0   | Ícones                | CC BY 4.0  |
| [Outro]      | [versão] | [função]              | [licença]  |

## 📄 Licença
Este projeto está licenciado sob a Licença MIT

Desenvolvido por [Seu Nome]
📧 Contato: joaogabrielsj2004@gmail.com
🔗 LinkedIn: linkedin.com/in/joao-gabriel-jesus/

