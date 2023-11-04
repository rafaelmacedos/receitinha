'use client'

import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from './ui/use-toast'

import { api } from '@/lib/api'

export function RegisterProductForm() {
  const productSchema = z.object({
    name: z
      .string()
      .min(3, 'O nome do produto deve conter no mínimo 3 caracteres'),
    description: z
      .string()
      .min(6, 'A descrição do produto deve conter no mínimo 6 caracteres')
      .optional()
      .or(z.literal('')),
    advertiserPhoneNumber: z
      .string()
      .min(1, 'Número de telefone obrigatório')
      .regex(
        /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/gm,
        'Número de telefone inválido',
      ),
    price: z.coerce.number().min(0.01, 'O preço é obrigatório'),
    imgUrl: z
      .string()
      .url('Insira uma URL válida')
      .optional()
      .or(z.literal('')),
  })
  type ProductType = z.infer<typeof productSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  })

  const { toast } = useToast()

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    await api
      .post('/products', data)
      .then(() => {
        reset()
        toast({
          title: 'Tudo certo!',
          description: 'Seu produto foi salvo e anunciado com sucesso!',
        })
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description:
            'Não foi possível anunciar seu produto agora, tente novamente mais tarde.',
        })
      })
  }

  return (
    <form
      className="flex w-full max-w-screen-md flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="name">
          Nome <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Galaxy A51, Macbook Pro, Bolo de chocolate, Canela de véi, etc..."
          type="text"
          {...register('name')}
        />

        {errors.name && (
          <span className="mb-1 text-xs text-red-500">
            {errors.name?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="phoneNumber">
          Telefone para contato <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phoneNumber"
          placeholder="(00) 99999-9999"
          type="text"
          {...register('advertiserPhoneNumber')}
        />
        {errors.advertiserPhoneNumber && (
          <span className="mb-1 text-xs text-red-500">
            {errors.advertiserPhoneNumber?.message}
          </span>
        )}

        <p className="text-sm text-muted-foreground">
          Coloque seu telefone para contato (DDD + Número, no formato &quot;00
          99999-9999&quot;), o comprador irá entrar em contato diretamente com
          você. Venda seu peixe! 🐠
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="Celular ótimo, pouco tempo de uso, conta com 4GB de RAM e 128GB de armazenamento..."
          id="description"
          {...register('description')}
        />
        {errors.description && (
          <span className="mb-1 text-xs text-red-500">
            {errors.description?.message}
          </span>
        )}
        <p className="text-sm text-muted-foreground">
          Uma boa descrição é a chave do sucesso! Seja criativo e bem explícito
          sobre as características do seu produto. (Lembrando que este campo não
          é obrigatório).
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="price">
          Preço <span className="text-red-500">*</span>
        </Label>
        <Input
          id="price"
          placeholder="R$ 0,00"
          type="number"
          step=".01"
          {...register('price')}
        />

        {errors.price && (
          <span className="mb-1 text-xs text-red-500">
            {errors.price?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="imgUrl">URL da foto do produto</Label>
        <Input
          id="imgUrl"
          placeholder="https://..."
          type="text"
          {...register('imgUrl')}
        />

        {errors.imgUrl && (
          <span className="mb-1 text-xs text-red-500">
            {errors.imgUrl?.message}
          </span>
        )}
        <p className="text-sm text-muted-foreground">
          Olha o click! Adicione uma URL *pública* da foto do seu produto.
          Produtos com foto tendem a vender 47% mais!
        </p>
      </div>

      <Button className="w-fit">Salvar e anunciar</Button>
    </form>
  )
}
