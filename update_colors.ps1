$content = Get-Content 'style.css' -Raw -Encoding UTF8

$replacements = @{
    '--bg-base: #f1f8f8' = '--bg-base: #f0f4f8'
    '--text-main: #1C3334' = '--text-main: #122132'
    '--text-light: #4A6B69' = '--text-light: #354e68'
    '--teal-dark: #1E4647' = '--teal-dark: #1d497c'
    '--teal-mid: #3B7E7A' = '--teal-mid: #4175a6'
    '--teal-light: #93C6C3' = '--teal-light: #b6c9de'
    '--teal-verylight: #CDF0EE' = '--teal-verylight: #e5edf5'
    '--teal-verylight: #E2F1F0' = '--teal-verylight: #e5edf5'
    
    'rgba\(30, 70, 71' = 'rgba(29, 73, 124'
    'rgba\(89, 175, 168' = 'rgba(65, 117, 166'
    'rgba\(147, 198, 195' = 'rgba(182, 201, 222'
    'rgba\(59, 126, 122' = 'rgba(65, 117, 166'
    
    '#eef7f6' = '#ecf1f6'
    '#0e2f2f' = '#0e233d'
    '#2d6b6a' = '#2e5b8c'
}

foreach ($key in $replacements.Keys) {
    # We use regex replace but carefully
    $content = [regex]::Replace($content, $key, $replacements[$key])
}

# Fix var names from teal to blue
$content = $content -replace '--teal-', '--blue-'

[System.IO.File]::WriteAllText("$PWD\style.css", $content, [System.Text.Encoding]::UTF8)
Write-Host "Replaced!"
