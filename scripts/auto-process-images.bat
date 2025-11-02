@echo off
echo Procesando 394 imagenes...
echo Esto puede tardar 5-10 minutos. Por favor espera...
echo.

(
echo 1
echo D:\v0-vialine-landing-page\scripts\products-mapped.csv
echo s
echo n
) | node scripts\image-wizard.js

echo.
echo ========================================
echo Proceso completado!
echo Las imagenes estan en:
echo C:\Users\USER\Downloads\Fotos para Web v1-20251101T230753Z-1-001\Fotos para Web v1\processed
echo.
echo El codigo generado esta en:
echo D:\v0-vialine-landing-page\data\products-generated.ts
echo ========================================
pause
