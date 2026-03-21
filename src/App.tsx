import Privileges from "./pages/priveleges/priveleges";
import Rating from "./pages/rating/rating";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/priveleges" element={<Privileges />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
