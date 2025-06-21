import Navbar from "@/components/navbar";


export default function TestLayout({ children }) {
  return (
    <div className='lg:max-w-4xl mx-auto px-5 mt-5'>
        <Navbar/>
        <span></span>
        {children}
    </div>
  )
}
