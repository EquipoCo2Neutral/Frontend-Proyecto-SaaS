interface ErrorAlertProps {
  message?: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message || 'Ocurrió un error al cargar los datos'}</span>
    </div>
  </div>
);