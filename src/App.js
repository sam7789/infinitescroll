import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let myRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setLoading(entries[0].isIntersecting);
      console.log(entries[0].isIntersecting);
    });
    observer.observe(myRef.current);
    return () => {};
  }, []);

  useEffect(() => {
    if (loading) {
      setPage(page + 1);
      fetch(`https://paginateapi.herokuapp.com/user?limit=25&page=${page}`)
        .then((res) => res.json())
        .then((json) => setData([...data, ...json.results]));
    }
    return () => {};
  }, [loading]);

  return (
    <div className="App">
      <div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="container">
              <h3>{`${item.number}.${item.name}`}</h3>
            </div>
          ))}
      </div>
      <div
        ref={myRef}
        style={{
          height: "5vh",
        }}
      >
        {loading ? "loading..." : null}
      </div>
    </div>
  );
}

export default App;
