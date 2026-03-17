import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock de useInView de framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useInView: () => true,
}));

describe('Contact Component', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  test('renderiza correctamente la sección de contacto', () => {
    // Verificar título principal
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Hablemos de tu próximo proyecto')).toBeInTheDocument();
    
    // Verificar subtítulo
    expect(screen.getByText(/¿Tienes una idea en mente?/)).toBeInTheDocument();
  });

  test('renderiza el formulario con todos los campos', () => {
    // Verificar campos del formulario por sus atributos
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu.email@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cuéntame sobre tu proyecto...')).toBeInTheDocument();
    
    // Verificar botón de envío
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  test('validación de campos requeridos', async () => {
    const user = userEvent.setup();
    
    // Intentar enviar formulario vacío
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    // Verificar que los campos requeridos muestran error
    const nameInput = screen.getByPlaceholderText('Tu nombre completo');
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');
    const messageInput = screen.getByPlaceholderText('Cuéntame sobre tu proyecto...');

    expect(nameInput).toBeInvalid();
    expect(emailInput).toBeInvalid();
    expect(messageInput).toBeInvalid();
  });

  test('validación de formato de email', async () => {
    const user = userEvent.setup();
    
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    // Ingresar email inválido
    await user.type(emailInput, 'email-invalido');
    await user.click(submitButton);

    // Verificar que el campo de email es inválido
    expect(emailInput).toBeInvalid();
  });

  test('manejo correcto del envío del formulario', async () => {
    const user = userEvent.setup();
    
    // Mock de fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    // Llenar formulario correctamente
    const nameInput = screen.getByPlaceholderText('Tu nombre completo');
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');
    const messageInput = screen.getByPlaceholderText('Cuéntame sobre tu proyecto...');
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    await user.type(nameInput, 'Emmanuel Ruiz');
    await user.type(emailInput, 'emmanuel@ejemplo.com');
    await user.type(messageInput, 'Este es un mensaje de prueba');

    // Enviar formulario
    await user.click(submitButton);

    // Verificar que fetch fue llamado
    expect(global.fetch).toHaveBeenCalled();

    // Esperar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado con éxito/i)).toBeInTheDocument();
    });
  });

  test('manejo de errores en el envío', async () => {
    const user = userEvent.setup();
    
    // Mock de fetch con error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error en el servidor' }),
      })
    );

    // Llenar formulario
    const nameInput = screen.getByPlaceholderText('Tu nombre completo');
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');
    const messageInput = screen.getByPlaceholderText('Cuéntame sobre tu proyecto...');
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    await user.type(nameInput, 'Emmanuel Ruiz');
    await user.type(emailInput, 'emmanuel@ejemplo.com');
    await user.type(messageInput, 'Mensaje de prueba');

    // Enviar formulario
    await user.click(submitButton);

    // Esperar mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/error al enviar el mensaje/i)).toBeInTheDocument();
    });
  });

  test('estado de loading durante el envío', async () => {
    const user = userEvent.setup();
    
    // Mock de fetch con delay
    global.fetch = jest.fn(() =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
        }, 100);
      })
    );

    // Llenar formulario
    const nameInput = screen.getByPlaceholderText('Tu nombre completo');
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');
    const messageInput = screen.getByPlaceholderText('Cuéntame sobre tu proyecto...');
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    await user.type(nameInput, 'Emmanuel Ruiz');
    await user.type(emailInput, 'emmanuel@ejemplo.com');
    await user.type(messageInput, 'Mensaje de prueba');

    // Enviar formulario
    await user.click(submitButton);

    // Verificar estado de loading
    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('renderiza información de contacto', () => {
    // Verificar tarjetas de información
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByText(/ubicación/i)).toBeInTheDocument();
    
    // Verificar botón de calendario
    expect(screen.getByRole('button', { name: /agendar reunión/i })).toBeInTheDocument();
  });

  test('renderiza enlaces a redes sociales', () => {
    // Verificar enlaces a redes sociales
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
  });

  test('accesibilidad del formulario', () => {
    // Verificar que los inputs tienen atributos autocomplete
    const nameInput = screen.getByPlaceholderText('Tu nombre completo');
    const emailInput = screen.getByPlaceholderText('tu.email@ejemplo.com');

    expect(nameInput).toHaveAttribute('autocomplete', 'name');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');

    // Verificar que los inputs tienen atributos required
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(screen.getByPlaceholderText('Cuéntame sobre tu proyecto...')).toBeRequired(); // Textarea
  });
});
