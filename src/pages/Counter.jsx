import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter Practice</h1>
      <h3>{count}</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>plus 1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((prev) => prev - 1)}>subtract 1</button>
    </div>
  );
}

export default Counter;
