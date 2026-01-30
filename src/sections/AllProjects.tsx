const AllProjects: React.FC = () => {
  return (
    <div className="w-full h-20 bg-[#f6f7f9] py-6">
      <div className="relative mx-auto max-w-6xl px-4">

        <div className="border-t border-dashed border-gray-300 w-full"></div>

        <a
          href="#"
          className="
            absolute
            right-4 
            -bottom-3 
            text-[12px] 
            font-medium
            font-AppFont
            text-lime-500 
            hover:text-gray-400 
            transition
          "
        >
          ВСЕ ПРОЕКТЫ
        </a>

      </div>
    </div>
  );
};

export default AllProjects;
