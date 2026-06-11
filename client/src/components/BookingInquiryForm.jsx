import "./BookingInquiryForm.css";

function BookingInquiryForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // later you will connect backend API here
    alert("Booking Inquiry Submitted!");
  };

  return (
    <div className="inquiry-container">
      <div className="inquiry-card">
        <h2>Booking Inquiry</h2>
        <p>Fill the form to request a venue booking</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />

          <input type="date" required />

          <textarea
            placeholder="Event Details (wedding, party, meeting etc.)"
            rows="5"
            required
          ></textarea>

          <button type="submit">Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
}

export default BookingInquiryForm;