/**
 * CodeFlow — Minigames & Challenges (Modal-based)
 */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('game-modal');
        const title = document.getElementById('modal-title');
        const desc = document.getElementById('modal-description');
        const input = document.getElementById('modal-input');
        const feedback = document.getElementById('modal-feedback');
        const btnClose = document.getElementById('btn-close-modal');
        const btnSubmit = document.getElementById('btn-submit-modal');
        if (!modal) return;

        let validator = null, onSuccess = null;

        const open = (cfg) => {
            title.innerHTML = `<i class="fas ${cfg.icon}"></i> ${cfg.title}`;
            desc.innerHTML = cfg.desc;
            input.value = cfg.code || '';
            feedback.className = 'modal-feedback'; feedback.textContent = '';
            validator = cfg.validate; onSuccess = cfg.onSuccess || null;
            modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false');
            setTimeout(() => input.focus(), 100);
        };

        const close = () => {
            modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true');
            input.value = ''; feedback.textContent = '';
        };

        btnClose.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

        btnSubmit.addEventListener('click', () => {
            if (!validator) return;
            const result = validator(input.value);
            feedback.textContent = result.msg;
            feedback.className = `modal-feedback ${result.ok ? 'success' : 'error'}`;
            if (result.ok) {
                if (onSuccess) onSuccess();
                // Track challenges
                try {
                    const n = parseInt(localStorage.getItem('codeflow_challenges_done') || '0', 10);
                    localStorage.setItem('codeflow_challenges_done', n + 1);
                } catch {}
                setTimeout(close, 2000);
            } else {
                // Shake
                const c = modal.querySelector('.modal-container');
                c.style.animation = 'none'; c.offsetHeight; // reflow
                c.style.animation = 'shake 0.3s ease';
            }
        });

        // Inject shake keyframes
        const style = document.createElement('style');
        style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
        document.head.appendChild(style);

        // === Challenge Definitions ===
        const challengeBtns = document.querySelectorAll('.challenge-list .btn-small');
        const gameBtns = document.querySelectorAll('.games-grid .btn-text');

        if (challengeBtns[0]) challengeBtns[0].addEventListener('click', () => open({
            title: 'Função de Soma', icon: 'fa-code',
            desc: 'Crie uma função <code>soma(a, b)</code> que retorna a soma dos dois valores.',
            code: 'function soma(a, b) {\n  // escreva aqui\n}',
            validate: (v) => {
                const c = v.replace(/\s+/g, '');
                const ok = c.includes('returna+b') || c.includes('return(a+b)');
                return { ok, msg: ok ? '✨ Perfeito! +50 XP' : '❌ Dica: use return a + b' };
            },
            onSuccess: () => { challengeBtns[0].textContent = '✓ Feito'; challengeBtns[0].style.background = 'rgba(52,211,153,0.15)'; challengeBtns[0].style.color = '#34d399'; challengeBtns[0].style.borderColor = 'rgba(52,211,153,0.3)'; }
        }));

        if (challengeBtns[1]) challengeBtns[1].addEventListener('click', () => open({
            title: 'Inversão de String', icon: 'fa-exchange-alt',
            desc: 'Como inverter a string <code>str</code> em uma linha?',
            code: "str.split('').reverse().join('')",
            validate: (v) => {
                const c = v.replace(/\s+/g, '');
                const ok = c.includes("split('').reverse().join('')") || c.includes('split("").reverse().join("")');
                return { ok, msg: ok ? '🔥 Excelente! +100 XP' : '❌ Use split → reverse → join' };
            },
            onSuccess: () => { challengeBtns[1].textContent = '✓ Feito'; challengeBtns[1].style.background = 'var(--accent-muted)'; challengeBtns[1].style.color = 'var(--accent)'; }
        }));

        if (challengeBtns[2]) challengeBtns[2].addEventListener('click', () => open({
            title: 'Requisições HTTP', icon: 'fa-cloud-download-alt',
            desc: 'Qual a função nativa do JS para fazer requisições HTTP?',
            validate: (v) => {
                const ok = v.trim().toLowerCase().replace(/[()]/g, '') === 'fetch';
                return { ok, msg: ok ? '🚀 Correto! Fetch API. +150 XP' : '❌ Começa com "f", termina com "etch".' };
            },
            onSuccess: () => { challengeBtns[2].textContent = '✓ Feito'; challengeBtns[2].style.background = 'rgba(244,114,182,0.15)'; challengeBtns[2].style.color = '#f472b6'; }
        }));

        if (gameBtns[0]) gameBtns[0].addEventListener('click', (e) => { e.preventDefault(); open({
            title: 'Quiz de Lógica', icon: 'fa-brain',
            desc: 'Se <code>x = 10</code> e <code>y = "10"</code>, qual o resultado de <code>x === y</code>?',
            validate: (v) => {
                const ok = v.trim().toLowerCase() === 'false';
                return { ok, msg: ok ? '🎯 Certo! === verifica tipo. +200 XP' : '❌ === compara valor E tipo.' };
            }
        }); });

        if (gameBtns[1]) gameBtns[1].addEventListener('click', (e) => { e.preventDefault(); open({
            title: 'Complete o Código', icon: 'fa-puzzle-piece',
            desc: 'Complete o <code>return</code> para filtrar apenas números pares:',
            code: 'const pares = nums.filter(n => {\n  return \n});',
            validate: (v) => {
                const c = v.replace(/\s+/g, '');
                const ok = c.includes('n%2===0') || c.includes('n%2==0');
                return { ok, msg: ok ? '🧩 Perfeito! n % 2 === 0. +250 XP' : '❌ Resto da divisão por 2 deve ser 0.' };
            }
        }); });

        if (gameBtns[2]) gameBtns[2].addEventListener('click', (e) => { e.preventDefault(); open({
            title: 'Bug Hunter', icon: 'fa-bug',
            desc: 'O que o código abaixo imprime com <code>var</code>? (separe por vírgula)',
            code: 'for (var i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 1000);\n}',
            validate: (v) => {
                const ok = v.replace(/\s+/g, '') === '5,5,5,5,5';
                return { ok, msg: ok ? '🐛 Gênio! Closure clássica. +300 XP' : '❌ var não cria escopo de bloco.' };
            }
        }); });
    });
})();
