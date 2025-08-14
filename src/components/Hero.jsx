import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


export default function Hero ({ slides = [] }) {

  const navigate = useNavigate();
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
        showArrows={false}
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
              <span className="hero-legend" style={{
                    display: "flex",
                    flexDirection: "column", // 🔹 apila título, descripción y botón
                    alignItems: "flex-start", // 🔹 alinea a la izquierda
                    gap: "0.5rem" // 🔹 espacio entre cada elemento
                  }}>
                <span className="hero-title">{s.title}</span>
                <span className="hero-desc">{s.description}</span>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#f35a5d",
                    "&:hover": { backgroundColor: "#d94b4e" },
                  }}
                  onClick={() => navigate(`/movie/${s.id}`)}
                >
                  Ver detalles
                </Button>
              </span>
              
            </p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
