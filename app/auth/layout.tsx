import React from 'react'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className ="flex min-h-screen">
        <section className="hidden w-1/2 items-center justify-center lg:flex xl:w-2/5 bg-blue-500 p-10">
            <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-10">
                <Image src="/logo.png" alt="Logo" width={76} height={16} className ="h-auto" />

                <div className ="space-y-5 text-white">
                    <h1 className ="text-2xl font-bold">My App </h1>
                    <p className ="text-lg">Welcome to my app! Please sign in or sign up to continue.</p>
                </div>
                <Image src="/illustration.png" alt="Illustration" width={400} height={400} className ="transition-transform duration-300 hover:scale-102" />
            </div>
        </section>

        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-10">
            <div className ="mb-16 lg:hidden">
                <Image src="/logo.png" alt="Logo" width={76} height={16} className ="h-auto w-[200px] lg:w-[250px]" />
            </div>
            
            {children}
        </section>
    </div>
  )
}

export default Layout
