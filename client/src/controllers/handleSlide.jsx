const handleSlide = (direction) => {
    const carousel = document.querySelector("#controls-carousel .flex");
    const currentTransform = parseInt(carousel.style.transform.replace("translateX(", "").replace("%)", "")) || 0;
  
    if (direction === "next" && currentTransform > -100) {
      carousel.style.transform = `translateX(${currentTransform - 100}%)`;
    } else if (direction === "prev" && currentTransform < 0) {
      carousel.style.transform = `translateX(${currentTransform + 100}%)`;
    }
  };

export default handleSlide;