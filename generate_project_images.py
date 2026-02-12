#!/usr/bin/env python3
"""
Generador de ilustraciones modernas y minimalistas para proyectos de portafolio.
Estilo flat con colores oscuros y acentos vibrantes.
"""

from PIL import Image, ImageDraw
import math
import os

# Configuración general
SIZE = 512
BG_COLOR = (20, 23, 30)  # Gris oscuro
ACCENT_COLORS = {
    'cyan': (97, 218, 251),      # Cyan vibrante
    'purple': (168, 85, 247),    # Purple vibrante
    'blue': (59, 130, 246),      # Blue vibrante
    'green': (34, 197, 94),      # Green vibrante
    'orange': (249, 115, 22),    # Orange vibrante
    'pink': (236, 72, 153),      # Pink vibrante
}

def create_image(name, creator_func):
    """Crea una imagen con fondo transparente"""
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Fondo oscuro
    draw.rectangle([(0, 0), (SIZE, SIZE)], fill=BG_COLOR)
    
    # Crear ilustración
    creator_func(draw)
    
    return img

def draw_rounded_rect(draw, bbox, radius=30, fill=None, outline=None, width=2):
    """Dibuja un rectángulo redondeado"""
    x1, y1, x2, y2 = bbox
    # Esquinas
    draw.arc([x1, y1, x1+radius*2, y1+radius*2], 180, 270, fill=outline, width=width)
    draw.arc([x2-radius*2, y1, x2, y1+radius*2], 270, 360, fill=outline, width=width)
    draw.arc([x2-radius*2, y2-radius*2, x2, y2], 0, 90, fill=outline, width=width)
    draw.arc([x1, y2-radius*2, x1+radius*2, y2], 90, 180, fill=outline, width=width)
    # Líneas
    draw.line([x1+radius, y1, x2-radius, y1], fill=outline, width=width)
    draw.line([x1+radius, y2, x2-radius, y2], fill=outline, width=width)
    draw.line([x1, y1+radius, x1, y2-radius], fill=outline, width=width)
    draw.line([x2, y1+radius, x2, y2-radius], fill=outline, width=width)
    # Relleno
    if fill:
        draw.rectangle([x1+width, y1+width, x2-width, y2-width], fill=fill)

# 1. Conversor de Monedas
def create_currency_converter(draw):
    """Monedas con flechas de intercambio"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color = ACCENT_COLORS['cyan']
    
    # Moneda izquierda
    draw.ellipse([center_x-120, center_y-60, center_x-40, center_y+40], fill=color, outline=color)
    draw.text((center_x-80, center_y-15), "$", fill=BG_COLOR, font=None, anchor="mm")
    
    # Moneda derecha
    draw.ellipse([center_x+40, center_y-60, center_x+120, center_y+40], fill=ACCENT_COLORS['orange'], outline=ACCENT_COLORS['orange'])
    draw.text((center_x+80, center_y-15), "€", fill=BG_COLOR, font=None, anchor="mm")
    
    # Flechas intercambio
    # Flecha izquierda
    draw.polygon([(center_x-25, center_y-35), (center_x-35, center_y-25), (center_x-20, center_y-20)], fill=color)
    draw.line([(center_x-20, center_y-20), (center_x+20, center_y-20)], fill=color, width=3)
    
    # Flecha derecha
    draw.polygon([(center_x+25, center_y+35), (center_x+35, center_y+25), (center_x+20, center_y+20)], fill=ACCENT_COLORS['orange'])
    draw.line([(center_x+20, center_y+20), (center_x-20, center_y+20)], fill=ACCENT_COLORS['orange'], width=3)

# 2. Concesionaria BlueJ
def create_dealership(draw):
    """Auto con engranajes"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color = ACCENT_COLORS['blue']
    
    # Cuerpo del auto
    draw.rectangle([center_x-70, center_y-30, center_x+70, center_y+10], fill=color)
    # Techo
    draw.polygon([(center_x-50, center_y-30), (center_x-30, center_y-50), (center_x+30, center_y-50), (center_x+50, center_y-30)], fill=color)
    
    # Ruedas
    draw.ellipse([center_x-60, center_y+5, center_x-35, center_y+30], fill=ACCENT_COLORS['purple'], outline=ACCENT_COLORS['purple'])
    draw.ellipse([center_x+35, center_y+5, center_x+60, center_y+30], fill=ACCENT_COLORS['purple'], outline=ACCENT_COLORS['purple'])
    
    # Engranajes detrás (pequeños)
    for i, pos in enumerate([(center_x-80, center_y-40), (center_x+80, center_y-40)]):
        for j in range(8):
            angle = (j * 45) * 3.14159 / 180
            x = pos[0] + 20 * math.cos(angle)
            y = pos[1] + 20 * math.sin(angle)
            draw.ellipse([x-3, y-3, x+3, y+3], fill=ACCENT_COLORS['orange'])

# 3. Java - De Cero a Héroe
def create_java_course(draw):
    """Logo Java estilizado"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color = ACCENT_COLORS['orange']
    
    # Taza de café (logo Java)
    # Cuerpo
    draw.rectangle([center_x-50, center_y-40, center_x+50, center_y+40], fill=color)
    # Asa
    draw.arc([center_x+35, center_y-30, center_x+75, center_y+30], 270, 90, fill=color, width=8)
    
    # Fondo educativo (líneas diagonales)
    for i in range(-100, 700, 30):
        draw.line([(i, 0), (i+SIZE, SIZE)], fill=ACCENT_COLORS['purple'], width=2)
    
    # Texto "J"
    draw.text((center_x, center_y), "J", fill=BG_COLOR, font=None, anchor="mm")

# 4. Habitus - Finance & Habits
def create_habitus(draw):
    """Gráfico financiero + calendario"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color_finance = ACCENT_COLORS['green']
    color_habit = ACCENT_COLORS['purple']
    
    # Gráfico de barras (izquierda)
    bar_heights = [30, 50, 40, 60, 45]
    for i, height in enumerate(bar_heights):
        x = center_x - 80 + i * 25
        draw.rectangle([x, center_y + 20 - height, x + 15, center_y + 20], fill=color_finance)
    
    # Línea de tendencia
    draw.line([(center_x-75, center_y-20), (center_x-10, center_y-40)], fill=color_finance, width=3)
    
    # Calendario (derecha)
    cal_x, cal_y = center_x + 60, center_y - 20
    draw.rectangle([cal_x-30, cal_y, cal_x+30, cal_y+50], outline=color_habit, width=2, fill=(0, 0, 0, 0))
    # Días (checkmarks)
    for i in range(3):
        check_x = cal_x - 20 + i * 20
        check_y = cal_y + 20
        draw.line([(check_x, check_y+5), (check_x+5, check_y+10)], fill=color_habit, width=2)
        draw.line([(check_x+5, check_y+10), (check_x+12, check_y-5)], fill=color_habit, width=2)

# 5. Amigo Secreto
def create_secret_gift(draw):
    """Regalo con lazo"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color_box = ACCENT_COLORS['pink']
    color_ribbon = ACCENT_COLORS['cyan']
    
    # Caja de regalo
    draw.rectangle([center_x-60, center_y-60, center_x+60, center_y+60], fill=color_box)
    
    # Tapa (abierta)
    draw.rectangle([center_x-60, center_y-70, center_x+60, center_y-60], fill=ACCENT_COLORS['orange'])
    
    # Listón vertical
    draw.rectangle([center_x-5, center_y-70, center_x+5, center_y+60], fill=color_ribbon)
    # Listón horizontal
    draw.rectangle([center_x-60, center_y-8, center_x+60, center_y+8], fill=color_ribbon)
    
    # Moño
    draw.ellipse([center_x-25, center_y-35, center_x+25, center_y-10], fill=color_ribbon)
    
    # Confeti (pequeños cuadros)
    import random
    random.seed(42)  # Para consistencia
    for _ in range(12):
        x = random.randint(center_x-90, center_x-70)
        y = random.randint(center_y-80, center_y-40)
        draw.rectangle([x, y, x+8, y+8], fill=ACCENT_COLORS['green'])

# 6. Gestor de Tareas en C
def create_task_manager(draw):
    """Lista de tareas con checkmarks"""
    center_x, center_y = SIZE // 2, SIZE // 2
    color = ACCENT_COLORS['blue']
    
    # Marco estilo consola retro
    draw.rectangle([center_x-80, center_y-70, center_x+80, center_y+70], outline=color, width=3)
    
    # Líneas de tareas
    line_height = 30
    for i in range(3):
        y = center_y - 50 + i * line_height
        # Checkbox
        draw.rectangle([center_x-70, y, center_x-50, y+20], outline=ACCENT_COLORS['green'], width=2)
        if i < 2:  # Las primeras dos tareas completadas
            draw.line([(center_x-68, y+8), (center_x-58, y+18)], fill=ACCENT_COLORS['green'], width=3)
            draw.line([(center_x-58, y+18), (center_x-52, y+2)], fill=ACCENT_COLORS['green'], width=3)
        
        # Línea de tarea
        draw.line([(center_x-40, y+10), (center_x+60, y+10)], fill=color, width=2)

# Crear todas las imágenes
projects = [
    ('currency_converter', create_currency_converter),
    ('dealership_bluej', create_dealership),
    ('java_zero_to_hero', create_java_course),
    ('habitus_finance', create_habitus),
    ('secret_gift', create_secret_gift),
    ('task_manager_c', create_task_manager),
]

output_dir = "public/images/projects"
os.makedirs(output_dir, exist_ok=True)

for name, creator_func in projects:
    try:
        img = create_image(name, creator_func)
        filepath = os.path.join(output_dir, f"{name}.png")
        img.save(filepath, "PNG")
        print(f"✓ Generado: {filepath}")
    except Exception as e:
        print(f"✗ Error generando {name}: {e}")

print("\n✅ Todas las ilustraciones han sido generadas exitosamente!")
print(f"Archivos guardados en: {output_dir}")
