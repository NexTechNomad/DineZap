import { type FC } from "react";

interface SearchHeaderProps {
  title: string;
  description: string;
  searchPlaceholder: string;
}

const SearchHeader: FC<SearchHeaderProps> = ({
  title,
  description,
  searchPlaceholder,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-8 gap-4 mt-16 lg:mt-0">
      <div>
        <h1 className="text-2xl font-semibold text-purple-900">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full lg:w-auto px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <img
          src="https://i.pravatar.cc/32"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default SearchHeader;
