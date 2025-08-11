import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";

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
          <div key={s.id} className="hero-slide">
            <img src={s.src} alt={s.title} loading="lazy" style={{
              maxHeight: "700px",   // 🔹 alto máximo del carrusel
              width: "100%",
              objectFit: "cover"
      }} />
            {/* La leyenda aparece SOBRE la imagen por defecto */}
            <p className="legend" sytle={{ background: "transparent"}}>
              <span className="hero-legend">
              <span className="hero-title">{s.title}</span>
              <span className="hero-desc">{s.description}</span>
  </span>
</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
