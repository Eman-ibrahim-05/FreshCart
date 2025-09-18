export interface Response<T> {
  results: number
  metadata: Metadata
  data: T[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Orders {
  shippingAddress?: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: ProductCart[]
  createdAt: string
  updatedAt: string
  id: number
  paidAt?: string
}

export interface Product {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface cartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  userId: string
  products: ProductCart[]
  
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: Product
  price: number
}
export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}