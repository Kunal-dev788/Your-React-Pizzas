import { getOrder } from "../../Services/apiRestaurant";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = params.orderId;
  if (!orderId) throw new Error('Order ID is required');
  const order = await getOrder(orderId);
  return order;
}
