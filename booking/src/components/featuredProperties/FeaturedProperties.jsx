import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../key";
function FeaturedProperties() {
  const { data, loading, error, reFetch } = useFetch(
    `${API_URL}/hotels?featured=true&limit=5`
  );
  console.log(data[0]);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos} alt="" className="fpImg" />
              <div className="fpName">{item.name}</div>
              <div className="fpCity">{item.city}</div>
              <div className="fpPrice">Starting from ${item.cheapestPrice}</div>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <div>Excellent</div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties;
