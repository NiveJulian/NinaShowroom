import { useRef, useEffect } from "react";

const Carrousel = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play();
    video.loop = true;
  }, []);

  return (
    <div className="relative w-full h-100 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover z-10"
        src="landingvideo.mp4"
        autoPlay
        muted
        loop
        style={{
          objectFit: "cover",
          objectPosition: "top left", // Desplaza la posición del video para ocultar la marca de agua
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute top-52 left-52 italic z-20 text-5xl text-white">
        {["N", "I", "N", "A", " ", "S", "h", "o", "w", "r", "o", "o", "m"].map(
          (letter, index) => (
            <span
              key={index}
              className={`letter-span ${
                index < 4 ? "text-primary font-bold" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          )
        )}
        <p className="text-sm mt-2 animate-pulse">Tu tienda de confianza</p>
      </div>
    </div>
  );
};

export default Carrousel;
