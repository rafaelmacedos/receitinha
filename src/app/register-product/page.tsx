'use client'

import { Header } from '@/components/header'
import { RegisterProductForm } from '@/components/register-product-form'

export default function RegisterProduct() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header showSearchBar={false} />

      <main className="flex w-full flex-col px-4 pb-4 pt-20">
        <div>
          <h3 className="text-xl font-bold">Cadastro de produto</h3>
          <p className="text-sm text-muted-foreground">
            Aqui você deve inserir todas as informações do seu produto e
            anunciá-lo, para assim, começar a vender na plataforma.
          </p>

          <hr className="my-4" />

          <RegisterProductForm />
        </div>
      </main>
    </div>
  )
}
