/**
 * CodeFlow — Login Logic
 */
(() => {
    'use strict';
    const form = document.getElementById('login-form');
    const btn = document.getElementById('btn-login');
    if (!form || !btn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const idade = parseInt(document.getElementById('idade').value, 10);

        if (!nome) { alert('Por favor, insira seu nome.'); return; }
        if (isNaN(idade) || idade < 10 || idade > 100) { alert('Insira uma idade válida (10–100).'); return; }

        try { localStorage.setItem('codeflow_user', JSON.stringify({ nome, idade, joined: Date.now() })); } catch (err) {}

        btn.innerHTML = 'Conectando… <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        setTimeout(() => { window.location.href = 'pages/home.html'; }, 600);
    });
})();
