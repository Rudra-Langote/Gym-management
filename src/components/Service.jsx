import React from 'react';
import Image from 'next/image';

const Service = ({ img, head, disc, alt }) => {
  return (
    <div
      id="Service"
      className="m-5 my-10 p-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 transform transition-all duration-500 hover:scale-100 hover:shadow-2xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-110">
          <Image
            height={200}
            quality={100}
            src={img}
            alt={alt}
            className="rounded-lg group-hover:opacity-90"
          />
        </div>
        <div className="text-white text-center md:text-left transform transition-all duration-500 hover:scale-105">
          <h1 className="text-3xl text-yellow-500 font-bold mb-3">{head}</h1>
          <p className="my-1 text-md leading-relaxed">{disc}</p>
        </div>
      </div>
    </div>
  );
};

export default Service;

