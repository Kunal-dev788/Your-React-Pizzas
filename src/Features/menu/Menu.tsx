import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import type { Pizza } from "../../types/pizza";

function Menu() {
  const menu = useLoaderData() as Pizza[]; // 👈 cast or use generic

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
