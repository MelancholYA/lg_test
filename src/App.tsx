import Cart from "./componants/Cart";
import Products from "./componants/Products";

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", padding: 15 }}
    >
      <Products />
      <Cart />
    </div>
  );
}

export default App;
