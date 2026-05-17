/**
 * CodeFlow — Profile Page Logic
 * Reads all localStorage data and renders stats, badges, progress.
 */
(() => {
    'use strict';

    const COURSES = [
        { id: 'js', name: 'JavaScript ES6+', total: 17, page: 'CursoJs.html', color: '#fdd835' },
        { id: 'cs', name: 'C# (.NET)', total: 15, page: 'CursoCs.html', color: '#7c5cfc' },
        { id: 'python', name: 'Python', total: 48, page: 'CursoPython.html', color: '#42a5f5' },
        { id: 'htmlcss', name: 'HTML & CSS', total: 41, page: 'CursoCssHtml.html', color: '#ff7043' },
        { id: 'react', name: 'React', total: 61, page: 'CursoReact.html', color: '#00d8ff' },
        { id: 'java', name: 'Java', total: 15, page: 'CursoJava.html', color: '#ef5350' },
    ];

    const LEVELS = [
        { min: 0, title: 'Iniciante', next: 500 },
        { min: 500, title: 'Aprendiz', next: 1500 },
        { min: 1500, title: 'Praticante', next: 3500 },
        { min: 3500, title: 'Avançado', next: 7000 },
        { min: 7000, title: 'Expert', next: 12000 },
        { min: 12000, title: 'Mestre', next: 20000 },
    ];

    const safeGet = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };

    const getLevel = (xp) => {
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (xp >= LEVELS[i].min) return { ...LEVELS[i], num: i + 1 };
        }
        return { ...LEVELS[0], num: 1 };
    };

    const initProfile = () => {
        const user = safeGet('codeflow_user');
        const profileName = document.getElementById('profile-name');
        const profileSub = document.getElementById('profile-subtitle');

        if (user && profileName) {
            profileName.textContent = user.nome || 'Estudante';
            if (user.joined && profileSub) {
                const d = new Date(user.joined);
                profileSub.textContent = `Membro desde ${d.toLocaleDateString('pt-BR')}`;
            }
        }

        // Calculate stats from localStorage
        let totalCompleted = 0;
        let coursesStarted = 0;
        const coursesInProgress = [];

        for (const course of COURSES) {
            const completed = safeGet(`codeflow_${course.id}_completed`) || [];
            if (completed.length > 0) {
                coursesStarted++;
                totalCompleted += completed.length;
                coursesInProgress.push({ ...course, completed: completed.length });
            }
        }

        const challenges = safeGet('codeflow_challenges_done') || 0;
        const streak = safeGet('codeflow_streak') || 0;
        const xp = totalCompleted * 50 + challenges * 100;
        const timeEstimate = Math.round(totalCompleted * 0.25); // ~15min per lesson

        // Update stats
        setText('stat-courses', coursesStarted);
        setText('stat-completed', totalCompleted);
        setText('stat-challenges', challenges);
        setText('stat-streak', streak);
        setText('stat-time', `${timeEstimate}h`);
        setText('stat-xp', xp);

        // Level
        const level = getLevel(xp);
        setText('user-level-text', `Nível ${level.num} — ${level.title}`);
        setText('xp-text', `${xp} / ${level.next} XP`);
        const pct = Math.min(100, ((xp - level.min) / (level.next - level.min)) * 100);
        const xpFill = document.getElementById('xp-bar-fill');
        if (xpFill) setTimeout(() => { xpFill.style.width = `${pct}%`; }, 200);

        // Courses in progress
        const container = document.getElementById('courses-progress');
        if (container && coursesInProgress.length > 0) {
            container.innerHTML = coursesInProgress.map(c => {
                const pct = Math.round((c.completed / c.total) * 100);
                return `
                <div class="course-progress-card">
                    <h4>${c.name}</h4>
                    <p>${c.completed} de ${c.total} aulas concluídas</p>
                    <div class="progress-mini"><div class="progress-mini-fill" style="width:${pct}%; background:${c.color};"></div></div>
                    <span class="progress-label">${pct}% concluído</span>
                    <a href="${c.page}" class="btn-continue"><i class="fas fa-play"></i> Continuar</a>
                </div>`;
            }).join('');
        }

        // Badges
        unlockBadge('badge-first-login'); // Always unlocked if user exists
        if (totalCompleted >= 5) unlockBadge('badge-5-lessons');
        if (totalCompleted >= 10) unlockBadge('badge-10-lessons');
        if (challenges >= 1) unlockBadge('badge-first-challenge');
        if (streak >= 3) unlockBadge('badge-streak-3');
        
        const hasFinished = coursesInProgress.some(c => c.completed >= c.total);
        if (hasFinished) unlockBadge('badge-master');

        // Activity History (build from data)
        const activityList = document.getElementById('activity-list');
        if (activityList && coursesInProgress.length > 0) {
            const items = coursesInProgress.map(c =>
                `<li class="activity-item"><span class="activity-dot green"></span><span class="activity-text">Progresso em <strong>${c.name}</strong>: ${c.completed}/${c.total} aulas</span><span class="activity-time">Recente</span></li>`
            );
            activityList.innerHTML = items.join('') +
                `<li class="activity-item"><span class="activity-dot"></span><span class="activity-text">Conta criada na <strong>CodeFlow</strong></span><span class="activity-time">Início</span></li>`;
        }
    };

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const unlockBadge = (id) => { const el = document.getElementById(id); if (el) el.classList.remove('locked'); };

    document.addEventListener('DOMContentLoaded', initProfile);
})();
