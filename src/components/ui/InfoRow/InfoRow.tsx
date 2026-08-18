interface InfoRowProps {
  title: string;
  items: string[];
}

export default function InfoRow({ title, items }: InfoRowProps) {
  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-1 text-md">
      <h3 className="font-semibold">{title}</h3>

      <p className="text-general-text-mid">{items.join(", ")}</p>
    </div>
  );
}
