"use client";

import { useState } from "react";

import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { ProductImage } from "@/components";

interface Props {
  title: string;
  images: string[];
  className?: string;
}

export const ProductSlideshow = ({ title, images, className = "" }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        autoplay={{
          delay: 2500,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductImage
              alt={title}
              className="object-cover 2xl:object-contain"
              src={image}
              width={1024}
              height={1080}
              quality={90}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="max-w-44">
            <ProductImage
              alt={title}
              className="rounded-lg object-fill"
              src={image}
              width={300}
              height={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
