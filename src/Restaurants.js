import { useEffect, useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { zomatoApiKey } from "./APIKeys.js";
import Slider from "@material-ui/core/Slider";
import { mdiClose, mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";

function Restaurants() {
  let { cityId } = useParams();
  // Hardcoded, can be replaced with an API call
  const categories = [
    { id: 2, name: "Dining" },
    { id: 5, name: "Takeaway" },
    { id: 1, name: "Delivery" },
    { id: 11, name: "Pubs & Bars" },
  ];
  const cuisines = [
    { id: 1039, name: "Cafe Food" },
    { id: 3, name: "Asian" },
    { id: 25, name: "Chinese" },
    { id: 161, name: "Coffee and Tea" },
    { id: 5, name: "Bakery" },
    { id: 983, name: "Pub Food" },
    { id: 82, name: "Pizza" },
    { id: 55, name: "Italian" },
    { id: -1, name: "Other" },
    { id: 40, name: "Fast Food" },
    { id: 304, name: "Sandwich" },
  ];
  const [restaurants, setRestaurants] = useState([]);
  const [ratingRange, setRatingRange] = useState([1, 5]);
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(-1);
  const [restaurantObject, setRestaurantObject] = useState({});
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [cuisinesFilter, setCuisinesFilter] = useState([]);
  const [restaurantsList, setRestaurantsList] = useState([]);

  useEffect(() => {
    if (selectedRestaurant !== -1) {
      setRestaurantObject(
        restaurants.find(
          (restaurant) => restaurant.restaurant.id === selectedRestaurant
        ).restaurant
      );
      if (document.querySelector(".active") != null)
        document.querySelector(".active").classList.remove("active");
      document
        .getElementById("restaurant-" + selectedRestaurant)
        .classList.add("active");
    }
  }, [selectedRestaurant, restaurantObject]);

  const handleRatingChange = (event, newRatingRange) => {
    setRatingRange(newRatingRange);
  };

  const handlePriceChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    console.log("GOT HERE")
    var tempRestaurants = [];
    // for (var i = 0 ; i <=80  ; i += 20) {
    //   fetch(
    //     "https://developers.zomato.com/api/v2.1/search?entity_id=" +
    //       cityId +
    //       "&entity_type=city&start="+i+
    //       "&count=20",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "user-key": zomatoApiKey,
    //       },
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setRestaurants(data.restaurants);
    //       tempRestaurants.push(data.restaurants);
    //     })
    // }
    Promise.all([0,20,40,60,80].map(start=>{
      fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city&start=" + start + "&count=20",
          {
            headers: {
              "Content-Type": "application/json",
              "user-key": zomatoApiKey,
            }
          }
        ).then(response => response.json())
        .then((data) => {
          data.restaurants.forEach(restaurant=>tempRestaurants.push(restaurant))
        })
    })).then(()=>setRestaurantsList(tempRestaurants));
    // console.log(tempRestaurants);
    // setRestaurants(tempRestaurants);

  }, [cityId]);

  useEffect(() => {
    setRestaurants(restaurantsList.length > 0 ? restaurants.map((restaurant) => {
      return (
        <>
          <li
            className="px-5 py-3"
            id={"restaurant-" + restaurant.restaurant.id}
            key={restaurant.restaurant.id}
          >
            <a
              href="#!"
              className="w-100 d-block"
              style={{ height: 100 + "%" }}
              onClick={() =>
                setSelectedRestaurant(restaurant.restaurant.id)
              }
            >
              {restaurant.restaurant.name}
            </a>
          </li>
        </>
      );
    }):<>Loading</>)
  },[restaurantsList])

  return (
    <Container fluid className="px-0">
      <Filters />
      <Row
        style={{ background: "#e5e5e5", height: 75 + "vh" }}
        className="px-0"
      >
        <Col md="3" className="results-container px-0">
          <ul className="results-list px-0">
            <li className="px-5 py-3">Results</li>

            {/* {restaurants.length > 0 ? (
              restaurants.map((restaurant) => {
                return (
                  <>
                    <li
                      className="px-5 py-3"
                      id={"restaurant-" + restaurant.restaurant.id}
                      key={restaurant.restaurant.id}
                    >
                      <a
                        href="#!"
                        className="w-100 d-block"
                        style={{ height: 100 + "%" }}
                        onClick={() =>
                          setSelectedRestaurant(restaurant.restaurant.id)
                        }
                      >
                        {restaurant.restaurant.name}
                      </a>
                    </li>
                  </>
                );
              })
            ) : (
              <></>
            )} */}
            {restaurants}
          </ul>
        </Col>
        <Col
          md="9"
          style={{
            background: "#f1f1f1",
          }}
        >
          {Object.keys(restaurantObject).length === 0 ? (
            <></>
          ) : (
            <>
              <Row className="w-75 m-auto pt-5">
                <Col xs="12" md="6">
                  <img
                    src={restaurantObject.featured_image}
                    className="img-fluid"
                  />
                </Col>
                <Col xs="12" md="6">
                  <h3 className="pb-0 mb-0">{restaurantObject.name}</h3>
                  <small style={{ color: "#727678" }}>
                    {restaurantObject.location.address}
                  </small>
                  <small style={{ color: "#727678" }} className="d-block mt-3">
                    {restaurantObject.has_table_booking ? (
                      <>
                        <Icon path={mdiCheck} size={1} color="#50bf55" />
                        &nbsp;Booking Available
                      </>
                    ) : (
                      <>
                        <Icon path={mdiClose} size={1} color="#bf5050" />
                        &nbsp;No Booking
                      </>
                    )}
                  </small>
                  <small style={{ color: "#727678" }} className="d-block">
                    {restaurantObject.has_online_delivery ? (
                      <>
                        <Icon path={mdiCheck} size={1} color="#50bf55" />
                        &nbsp;Delivery Available
                      </>
                    ) : (
                      <>
                        <Icon path={mdiClose} size={1} color="#bf5050" />
                        &nbsp;No Delivery
                      </>
                    )}
                  </small>
                  <h5 className="mt-3">Cuisines</h5>
                  {restaurantObject.cuisines}
                  <h5 className="mt-3">Phone Number</h5>
                  {restaurantObject.phone_numbers}
                  <h5 className="mt-3">Opening Hours</h5>
                  {restaurantObject.cuisines}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );

  function Filters() {
    return (
      <Row className="px-5 py-3" style={{ height: 25 + "vh" }}>
        <Col xs="12">
          <Row className="filters pt-3">
            <Col xs="12" md="2">
              <h5>Categories</h5>
              {categories.map((category) => {
                return (
                  <div
                    className="custom-control custom-checkbox"
                    key={category.id}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"category-" + category.id}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={"category-" + category.id}
                    >
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </Col>
            <Col
              xs="12"
              md="4"
              style={{
                maxHeight: 20 + "vh",
                overflow: "scroll",
              }}
            >
              <h5>Cuisines</h5>
              <Row>
                {cuisines.map((cuisine) => {
                  return (
                    <Col xs="12" sm="6" md="4" key={cuisine.id}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={"cuisine-" + cuisine.id}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={"cuisine-" + cuisine.id}
                        >
                          {cuisine.name}
                        </label>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col xs="12" md="3" className="offset-md-3">
              <h5>Rating</h5>
              <Slider
                className="mb-1 pt-1"
                value={ratingRange}
                onChange={handleRatingChange}
                // valueLabelDisplay="auto"
                marks={[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                ]}
                aria-labelledby="range-slider"
                min={1}
                max={5}
              />
              <div
                className="labels d-flex justify-content-between p-0"
                style={{ marginTop: -10 + "px" }}
              >
                <div style={{ marginLeft: -5 + "px" }}>1</div>
                <div style={{ marginRight: -5 + "px" }}>5</div>
              </div>
              <h5 className="mt-3">Cost</h5>
              <Slider
                id="priceSlider"
                className="mb-1 pt-1"
                value={priceRange}
                onChange={handlePriceChange}
                // valueLabelDisplay="auto"
                marks={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]}
                aria-labelledby="range-slider"
                min={1}
                max={4}
              />
              <div
                className="labels d-flex justify-content-between p-0"
                style={{ marginTop: -10 + "px" }}
              >
                <div style={{ marginLeft: -4 + "px" }}>$</div>
                <div style={{ marginRight: -15 + "px" }}>$$$$</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Restaurants;
