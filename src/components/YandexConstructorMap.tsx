import React, { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
};

const YandexConstructorMap: React.FC<Props> = ({ src, className }) => {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;

    holder.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    script.src = src.replace(/&amp;/g, "&");

    holder.appendChild(script);

    return () => {
      holder.innerHTML = "";
    };
  }, [src]);

  return <div ref={holderRef} className={className} />;
};

export default YandexConstructorMap;
