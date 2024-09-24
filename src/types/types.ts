export type GuitarT = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItemT = GuitarT & {
    quantity: number
}

//export type GuitarID = Pick<GuitarT, 'id'> Take one or more props
//export type GuitarID = GuitarT['id'] // Take only one prop