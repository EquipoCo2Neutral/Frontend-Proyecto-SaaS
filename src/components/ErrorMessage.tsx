export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center my-4 bg-orange-100 text-orange-600 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
}
