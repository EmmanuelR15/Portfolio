#!/usr/bin/env python3
"""
Script para generar favicon circular optimizado a partir de una imagen.
"""

from PIL import Image
import os

# Ruta de la imagen original
original_image_path = "public/images/profile/ChatGPT Image 12 feb 2026, 03_22_54 a.m..png"
output_dir = "public/images/profile"

# Asegurar que el directorio de salida existe
os.makedirs(output_dir, exist_ok=True)

print(f"Cargando imagen: {original_image_path}")

# Abrir la imagen original
img = Image.open(original_image_path)
print(f"Dimensiones originales: {img.size}")

# Convertir a RGBA si es necesario (para soportar transparencia)
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Determinar el tamaño del cuadrado (usar el menor de ancho y alto)
size = min(img.size)
print(f"Tamaño del cuadrado: {size}x{size}")

# Calcular las coordenadas para centrar el recorte
left = (img.size[0] - size) // 2
top = (img.size[1] - size) // 2
right = left + size
bottom = top + size

# Recortar a un cuadrado centrado
img_square = img.crop((left, top, right, bottom))
print(f"Imagen recortada a cuadrado: {img_square.size}")

# Crear máscara circular
mask = Image.new('L', (size, size), 0)
from PIL import ImageDraw
draw = ImageDraw.Draw(mask)
draw.ellipse([0, 0, size-1, size-1], fill=255)

# Aplicar máscara circular
img_circular = Image.new('RGBA', (size, size), (0, 0, 0, 0))
img_circular.paste(img_square, (0, 0))
img_circular.putalpha(mask)

print("Forma circular aplicada")

# Generar versiones optimizadas
sizes_to_generate = [32, 64]

for target_size in sizes_to_generate:
    # Redimensionar
    favicon = img_circular.resize((target_size, target_size), Image.Resampling.LANCZOS)
    
    # Exportar como PNG
    png_path = os.path.join(output_dir, f"favicon-{target_size}.png")
    favicon.save(png_path, "PNG")
    print(f"✓ Generado: {png_path} ({target_size}x{target_size})")

# Generar favicon.png en 64x64 (tamaño estándar)
favicon_64 = img_circular.resize((64, 64), Image.Resampling.LANCZOS)
favicon_png_path = os.path.join(output_dir, "favicon.png")
favicon_64.save(favicon_png_path, "PNG")
print(f"✓ Generado: {favicon_png_path} (64x64)")

# Generar favicon.ico (múltiples tamaños)
# El formato ICO puede contener múltiples resoluciones
favicon_32 = img_circular.resize((32, 32), Image.Resampling.LANCZOS)
favicon_ico_path = os.path.join(output_dir, "favicon.ico")

# Crear ICO con múltiples tamaños (Pillow lo maneja automáticamente)
favicon_64.save(favicon_ico_path, "ICO", sizes=[(32, 32), (64, 64)])
print(f"✓ Generado: {favicon_ico_path} (múltiples tamaños)")

print("\n✅ Favicons circulares generados exitosamente!")
print(f"Archivos creados en: {output_dir}")
print("- favicon.png (64x64)")
print("- favicon-32.png (32x32)")
print("- favicon-64.png (64x64)")
print("- favicon.ico (múltiples tamaños)")
