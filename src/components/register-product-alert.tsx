'use client'

import Link from 'next/link'
import { RocketLaunch } from '@phosphor-icons/react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function RegisterProductAlert() {
  return (
    <Alert className="flex w-full items-center gap-4">
      <div>
        <RocketLaunch size={32} />
      </div>

      <div>
        <AlertTitle className="text-xl font-bold">
          Quer vender seu produto na nossa budega?
        </AlertTitle>
        <AlertDescription>
          <p>
            <Link
              href="/register-product"
              className="underline underline-offset-4 hover:text-primary"
            >
              Clique aqui
            </Link>{' '}
            e anuncie seu produto para todos os estudantes, professores e
            colaboradores da Unifacisa!
          </p>
        </AlertDescription>
      </div>
    </Alert>
  )
}
