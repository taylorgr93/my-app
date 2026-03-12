import { useEffect, useState, useRef } from "react";
import "../css/EmailCaptureModal.css";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  buttonColor?: string;
  description?: string;
}

function EmailCaptureModal({
  isOpen,
  onClose,
  title = "Capture Email",
  buttonColor = "#007bff",
  description,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // crear ref para el input

  // Limpiar estado cuando el modal se cierra
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setError("");
    }
  }, [isOpen]); // Se ejecuta cada vez que isOpen cambia

  // Enfocar el input cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // cerrar con escape
  useEffect(() => {
    if (!isOpen) return; // ← IMPORTANTE: Sale temprano si está cerrado

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // SETUP: Se ejecuta cuando el componente monta o deps cambian
    window.addEventListener("keydown", handleEscape);

    // CLEANUP: Se ejecuta ANTES del próximo setup o al desmontar
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Limpiar error al escribir
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 1. Evita que la página se recargue

    // Validar vacío
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // Validar formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    console.log("Valid email:", email);
    onClose(); // cerrar modal
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog" // ← Indica que es un diálogo
      aria-modal="true" // ← Es modal (bloquea contenido detrás)
      aria-labelledby="modal-title" // ← Conecta con el título
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Close modal" // ← Para screen readers
        >
          &times;
        </button>

        <h2>{title}</h2>

        {description && (
          <p id="modal-description" className="modal-description">
            {description}
          </p>
        )}

        {/* noValidate - Desactiva validación HTML5 en el navegador */}
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input" // ← Conecta con label
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={error ? "error" : ""} // ← Clase condicional para borde rojo
            aria-invalid={error ? "true" : "false"} // ← Indica error
            aria-describedby={error ? "email-error" : undefined}
          />

          {/* Mostrar error */}
          {error && (
            <span
              id="email-error"
              className="error-message"
              role="alert" // ← Screen reader anuncia error
            >
              {error}
            </span>
          )}

          <button type="submit" style={{ backgroundColor: buttonColor }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailCaptureModal;
