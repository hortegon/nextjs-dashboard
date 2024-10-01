import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Dish {
  id: number
  name: string
  description: string
  fullPrice: number
  halfPrice: number
}

interface CartItem {
  dishId: number
  name: string
  portion: 'full' | 'half'
  price: number
}

const dishes: Dish[] = [
  { id: 1, name: "Pasta Carbonara", description: "Pasta con salsa cremosa y panceta", fullPrice: 12, halfPrice: 7 },
  { id: 2, name: "Ensalada César", description: "Lechuga, crutones, parmesano y aderezo César", fullPrice: 10, halfPrice: 6 },
  { id: 3, name: "Pollo a la Parrilla", description: "Pechuga de pollo a la parrilla con verduras", fullPrice: 15, halfPrice: 9 },
  { id: 4, name: "Sopa de Tomate", description: "Sopa cremosa de tomate con albahaca", fullPrice: 8, halfPrice: 5 },
  { id: 5, name: "Risotto de Champiñones", description: "Arroz cremoso con champiñones y parmesano", fullPrice: 14, halfPrice: 8 },
]

export default function RestaurantApp() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (dish: Dish, portion: 'full' | 'half') => {
    const price = portion === 'full' ? dish.fullPrice : dish.halfPrice
    setCart([...cart, { dishId: dish.id, name: dish.name, portion, price }])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
      <div className="md:w-2/3 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Menú del Restaurante</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {dishes.map((dish) => (
            <Card key={dish.id}>
              <CardHeader>
                <CardTitle>{dish.name}</CardTitle>
                <CardDescription>{dish.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Porción completa: ${dish.fullPrice}</p>
                <p>Media porción: ${dish.halfPrice}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={() => addToCart(dish, 'full')}>Agregar porción completa</Button>
                <Button onClick={() => addToCart(dish, 'half')}>Agregar media porción</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="md:w-1/3 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Carrito de Compras</h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-2 rounded">
                  <span>
                    {item.name} - {item.portion === 'full' ? 'Porción completa' : 'Media porción'} - ${item.price}
                  </span>
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(index)}>Eliminar</Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
        <div className="mt-4">
          <p className="font-bold text-lg">Total: ${getTotalPrice()}</p>
          <Button className="w-full mt-2" disabled={cart.length === 0}>Proceder al pago</Button>
        </div>
      </div>
    </div>
  )
}