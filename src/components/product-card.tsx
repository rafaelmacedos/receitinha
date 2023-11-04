import Image from 'next/image'
import { WhatsappLogo } from '@phosphor-icons/react'

import { Button } from './ui/button'

import { Product } from '@/models/product.model'
import { ToCurrencyBRL } from '@/utils/currency'
import { ExcerptDescription } from '@/utils/excerpt-description'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-full rounded-lg border bg-background p-4">
      <div className="flex h-80 items-center justify-center rounded-lg">
        <Image
          src={
            product.imgUrl ||
            'https://sanfelipo.com.br/wp-content/uploads/2022/08/20190726_200126_1____01-PRODUTO-SEM-IMAGEM-1000X1000.jpg'
          }
          alt={product.name}
          className="h-72 rounded-lg"
          width={1280}
          height={1280}
        />
      </div>

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {product.name}
        </h5>
        <div className="mb-4 mt-2.5 h-24 w-full overflow-clip overflow-ellipsis">
          <p className="text-ellipsis break-words text-sm text-muted-foreground">
            {ExcerptDescription(product.description, 150) ||
              'O anunciante não deixou uma descrição sobre o produto 😕'}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-black">
            R$ {ToCurrencyBRL(product.price)}
          </span>
        </div>
        <a
          className="w-full"
          href={`https://api.whatsapp.com/send?phone=+55${product.advertiserPhoneNumber}&text=Ol%C3%A1!%20Vi%20seu%20produto:%20${product.name}%20na%20Budega%20da%20Unifacisa.%20`}
          target="_blank"
        >
          <Button variant="outline" className="flex w-full items-center gap-2">
            <WhatsappLogo size={24} /> Chamar vendedor
          </Button>
        </a>
      </div>
    </div>
  )
}
