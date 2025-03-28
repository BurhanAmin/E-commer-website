<script>
      AOS.init();

      // Added search functionality (just an example)
      function performSearch() {
        const query = document.getElementById("search").value;
        if (query) {
          alert("Searching for: " + query);
        } else {
          alert("Please enter a search term");
        }
      }

      var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n){
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

AOS.init();

// Handle Review Submission
document.getElementById("review-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("reviewer-name").value;
    const rating = document.getElementById("review-rating").value;
    const comment = document.getElementById("review-comment").value;

    if (name && rating && comment) {
        const reviewContainer = document.getElementById("reviews-container");
        const review = document.createElement("div");
        review.classList.add("review");
        review.innerHTML = `<strong>${name}</strong> - ${"★".repeat(rating)}<p>${comment}</p>`;
        reviewContainer.appendChild(review);

        // Clear the form after submission
        document.getElementById("review-form").reset();
    }
});
</script>
    