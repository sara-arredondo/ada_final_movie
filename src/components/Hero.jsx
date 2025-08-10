import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Hero ({ slides = [] }) {
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
            {/* La leyenda aparece SOBRE la imagen por defecto */}
            <p className="legend">
              <strong>{s.title}</strong><br />
              {s.description}
            </p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
