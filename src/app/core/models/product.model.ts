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
  idType: number,
  idCategory: number,
  available: boolean,
  ingredients: Ingredient[]
}
