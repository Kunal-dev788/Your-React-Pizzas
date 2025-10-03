import { getMenu } from "../../Services/apiRestaurant"

export async function loader(){
  const menu = await getMenu()
  return menu
}