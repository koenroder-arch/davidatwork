$content = Get-Content 'index.html' -Raw -Encoding UTF8
$content = $content -replace 'Wat ik voor je kan betekenen\.', 'Wat ik voor je kan betekenen?'
[System.IO.File]::WriteAllText("$PWD\index.html", $content, [System.Text.Encoding]::UTF8)
Write-Host "Done!"
