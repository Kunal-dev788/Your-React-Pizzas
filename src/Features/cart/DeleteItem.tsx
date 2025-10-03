import { useAppDispatch } from "../../hooks/hooks";
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";

type DeleteItemProps = {
    pizzaId : number
}

function DeleteItem({ pizzaId }:DeleteItemProps) {
  const dispatch = useAppDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;