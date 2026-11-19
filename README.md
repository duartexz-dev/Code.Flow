# Code.Flow

**Code.Flow** é uma plataforma front-end de estudos de programação. O repositório reúne páginas de cursos, exercícios, recursos educativos, minigames e perfil em uma aplicação estática feita com HTML, CSS e JavaScript.

## Visão geral

A página inicial apresenta um formulário simples com nome e idade. Após a validação no navegador, os dados básicos do perfil são gravados em `localStorage` e a aplicação direciona para a área principal.

O projeto contém páginas e materiais relacionados a:

- JavaScript
- Python
- C#
- Java
- React
- HTML e CSS

Também existem páginas dedicadas a exercícios, minigames, conteúdo educativo e perfil.

## Funcionalidades presentes no repositório

- Formulário inicial com validação básica no navegador.
- Persistência local do perfil usando `localStorage`.
- Páginas separadas para cursos e áreas de estudo.
- Área de exercícios e minigames.
- Scripts auxiliares para geração e atualização de páginas de cursos.

A presença de uma página ou script no repositório não significa, por si só, que exista um serviço de backend, autenticação segura, sincronização de progresso entre dispositivos ou integração operacional com uma API externa.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- `localStorage`
- Recursos externos carregados por CDN e links para conteúdos online

## Executar localmente

O projeto não possui um `package.json` na raiz nem uma etapa de build para a interface principal. Inicie um servidor HTTP estático na raiz:

```bash
git clone https://github.com/duartexz-dev/Code.Flow.git
cd Code.Flow
python -m http.server 8000
```

Abra localhost:8000 no navegador. Também é possível usar a extensão Live Server do VS Code.

## Estrutura atual

```text
Code.Flow/
├── css/
│   ├── cursojs.css
│   ├── home.css
│   ├── profile.css
│   └── style.css
├── data/
│   └── playlist.txt
├── js/
│   ├── cursos.js
│   ├── effects.js
│   ├── home.js
│   ├── minigames.js
│   ├── profile.js
│   └── script.js
├── pages/
│   ├── CursoCs.html
│   ├── CursoCssHtml.html
│   ├── CursoJava.html
│   ├── CursoJs.html
│   ├── CursoPython.html
│   ├── CursoReact.html
│   ├── educativo.html
│   ├── exercicios.html
│   ├── home.html
│   ├── minigames.html
│   └── profile.html
├── tools/
│   ├── fetch_playlist.js
│   ├── generate_courses.js
│   └── update_html.js
├── ABOUT.md
├── index.html
└── README.md
```

Os scripts PowerShell `fix_others.ps1` e `fix_react.ps1` também estão na raiz e fazem parte dos arquivos auxiliares do repositório.

## Limitações do estado atual

- O perfil é armazenado somente no navegador atual; não existe autenticação no servidor.
- Não há backend ou banco de dados para guardar contas ou progresso.
- O conteúdo que depende de YouTube, fontes, bibliotecas ou outros recursos externos precisa de conexão com a internet.
- O arquivo `data/playlist.txt` está vazio no estado atual do repositório; não há uma lista de playlists cadastrada nele.
- A plataforma é um projeto de estudo e não declara conformidade com padrões de acessibilidade nem disponibilidade de conteúdo em uma quantidade fixa de aulas.

## Objetivo de aprendizagem

O Code.Flow reúne experiências de front-end e organização de conteúdo educativo em um único projeto. Ele também serve como espaço de prática para manipulação do DOM, eventos, armazenamento local e geração de páginas.

Consulte [ABOUT.md](./ABOUT.md) para uma nota resumida sobre a motivação do projeto.

---

Desenvolvido por Arthur Duarte.
