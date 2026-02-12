import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 text-center"
          role="alert"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Algo salió mal
          </h1>
          <p className="text-gray-400 max-w-md mb-6">
            La aplicación encontró un error. Por favor, recarga la página o inténtalo más tarde.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all focus-ring"
            aria-label="Recargar la página"
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
