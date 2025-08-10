import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Hero({ slides = [] }) {
  return (
    <section className="w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3500}
        swipeable
        emulateTouch
        stopOnHover
        useKeyboardArrows
      >
        {slides.map((s) => (
          <div key={s.id}>
            <img src={s.src} alt={s.title} loading="lazy" />

            {/* Legend = overlay sobre la imagen */}
            <div className="legend">
              <h2 className="text-lg md:text-2xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm md:text-base opacity-90">{s.description}</p>

              {/* Botón debajo de la descripción */}
              <div className="mt-4">
                <Link
                  to={`/movie/${s.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-black hover:bg-white"
                  aria-label={`Ver detalle de ${s.title}`}
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}