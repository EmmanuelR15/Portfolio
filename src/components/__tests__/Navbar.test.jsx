import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

// Mock de window.scrollTo para tests
global.scrollTo = jest.fn();

describe('Navbar Component', () => {
  const defaultProps = {
    isScrolled: false,
    activeSection: 'home'
  };

  beforeEach(() => {
    render(<Navbar {...defaultProps} />);
  });

  test('renderiza correctamente el navbar', () => {
    // Verificar que el logo/título esté presente
    expect(screen.getByText('Emmanuel Ruiz')).toBeInTheDocument();
    
    // Verificar que los enlaces de navegación estén presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  test('aplica clases correctas cuando no está scrolled', () => {
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('bg-transparent');
    expect(navbar).not.toHaveClass('glass-morphism');
  });

  test('aplica clases correctas cuando está scrolled', () => {
    render(<Navbar {...defaultProps} isScrolled={true} />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('glass-morphism');
    expect(navbar).not.toHaveClass('bg-transparent');
  });

  test('muestra sección activa correctamente', () => {
    render(<Navbar {...defaultProps} activeSection="about" />);
    const aboutLink = screen.getByText('Sobre mí');
    expect(aboutLink.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  test('el menú móvil está cerrado inicialmente', () => {
    // Verificar que el menú móvil no está visible
    const mobileMenu = screen.queryByRole('navigation').querySelector('[data-mobile-menu]');
    expect(mobileMenu).not.toBeInTheDocument();
  });

  test('abre y cierra el menú móvil', async () => {
    const user = userEvent.setup();
    
    // Encontrar el botón de menú móvil (solo visible en móvil)
    const mobileMenuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(mobileMenuButton).toBeInTheDocument();

    // Abrir menú móvil
    await user.click(mobileMenuButton);
    
    // Verificar que el menú se abre
    await waitFor(() => {
      const mobileMenu = screen.getByRole('navigation').querySelector('[data-mobile-menu]');
      expect(mobileMenu).toBeInTheDocument();
    });

    // Verificar que el botón cambia a "Cerrar menú"
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument();
  });

  test('navegación a sección funciona correctamente', async () => {
    const user = userEvent.setup();
    
    // Mock de scrollTo
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;
    
    // Mock de getElementById
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 }),
      offsetHeight: 500
    };
    document.getElementById = jest.fn().mockReturnValue(mockElement);
    
    // Hacer clic en un enlace de navegación
    const projectsLink = screen.getByText('Proyectos');
    await user.click(projectsLink);

    // Verificar que se llama a scrollTo
    expect(scrollToMock).toHaveBeenCalled();
  });

  test('accesibilidad del navbar', () => {
    // Verificar que el nav tiene el rol correcto
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveAttribute('aria-label', 'Menú principal');

    // Verificar que los enlaces tienen atributos aria-current cuando están activos
    const homeLink = screen.getByText('Inicio');
    expect(homeLink.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  test('responsive - menú móvil solo visible en móvil', () => {
    // Verificar que el botón de menú móvil tiene clase md:hidden
    const mobileMenuButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(mobileMenuButton).toHaveClass('md:hidden');
  });
});
