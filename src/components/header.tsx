'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlass, SignOut } from '@phosphor-icons/react'

import { Input } from './ui/input'
import { Button } from './ui/button'

import unifacisaLogo from '../assets/img/logo-unifacisa-short.png'

interface HeaderProps {
  showSearchBar: boolean
}

export function Header({ showSearchBar }: HeaderProps) {
  const handleSearch = () => {
    alert(
      'Estamos preparando essa feature com carinho! Aguarde as próximas atualizações ❤️',
    )
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-16 w-full items-center gap-8 border-b bg-background p-4">
      <Link href="/products">
        <div className="flex w-fit items-center gap-2">
          <Image src={unifacisaLogo} alt="Unifacisa logo" width={24} />
          <h1 className="hidden text-xl font-bold text-primary sm:block">
            Receita Que Doi Menos
          </h1>
        </div>
      </Link>
      <div
        className={`flex-1 items-center gap-2 ${
          showSearchBar ? 'flex' : 'opacity-0'
        }`}
      >
        <Input
          id="search"
          placeholder="Busque por produtos na nossa budega..."
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
        />
        <Button type="submit" onClick={handleSearch}>
          <MagnifyingGlass size={18} />
        </Button>
      </div>
      <div className="flex w-fit items-center gap-3">
        <h1 className="hidden text-sm lg:block">Bem-vindo, Bruno Catão!</h1>
        <div className="hidden h-8 w-[1px] bg-white lg:flex" />
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm hover:text-primary hover:underline hover:underline-offset-4"
        >
          Sair
          <SignOut size={16} />
        </Link>
      </div>
    </div>
  )
}
