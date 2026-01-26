import React from 'react';
import {advantages} from "../constants/sircles";

const Circles: React.FC = () => {
  return (
    <section className="w-full bg-white py-14">
      <div className="w-full px-6">
        <div className="flex w-full flex-wrap justify-between gap-4">
          {advantages.map((item) => (
            <div key={item.id} className="group flex w-full flex-col items-center text-center sm:w-auto">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-gray-300 bg-white box-border transition-colors duration-300 group-hover:border-lime-400">
                <img src={item.icon} alt={item.title} className="h-20 w-20 object-contain" />
              </div>
              <p className="mt-4 text-sm font-semibold leading-tight text-gray-800 transition-colors duration-300 group-hover:text-lime-400">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Circles;