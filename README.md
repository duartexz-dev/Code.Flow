# CodeFlow 🎓

**Uma Plataforma Inteligente de Ensino de Programação Desenvolvida 100% com IA**

![CodeFlow](https://img.shields.io/badge/Desenvolvido%20com-IA%20100%25-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Ativo-brightgreen?style=for-the-badge)
![Linguagem](https://img.shields.io/badge/Linguagem-HTML%2FCSS%2FJS-yellow?style=for-the-badge)

## 📖 Sobre

**CodeFlow** é uma plataforma web moderna desenvolvida integralmente com Inteligência Artificial, projetada para automatizar e otimizar o processo de aprendizado de programação. O projeto nasceu como uma demonstração prática de como a IA pode ser aplicada para criar soluções educacionais inovadoras.

### 🎯 Objetivo do Projeto

1. **Automatizar Estudos**: Estruturar trilhas de aprendizado com conteúdo organizado e exercícios práticos
2. **Aplicar IA na Prática**: Demonstrar o conhecimento de IA usando AntiGravity e suas AIs integradas
3. **Criar Experiência Educacional**: Oferecer uma plataforma intuitiva e engajante para aprender programação

## ✨ Características

### 🎓 Trilhas de Aprendizado

- **JavaScript ES6+** - JavaScript moderno e avançado
- **Python** - Linguagem versátil para múltiplos domínios
- **C#** - Programação orientada a objetos e .NET
- **React** - Bibliotecas front-end modernas
- **HTML5 & CSS3** - Fundamentos do desenvolvimento web

### 📺 Integração com Videoaulas

- Playlists dinâmicas do YouTube
- Player embarcado e intuitivo
- Navegação fluida entre aulas
- Conteúdo sempre atualizado

### 🎮 Exercícios e Minigames

- Desafios interativos por linguagem
- Validação automática de respostas
- Minigames para fixação de conceitos
- Gamificação com pontuação

### 👤 Perfil Personalizado

- Sistema de autenticação simples
- Rastreamento de progresso
- Dashboard com estatísticas
- Histórico de aprendizado

### 📚 Recursos Educacionais

- Documentação prática
- Dicas e boas práticas
- Links de referência confiáveis
- Guias passo a passo

## 🚀 Como Começar

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para videoaulas do YouTube)
- JavaScript ativado

### Instalação

1. **Clone ou baixe o projeto**

   ```bash
   git clone https://github.com/seu-usuario/codeflow.git
   cd codeflow
   ```

2. **Abra no navegador**
   - Abra o arquivo `index.html` em seu navegador web
   - Ou configure um servidor local (Python, Node.js, etc)

   **Exemplo com Python:**

   ```bash
   python -m http.server 8000
   ```

   **Exemplo com Node.js:**

   ```bash
   npx http-server
   ```

3. **Crie sua conta**
   - Preencha seu nome e idade
   - Clique em "Entrar na plataforma"
   - Comece a aprender!

## 📁 Estrutura do Projeto

```
CodeFlow/
├── index.html                 # Página de login
├── README.md                  # Este arquivo
├── DESCRIPTION.md             # Descrição detalhada do projeto
│
├── css/
│   ├── style.css             # Estilos globais
│   ├── home.css              # Estilos do dashboard
│   ├── profile.css           # Estilos do perfil
│   └── cursojs.css           # Estilos específicos dos cursos
│
├── js/
│   ├── script.js             # Lógica de login
│   ├── home.js               # Gerenciamento do dashboard
│   ├── effects.js            # Efeitos visuais (canvas)
│   ├── profile.js            # Lógica do perfil
│   ├── minigames.js          # Jogos educacionais
│   ├── cursos.js             # Gerenciamento de cursos
│   └── effects.js            # Animações e efeitos
│
├── pages/
│   ├── home.html             # Dashboard principal
│   ├── exercicios.html       # Centro de exercícios
│   ├── minigames.html        # Minigames
│   ├── profile.html          # Perfil do usuário
│   ├── educativo.html        # Recursos educacionais
│   ├── CursoJs.html          # Curso de JavaScript
│   ├── CursoPython.html      # Curso de Python
│   ├── CursoCs.html          # Curso de C#
│   ├── CursoReact.html       # Curso de React
│   └── CursoCssHtml.html     # Curso de HTML5 & CSS3
│
├── tools/
│   ├── generate_courses.js   # Gerador de páginas de cursos
│   ├── fetch_playlist.js     # Buscador de playlists YouTube
│   └── update_html.js        # Atualizador automático de conteúdo
│
└── data/
    └── playlist.txt          # IDs das playlists do YouTube
```

## 💻 Fluxo de Uso

```
Login → Dashboard → Escolher Trilha → Assistir Videoaulas
                ↓
            Exercícios → Minigames → Completar Módulo
                ↓
            Perfil → Ver Progresso → Próximo Módulo
```

## 🛠️ Funcionalidades Principais

### 1. **Autenticação de Usuários**

```javascript
// Login simples com localStorage
localStorage.setItem(
  "codeflow_user",
  JSON.stringify({ nome, idade, joined: Date.now() }),
);
```

### 2. **Geração Dinâmica de Conteúdo**

```javascript
// Scripts automatizados geram páginas HTML com base em playlists do YouTube
generateCoursePage(playlistId, courseId, courseTitle, outputFilename);
```

### 3. **Integração com YouTube**

```javascript
// Extração dinâmica de videoaulas
fetch(`https://www.youtube.com/playlist?list=${playlistId}`)
  .then((res) => res.text())
  .then((html) => extractVideoIds(html));
```

### 4. **Efeitos Visuais com Canvas**

- Fundo animado com partículas
- Gradientes dinâmicos
- Transições suaves

### 5. **Rastreamento de Progresso**

- Salva dados localmente
- Recupera histórico de aprendizado
- Exibe estatísticas personalizadas

## 🎨 Design e UX

- **Moderno**: Interface limpa e contemporânea
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessível**: Seguindo padrões WCAG
- **Intuitivo**: Navegação clara e lógica
- **Engajante**: Gamificação e feedback positivo

## 🤖 Como Este Projeto Usa IA

Este projeto demonstra a aplicação prática de IA em várias dimensões:

### 1. **Geração de Código**

- HTML, CSS e JavaScript gerados inteligentemente
- Otimização automática de performance
- Refatoração baseada em boas práticas

### 2. **Automação de Processos**

- Scripts que geram páginas automaticamente
- Integração com APIs externas
- Processamento de dados em lote

### 3. **Personalizações Inteligentes**

- Interface adaptada ao usuário
- Recomendações de próximos módulos
- Análise de progresso em tempo real

### 4. **Conteúdo Dinâmico**

- Busca e integração de videoaulas
- Organização automática de cursos
- Atualização sem intervenção manual

## 📊 Tecnologias Utilizadas

| Categoria         | Tecnologia                      |
| ----------------- | ------------------------------- |
| Frontend          | HTML5, CSS3, Vanilla JavaScript |
| Armazenamento     | localStorage, JSON              |
| APIs              | YouTube API, Fetch API          |
| Design            | Responsivo, Mobile-First        |
| Ferramentas de IA | AntiGravity, Claude AI, GPT-4   |
| Hosting           | GitHub Pages (opcional)         |

## 🎯 Casos de Uso

- ✅ Iniciantes aprendendo programação
- ✅ Estudantes complementando cursos
- ✅ Programadores aprofundando conhecimentos
- ✅ Educadores buscando material de referência
- ✅ Demonstração de IA aplicada

## 📈 Estatísticas do Projeto

- 🎓 5+ Linguagens de programação
- 📺 100+ Videoaulas integradas
- 💪 Exercícios interativos práticos
- 🎮 Minigames educacionais
- 🎯 100% gerado com IA

## 🔜 Roadmap Futuro

- [ ] Sistema de certificados digitais
- [ ] Comunidade de aprendizes
- [ ] Chat com IA para dúvidas
- [ ] Análise preditiva de dificuldades
- [ ] Personalização com ML
- [ ] Sistema de badges e achievements
- [ ] Integração com IDEs online
- [ ] Modo offline
- [ ] Multilíngue

## 🐛 Problemas Conhecidos

- Requer conexão com internet para videoaulas
- Compatibilidade com navegadores muito antigos
- localStorage limitado a ~5-10MB

## 💡 Contribuições

Sugestões e melhorias são bem-vindas! Se você tem ideias para expandir o projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto e foi criado com fins educacionais.

## 👨‍💻 Desenvolvedor

**Desenvolvido 100% com Inteligência Artificial**

Utilizando:

- AntiGravity AI
- Claude AI
- GPT-4
- Outras IAs integradas

## 📞 Suporte

Para dúvidas ou problemas:

- Abra uma issue no GitHub
- Consulte a documentação em `DESCRIPTION.md`
- Verifique se seu navegador está atualizado

## 🎓 Filosofia do Projeto

> "O CodeFlow não é apenas uma plataforma de aprendizado. É uma demonstração de como a Inteligência Artificial pode revolucionar a educação, automatizar processos e colocar conhecimento complexo em prática de forma acessível e divertida."

---

<div align="center">

**CodeFlow © 2026**

Desenvolvido 100% com IA | Automatizando o futuro da educação em programação

[![Made with AI](https://img.shields.io/badge/Made%20with-AI-blue?style=flat-square)](https://github.com)

</div>
