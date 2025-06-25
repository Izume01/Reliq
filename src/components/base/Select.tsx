import { ChevronDown } from "lucide-react";

export const Select = ({
  value,
  onChange,
  options,
  id,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: number }[];
  id?: string;
}) => {
  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none w-full px-5 py-3 pr-10 text-sm border border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
};
