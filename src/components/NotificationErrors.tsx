import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useCallback } from "react";

interface NotificationErrorsProps {
  errors: string[];
  onClose?(): void;
}

const NotificationErrors = ({ errors, onClose }: NotificationErrorsProps) => {
  const handleClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") return;
      if (onClose) onClose();
    },
    [onClose]
  );

  return (
    <Snackbar open={Boolean(errors.length)} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </Alert>
    </Snackbar>
  );
};

export default NotificationErrors;
