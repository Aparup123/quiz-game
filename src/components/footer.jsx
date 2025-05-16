import React from 'react'
import { footerLinks, footerHandles, footerCompanyLinks } from '@/app/data'
export default function Footer() {
  return (
    <div className='footer w-full bg-[#E3E3E3]'>
        <div className='footer-section lg:max-w-4xl py-10 px-10 mx-auto flex flex-col gap-20'>
            <div className="links flex flex-wrap gap-4 justify-between">
                <h2 className='text-2xl font-medium'>LOGO</h2>
                <ul className='footer-links flex flex-wrap gap-5'>
                    {footerLinks.map((link)=>
                        <li key={link.title} href={link.link}>{link.title}</li>
                    )}
                </ul>
                <ul className='footer-handles flex flex-wrap gap-3'>
                    {footerHandles.map((handle)=>
                        <li className='text-xl' key={handle.title} href={handle.link}>{handle.icon}</li>
                    )}
                </ul>
            </div>

            <div className='company-section flex flex-wrap gap-10'>
                    <p className=''>© 2025 Company name</p>
                    <ul className='flex gap-5 flex-wrap'>
                        {footerCompanyLinks.map((link)=>
                            <li key={link.title} href={link.link}>{link.title}</li>
                        )}
                    </ul>
            </div>
        </div>
    </div>
  )
}
