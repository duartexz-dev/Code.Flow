$p = "c:\Users\Arthur\OneDrive\Desktop\DevTask-2\pages\CursoReact.html"
$c = Get-Content $p -Raw
$c = $c -replace ' glass-panel', ''
$c = $c -replace ' target="video-frame"', ''
$c = $c -replace 'target="video-frame" ', ''
$c = $c -replace '<title>Curso de JavaScript - CodeFlow</title>', '<title>CodeFlow — Trilha React</title>'
$c = $c -replace 'Aprenda JavaScript do básico ao avançado com o curso da CodeFlow\.', 'Aprenda React do básico ao avançado na CodeFlow.'
$c = $c -replace 'name="video-frame" ', ''
Set-Content $p -Value $c -NoNewline
Write-Host "React page fixed"
