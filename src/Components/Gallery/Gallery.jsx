import React, { useState } from "react";
import './Gallery.css'

import img1 from "../../assets/gallery1.jpeg";
import img2 from "../../assets/gallery2.jpeg";
import img3 from "../../assets/gallery3.jpeg";
import img4 from "../../assets/gallery4.jpeg";
import img5 from "../../assets/gallery5.jpeg";
import img6 from "../../assets/gallery6.jpeg";
import img7 from "../../assets/gallery7.jpeg";
import img8 from "../../assets/gallery8.jpeg";
const Gallery = () => {
  const [showMore, setShowMore] = useState(false);

  const images = [
 img1,
 img2,
 img3,
 img4,
 img5,
 img6,
 img7,
 img8,
  ];

  return (
    <section className="gallery">

      <div className="gallery-title">
        <p>GALLERY</p>
        <h2>Clinic Photos</h2>
      </div>

      <div className="gallery-container">

        {images.slice(0, 4).map((image, index) => (
          <div className="gallery-card" key={index}>
            <img src={image} alt="" />
          </div>
        ))}

      </div>

      {showMore && (
        <div className="gallery-container second-row">
          {images.slice(4, 8).map((image, index) => (
            <div className="gallery-card" key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      )}

      <button
        className="gallery-btn"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less ↑" : "See More Here →"}
      </button>

    </section>
  );
};

export default Gallery;