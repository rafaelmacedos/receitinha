'use client'

import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'

import { Header } from '@/components/header'
import { NoProducts } from '@/components/no-products'
import { ProductsList } from '@/components/products-list'
import { RegisterProductAlert } from '@/components/register-product-alert'

import { api } from '@/lib/api'

import { Product } from '@/models/product.model'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="flex h-screen w-full flex-col">
      <Header showSearchBar={true} />

      <main className="flex w-full flex-col gap-3 px-4 pt-20">
        <RegisterProductAlert />

        <div className="grid place-items-center">
          <Triangle
            height="48"
            width="48"
            color="#3B82F6"
            ariaLabel="triangle-loading"
            visible={isLoading}
          />
        </div>

        {!isLoading && (
          <div>
            {products.length ? (
              <ProductsList products={products} />
            ) : (
              <NoProducts />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
