import { useNavigate } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";


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
              maxHeight: "700px",   // 
              width: "100%",
              objectFit: "cover"
      }} />
        
            <p className="legend" sytle={{ background: "transparent"}}>
              <span className="hero-legend" style={{
                    display: "flex",
                    flexDirection: "column", 
                    alignItems: "flex-start", 
                    gap: "0.5rem" 
                  }}>
                <span className="hero-title">{s.title}</span>
                <span className="hero-desc">{s.description}</span>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#98c7f3",
                    "&:hover": { backgroundColor: "#d94b4e" },
                    borderRadius: "20px",
                    color: "#272727"
                  }}
                  onClick={() => navigate(`/movie/${s.id}`)}
                >
                  Ver detalle
                </Button>
              </span>
              
            </p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
