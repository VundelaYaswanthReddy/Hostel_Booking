import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";
import MailList from "../../components/mailList/MailList";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { API_URL } from "../../key";
import { AuthContext } from "../../context/AuthContext";
import Reseravtion from "../../components/reservation/Reseravtion";
function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`${API_URL}/hotels/find/${id}`);
  // console.log("data is", data);
  // console.log("Location is ", location);

  const { dates, options } = useContext(SearchContext);
  console.log("dates are", dates);
  console.log("options ", options);

  // const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timediff = Math.abs(date2.getTIme() - date1.getTime());
  //   const diffdays = Math.ceil(timediff / MILLISECONDS_PER_DAY);
  //   return diffdays;
  // }

  // console.log(
  //   "Days difference ",
  //   dayDifference(dates[0].endDate , dates[0].startDate)
  // );

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (e) => {
    if (user) {
      setOpenModal(true);
      e.preventDefault();
    } else {
      navigate("/login");
    }
  };
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address || "Somewhere"}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {2}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>
                  $
                  {2 *
                    Number(data.cheapestPrice) *
                    (options.room === { undefined } ? 1 : 1)}
                </b>{" "}
                (2 nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
              {console.log(openModal)}
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && <Reseravtion setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
}

export default Hotel;
