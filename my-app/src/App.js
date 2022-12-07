import React from "react";
import { useState, useEffect } from React;

function App() {
  function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [q, setQ] = useState("");
    const [searchParam] = useState("name");
    useEffect(() => {
      fetch("https://api.open5e.com/magicitems/")
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, []);
    function search(items){
      return items.filter((item) => {
        if (item.name === filterParam){
          return searchParam.some((newItem) => {
            return (
              item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
            );
          });
        } else if (filterParam == "All") {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
              .toLowerCase
              .indexOf(q.toLowerCase()) > -1
            );
          });
        }
      });
    }
    if (error) {
      return <>{error.message}</>;
    } else if (!isLoaded) {
      return <>loading...</>;
    } else {
      return (
        <div className="wrapper">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
          </div>
          <ul className="card-grid">
            {items.map((item) => (
              <li>
                <article className="card" key={item.callingCodes}>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        Type: {" "}
                        <span>{item.type}</span>
                      </li>
                      <li>
                        Description: {" "}
                        <span>{item.desc}</span>
                      </li>
                      <li>
                        Rarity: {" "}
                        <span>{item.rarity}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default App;
