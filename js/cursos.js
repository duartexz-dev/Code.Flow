/**
 * CodeFlow — Course Player Logic
 * Handles video navigation, progress, and notes.
 */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const courseId = document.body.getAttribute('data-course') || 'default';

        const el = {
            videoFrame:  document.getElementById('video-frame'),
            lessonTitle: document.getElementById('current-lesson-title'),
            lessons:     document.querySelectorAll('.lesson-item'),
            btnNext:     document.getElementById('btn-next'),
            btnPrev:     document.getElementById('btn-prev'),
            btnComplete: document.getElementById('btn-complete'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            notesToggle: document.getElementById('btn-notes-toggle'),
            notesPanel:  document.getElementById('notes-panel'),
            notesClose:  document.getElementById('btn-close-notes'),
            notesArea:   document.getElementById('notes-area'),
            saveStatus:  document.getElementById('save-status'),
            copyNotes:   document.getElementById('btn-copy-notes'),
        };

        const total = el.lessons.length;
        let current = 0;
        let completed = [];

        // Load
        try { completed = JSON.parse(localStorage.getItem(`codeflow_${courseId}_completed`)) || []; } catch { completed = []; }

        const save = () => {
            try { localStorage.setItem(`codeflow_${courseId}_completed`, JSON.stringify(completed)); } catch {}
        };

        const updateProgress = () => {
            const pct = total > 0 ? (completed.length / total) * 100 : 0;
            if (el.progressFill) el.progressFill.style.width = `${pct}%`;
            if (el.progressText) el.progressText.textContent = `${completed.length} de ${total} concluídas`;
            el.lessons.forEach((l, i) => l.classList.toggle('completed', completed.includes(i)));
        };

        const loadLesson = (idx) => {
            if (idx < 0 || idx >= total) return;
            current = idx;
            const link = el.lessons[idx];
            const url = link.getAttribute('href');
            const name = link.querySelector('.lesson-title').textContent;

            el.lessons.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (el.videoFrame) el.videoFrame.src = url;
            if (el.lessonTitle) el.lessonTitle.textContent = name;
            if (el.btnPrev) el.btnPrev.disabled = idx === 0;

            if (el.btnNext) {
                el.btnNext.innerHTML = idx === total - 1
                    ? 'Finalizar <i class="fas fa-trophy"></i>'
                    : 'Próxima <i class="fas fa-chevron-right"></i>';
            }

            const done = completed.includes(idx);
            if (el.btnComplete) {
                el.btnComplete.classList.toggle('completed', done);
                el.btnComplete.innerHTML = done
                    ? '<i class="fas fa-check-circle"></i> Concluído'
                    : '<i class="far fa-check-circle"></i> Concluir';
            }

            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };

        // Events
        el.lessons.forEach((link, i) => link.addEventListener('click', (e) => { e.preventDefault(); loadLesson(i); }));

        if (el.btnNext) el.btnNext.addEventListener('click', () => {
            if (current < total - 1) loadLesson(current + 1);
            else alert('🎓 Parabéns! Trilha concluída!');
        });

        if (el.btnPrev) el.btnPrev.addEventListener('click', () => { if (current > 0) loadLesson(current - 1); });

        // Gamification Helpers
        const loadExternalScript = (src) => new Promise(resolve => {
            if(document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement('script'); s.src = src; s.onload = resolve; document.head.appendChild(s);
        });

        const triggerConfetti = async () => {
            await loadExternalScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js');
            const end = Date.now() + 2 * 1000;
            const colors = ['#4da6ff', '#7c5cfc', '#34d399'];
            (function frame() {
                confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
                confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        };

        const showLevelUp = async () => {
            await loadExternalScript('https://cdn.jsdelivr.net/npm/sweetalert2@11');
            Swal.fire({
                title: 'Nível Up! 🚀',
                text: 'Você ganhou +50 XP por concluir a aula!',
                icon: 'success',
                background: '#101b30',
                color: '#f0f4fa',
                confirmButtonColor: '#4da6ff',
                timer: 2500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        };

        if (el.btnComplete) el.btnComplete.addEventListener('click', () => {
            const done = completed.includes(current);
            if (!done) {
                completed.push(current);
                el.btnComplete.classList.add('completed');
                el.btnComplete.innerHTML = '<i class="fas fa-check-circle"></i> Concluído';
                
                // Gamification execution
                triggerConfetti();
                showLevelUp();

                if (current < total - 1) setTimeout(() => loadLesson(current + 1), 3000);
            } else {
                completed = completed.filter(i => i !== current);
                el.btnComplete.classList.remove('completed');
                el.btnComplete.innerHTML = '<i class="far fa-check-circle"></i> Concluir';
            }
            save(); updateProgress();
        });

        // Notes
        if (el.notesArea) {
            const savedNotes = localStorage.getItem(`codeflow_${courseId}_notes`);
            if (savedNotes) el.notesArea.value = savedNotes;

            let saveTimer;
            el.notesArea.addEventListener('input', () => {
                clearTimeout(saveTimer);
                saveTimer = setTimeout(() => {
                    localStorage.setItem(`codeflow_${courseId}_notes`, el.notesArea.value);
                    if (el.saveStatus) { el.saveStatus.classList.add('show'); setTimeout(() => el.saveStatus.classList.remove('show'), 1500); }
                }, 600);
            });
        }

        if (el.notesToggle && el.notesPanel) el.notesToggle.addEventListener('click', () => el.notesPanel.classList.toggle('hidden'));
        if (el.notesClose && el.notesPanel) el.notesClose.addEventListener('click', () => el.notesPanel.classList.add('hidden'));
        if (el.copyNotes && el.notesArea) el.copyNotes.addEventListener('click', () => { navigator.clipboard.writeText(el.notesArea.value); alert('Copiado!'); });

        // Init
        updateProgress();
        if (total > 0) loadLesson(0);
    });
})();
