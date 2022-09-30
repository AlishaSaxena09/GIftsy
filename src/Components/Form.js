import Login from "./Login";
import Register from "./Register";

export default function Form() {
  return (
    <div className="flex">
      <Login />
      <div className="h-96 border-2 border-gray-200 mt-8"></div>
      <Register />
    </div>
  );
}
