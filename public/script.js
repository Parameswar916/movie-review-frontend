document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("review-form");
    const reviewsList = document.getElementById("reviews-list");

    // Fetch and display reviews
    function fetchReviews() {
        fetch("http://localhost:5000/movies")
            .then(res => res.json())
            .then(data => {
                reviewsList.innerHTML = "";
                data.forEach(movie => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${movie.title}</strong> - ${movie.review} (Rating: ${movie.rating}) 
                                    <button onclick="deleteReview('${movie._id}')">Delete</button>`;
                    reviewsList.appendChild(li);
                });
            });
    }

    // Add a new review
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const review = document.getElementById("review").value;
        const rating = document.getElementById("rating").value;

        fetch("http://localhost:5000/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, review, rating })
        }).then(() => {
            reviewForm.reset();
            fetchReviews();
        });
    });

    // Delete a review
    window.deleteReview = (id) => {
        fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" })
            .then(() => fetchReviews());
    };

    fetchReviews();
});
