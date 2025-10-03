import { redirect, type ActionFunctionArgs } from "react-router-dom";
import {
  createOrder,
  type CartItem,
  type NewOrder,
} from "../../Services/apiRestaurant";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

interface FormData {
  [key: string]: string;
  customer: string;
  phone: string;
  address: string;
  cart: string;
  priority: string;
}

interface FormErrors {
  phone?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  // https://uibakery.io/regex-library/phone-number
  const isValidPhone = (str: string): boolean =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );

  const formData = await request.formData();
  const data = Object.fromEntries(formData) as FormData;
  const order: NewOrder = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    cart: JSON.parse(data.cart) as CartItem[],
    priority: data.priority === "on",
  };

  const errors: FormErrors = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
