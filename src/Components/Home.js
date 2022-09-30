import Hero from "./Hero";
import Discount from "./Discount";
import Season from "./Season";
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Discount />
      <Season />
    </div>
  );
}
