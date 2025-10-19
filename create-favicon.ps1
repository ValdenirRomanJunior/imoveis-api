Add-Type -AssemblyName System.Drawing

# Create a 64x64 bitmap
$bitmap = New-Object System.Drawing.Bitmap(64, 64)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Fill with blue background
$graphics.Clear([System.Drawing.Color]::Blue)

# Draw a white circle in the center
$graphics.FillEllipse([System.Drawing.Brushes]::White, 16, 16, 32, 32)

# Clean up graphics
$graphics.Dispose()

# Save as PNG
$bitmap.Save('favicon-test.png', [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up bitmap
$bitmap.Dispose()

Write-Host "Arquivo favicon-test.png criado com sucesso"