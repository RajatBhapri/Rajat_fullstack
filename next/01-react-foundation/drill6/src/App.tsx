import { useState } from "react";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = false;

  return (
    <Layout>
      <ErrorBoundary>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        {loading && <LoadingSpinner />}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>This is a modal content.</p>
        </Modal>
      </ErrorBoundary>
    </Layout>
  );
}
