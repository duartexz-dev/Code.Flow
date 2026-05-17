$files = @(
    @{ path="pages\CursoPython.html"; title="CodeFlow — Trilha Python"; desc="Aprenda Python do básico ao avançado na CodeFlow." },
    @{ path="pages\CursoCssHtml.html"; title="CodeFlow — Trilha HTML e CSS"; desc="Aprenda HTML5 e CSS3 do básico ao avançado na CodeFlow." }
)

foreach ($f in $files) {
    $p = "c:\Users\Arthur\OneDrive\Desktop\DevTask-2\$($f.path)"
    $c = Get-Content $p -Raw
    $c = $c -replace ' glass-panel', ''
    $c = $c -replace ' target="video-frame"', ''
    $c = $c -replace 'target="video-frame" ', ''
    $c = $c -replace '<title>Curso de JavaScript - CodeFlow</title>', "<title>$($f.title)</title>"
    $c = $c -replace 'Aprenda JavaScript do básico ao avançado com o curso da CodeFlow\.', $f.desc
    $c = $c -replace 'name="video-frame" ', ''
    Set-Content $p -Value $c -NoNewline
    Write-Host "Fixed $($f.path)"
}
