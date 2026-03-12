import { useState } from "react";
import EmailCaptureModal from "../components/EmailCaptureModal";

function CheckEmail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Email Capture Modal Demo</h1>

      <div>
        <button onClick={() => setIsModalOpen(true)}>
          Open Email Capture Modal
        </button>
      </div>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join Our Newsletter"
      />
    </div>
  );
}

export default CheckEmail;
