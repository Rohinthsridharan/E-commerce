import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <main className="main-content1">
          <h2>Get your arts with our talented artist.</h2>
          <button>
            <a href="/shop">Shop</a>
          </button>
        </main>
        <main className="main-content2">
          <p>
            Artify is a unique online platform crafted to transform your cherished
            memories into timeless works of art. Designed for customers who value
            personalized artistry, Artify connects you with a talented community
            of artists skilled in a variety of styles and categories. Whether you
            prefer classic oil paintings, vibrant watercolors, or modern digital
            illustrations, Artify ensures that your photos are reimagined into
            stunning, handcrafted creations. Each piece is meticulously crafted by
            an artist whose expertise aligns with your chosen style, guaranteeing
            a perfect blend of personal sentiment and professional artistry.
            Explore Artify to preserve your moments as exquisite masterpieces.
          </p>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
