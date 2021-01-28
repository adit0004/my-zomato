import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    // Don't fire an API call if there's less than 3 characters because of the rate limits
    if (query.length > 2) {
      fetch("https://developers.zomato.com/api/v2.1/locations?query=" + query + "&count=7", {
        headers: {
          "Content-Type": "application/json",
          "user-key": "2a462fea81d31f52adc9f40f73c7668a",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          document
            .querySelector("#autocomplete-dropdown")
            .classList.remove("d-none");
          console.log(data);
          data.length !== 0 && data.location_suggestions.length > 0
            ? setCities(
                data.location_suggestions.map((city, index) => {
                  return (
                    <div key={index} className="w-100 py-3 px-2">
                      <a href={'/restaurants/'+city.city_id+'/'+city.latitude+'/'+city.longitude}>
                        {city.title}
                      </a>
                    </div>
                  );
                })
              )
            : setCities(
                <div className="w-100 py-3 px-2">
                  <a href="#!">No results found!</a>
                </div>
              );
        });
    } else {
      document.querySelector("#autocomplete-dropdown").classList.add("d-none");
    }
  }, [query]);
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center bg-primary"
      style={{ minHeight: 100 + "vh" }}
    >
      <Row>
        <Col lg="12">
          <h3>Which city do you want to browse?</h3>
          <input
            type="search"
            className="form-control py-4 mt-4"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Start typing a city name..."
            autoComplete="autocomplete_off_hack_xfr4!k"
          />
          {/* Autocomplete container */}
          <div
            className="bg-light px-2 rounded autocomplete-dropdown d-none position-absolute"
            style={{ width: 93.5 + "%" }}
            id="autocomplete-dropdown"
          >
            {cities}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
