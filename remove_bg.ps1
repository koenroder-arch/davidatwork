Add-Type -AssemblyName System.Drawing

$inputPath  = 'c:\Antigravity projecten\Project David\images\logo.png'
$outputPath = 'c:\Antigravity projecten\Project David\images\logo_transparent.png'

$img    = [System.Drawing.Bitmap]::new($inputPath)
$result = [System.Drawing.Bitmap]::new($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Sample background color from top-left corner
$bgColor = $img.GetPixel(5, 5)
$bgR = $bgColor.R
$bgG = $bgColor.G
$bgB = $bgColor.B
Write-Host "Background color sampled: R=$bgR G=$bgG B=$bgB"

$threshold = 30

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        $diffR = [Math]::Abs($pixel.R - $bgR)
        $diffG = [Math]::Abs($pixel.G - $bgG)
        $diffB = [Math]::Abs($pixel.B - $bgB)
        if ($diffR -lt $threshold -and $diffG -lt $threshold -and $diffB -lt $threshold) {
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $result.SetPixel($x, $y, $pixel)
        }
    }
}

$result.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$result.Dispose()

# Replace original
Remove-Item $inputPath -Force
Rename-Item $outputPath $inputPath
Write-Host "Done! Logo saved with transparent background."
