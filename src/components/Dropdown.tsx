import React, { useState } from "react";

export type DropdownItem = {
  label: string;
  href: string;
};

type DropdownProps = {
  content: DropdownItem[];
};

const Dropdown: React.FC<DropdownProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative inline-block text-center md:text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-black"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{content[0]?.label}</span>
        <span className="text-[10px] sm:text-xs">▾</span>
      </button>


      {isOpen && (
        <div
          className="
            absolute left-1/2 top-full z-30
            mt-0
            pt-2
            w-48 -translate-x-1/2
            rounded-md border border-gray-200 bg-white py-1
            text-xs shadow-lg
          "
        >
          <div className="bg-white rounded-md shadow">
            {content.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-center text-blue-700 hover:bg-gray-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
