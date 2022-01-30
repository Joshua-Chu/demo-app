import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const ErrorPage: NextPage = () => {
  return (
    <div className="h-screen bg-neutral-900 pt-[88px]">
      <Head>
        <title> Navigation North | Page not found </title>
      </Head>

      <div className="flex h-full flex-col items-center ">
        <div className="relative h-4/5 w-4/5">
          <Image src="/error.svg" layout="fill" />
        </div>
        <h3 className="text-3xl font-bold text-blue-600 underline">
          {' '}
          Page not found!!!{' '}
        </h3>
      </div>
    </div>
  )
}

export default ErrorPage
