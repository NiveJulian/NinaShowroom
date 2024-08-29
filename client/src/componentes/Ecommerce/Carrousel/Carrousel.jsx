import { useRef, useEffect } from "react";

const Carrousel = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play();
    video.loop = true;
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full h-screen md:h-100 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover z-10"
        src="landingvideo.mp4"
        autoPlay
        muted
        loop
        style={{
          // objectFit: "cover",
          objectPosition: "center", // Desplaza la posición del video para ocultar la marca de agua
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute bottom-32 text-2xl text-center text-white italic z-20 lg:top-40 lg:left-52 md:text-5xl">
        {["N", "I", "N", "A", " ", "S", "h", "o", "w", "r", "o", "o", "m"].map(
          (letter, index) => (
            <span
              key={index}
              className={`letter-span ${
                index < 4 ? "text-primary font-bold" : ""
              }`}
              style={{ animationDelay: `${index * 0.005}s` }}
            >
              {letter}
            </span>
          )
        )}
        <p className="text-sm mt-2 md:mt-4 animate-pulse">No busques moda, <span className="text-primary italic">CREA</span> tu estilo</p>
      </div>
    </div>
  );
};

export default Carrousel;
