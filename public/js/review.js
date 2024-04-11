// Modify your existing review.js file to handle form submission
const submitReview = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const formData = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        user: document.getElementById('user').value,
        rating: document.getElementById('rating').value
    };

    try {
        const response = await fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Log success message
            // Update the UI to display the newly submitted review
            displayReview(data.review);
        } else {
            console.error('Failed to submit review');
            // Optionally, update the UI to indicate failure
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        // Optionally, update the UI to indicate error
    }
};

const displayReview = (reviews) => {
    // Create HTML elements to display the review
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
        <h2>${reviews.title}</h2>
        <p>${reviews.content}</p>
        <p>Submitted by: ${reviews.user}</p>
        <p>Rating: ${reviews.rating}/5</p>
        <p>Date: ${reviews.date}</p>
    `;
    
    // Append the review to the reviews container
    const reviewsContainer = document.querySelector('.container');
    reviewsContainer.appendChild(reviewElement);
};

// Attach submitReview function to the form submit event
document.getElementById('review-form').addEventListener('submit', submitReview);
