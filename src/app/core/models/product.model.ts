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
    available: boolean,
    category: string
}