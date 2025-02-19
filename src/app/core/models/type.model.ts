import { Product } from "./product.model"

export interface Type {
    name: string,
    categorie: [
        {
            name: string,
            list: Product[]
        }
    ]
}