import React from "react";
import { Link } from "react-router-dom";

const BookNow = () => {
  return (
    <>
      <div className="book-now text-center">
        <div className="common-padding book-now_details">
          <h3>Book Your Venue Now!</h3>
          <p className="desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            velit error a. Qui, optio. Quod consequuntur est assumenda dolor,
            aliquam dolore. Molestias et placeat laudantium nobis totam velit
            veniam enim.
          </p>
          <Link to="/venue">
            <p
              className="availability mb-2"
              style={{ display: "inline-block" }}
            >
              View All Venues
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookNow;
