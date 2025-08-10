import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Hero({ images, swiperConfig }) {
  return (
    <section className="w-full bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Swiper {...swiperConfig} className="rounded-2xl overflow-hidden">
          {images.map(img => (
            <SwiperSlide key={img.id}>
              <img src={img.src} alt={img.alt} className="w-full h-72 md:h-96 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}