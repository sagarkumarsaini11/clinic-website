import React, { useEffect, useState } from "react";
import "./Facilities.css";

import img1 from "../../assets/facility1.jpeg";
import img2 from "../../assets/facility2.jpeg";
import img3 from "../../assets/facility3.jpeg";
import img4 from "../../assets/facility4.jpeg";
import img5 from "../../assets/facility5.jpeg";
import img6 from "../../assets/facility6.jpeg";
import img7 from "../../assets/facility7.jpeg";
import img8 from "../../assets/facility8.jpeg";
import img9 from "../../assets/facility9.jpg";
import img10 from "../../assets/facility10.jpg";
import img11 from "../../assets/facility11.jpg";
import img12 from "../../assets/facility12.jpg";
import img13 from "../../assets/facility13.png";
import img14 from "../../assets/facility14.jpg";
import img15 from "../../assets/facility15.jpeg";
import img16 from "../../assets/facility16.jpg";
import img17 from "../../assets/facility17.jpg";
const Facilities = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const facilitiesData = [
    {
      image: img1,
      title: "Electro-Massage",
    },
    {
      image: img2,
      title: "PEMF Therapy",
    },
    {
      image: img3,
      title: "Shockwave Therapy",
    },
    {
      image: img4,
      title: "Laser Therapy",
    },
    {
      image: img5,
      title: "CPM-Therapy",
    },
    {
      image: img6,
      title: "IFT-Therapy",
    },
    {
      image: img7,
      title: "Ultrasonic Therapy(US)",
    },
      {
      image: img8,
      title: "Russian Current Therapy",
    },
      {
      image: img9,
      title: "Cervical Spondylities & Neck Pain",
    },
      {
      image: img10,
      title: "Sports & Gym Injury",
    },
      {
      image: img11,
      title: "Knee Pain & Osteoarthrities",
    },
      {
      image: img12,
      title: "Sciatica Pain",
    },
      {
      image: img13,
      title: "Numbness & Sensation",
    },
      {
      image: img14,
      title: "Frozen Shoulder",
    },
      {
      image: img15,
      title: "Kinesio Taping",
    },
      {
      image: img16,
      title: "Cuppping Therapy-Hijama",
    },
       {
      image: img17,
      title: "Actual Back Pain",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [forward, setForward] = useState(true);

useEffect(() => {

  const interval = setInterval(() => {

    setCurrentIndex((prev) =>
      prev >= facilitiesData.length - 3
        ? 0
        : prev + 1
    );

  }, 5000);

  return () => clearInterval(interval);

}, [facilitiesData.length]);

  return (
    <section className="facilities">
      <div className="title">
        <p>OUR FACILITIES</p>
        <h2>World Class Facilities</h2>
      </div>

<div className="slider-wrapper">

  <button
    className="slider-btn left-btn"
    onClick={() =>  setCurrentIndex((prev) => prev === 0
      ? facilitiesData.length - 3
        : prev - 1
      )  
    }>   ❮   </button>
      

  <div className="slider-track">

    {facilitiesData
      .slice(currentIndex, currentIndex + 3)
      .map((item, index) => (
        <div
          key={index}
          className={`slide ${
            index === 1 ? "active" : ""
          }`}>
        
          <img  src={item.image}  alt={item.title}
             className="facility-image" onClick={() =>
             setSelectedImage(item)  } />
        

          <div className="caption">
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}

  </div>

  <button  className="slider-btn right-btn"  onClick={() =>
   setCurrentIndex((prev) => prev >= facilitiesData.length - 3
   ? 0 : prev + 1)} > ❯ </button>
    
      {selectedImage && (
       <div   className="image-modal"
        onClick={() => setSelectedImage(null)}  >
    

    <div   className="image-modal-content"
     onClick={(e) => e.stopPropagation()}>
    
      <button  className="close-modal"  onClick={() => setSelectedImage(null)} >
       ✕ </button>
    
      <img src={selectedImage.image}  alt={selectedImage.title}/>
        <h2>{selectedImage.title}</h2>
      </div>
      </div>  )}
</div>
  </section>     
  );
};    
export default Facilities;



  


