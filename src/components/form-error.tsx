// import { ExclamationTriangleIcon } from 'lucide-react'
import { FileWarning } from "lucide-react";

interface FormErrorProps {
  message?: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FileWarning className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};