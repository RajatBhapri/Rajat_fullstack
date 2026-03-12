interface DeleteModalProps {
  open: boolean;
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  open,
  taskTitle,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Delete Task</h3>
        <p>
          Are you sure you want to delete <strong>{taskTitle}</strong>?
        </p>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="danger-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
