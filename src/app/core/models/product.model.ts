import { Ingredient } from "./ingredient.model";

export interface Product {
  id: number,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  isPlatDuJour: boolean,
  promotion: number,
  createdAt: string,
  updatedAt: string,
  type: number,
  category: number,
  available: boolean,
  quantity: number,
  ingredients: Ingredient[],
}
