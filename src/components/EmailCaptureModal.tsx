import { useEffect, useState, useRef } from "react";
import "../css/EmailCaptureModal.css";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

function EmailCaptureModal({
  isOpen,
  onClose,
  title = "Capture Email",
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2>{title}</h2>
        {/* noValidate - Desactiva validación HTML5 en el navegador */}
        <form onSubmit={handleSubmit} noValidate>
          <input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={error ? "error" : ""} // ← Clase condicional para borde rojo
          />

          {/* Mostrar error */}
          {error && <span className="error-message">{error}</span>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EmailCaptureModal;
