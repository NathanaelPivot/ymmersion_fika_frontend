import { Ingredient } from "./ingredient.model";

export interface Product {
  id: number,
  uidUser: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  isPlatDuJour: boolean,
  promotion: number | null,
  createdAt: string,
  updatedAt: string,
  type: number,
  category: number,
  available: boolean,
  quantity: number,
  ingredients: Ingredient[],
}
