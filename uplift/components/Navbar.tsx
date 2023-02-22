import Link from 'next/link'
export default function Navbar () {
    return (
        <div className='w-full h-16 bg-black border-b-white border-b'>
            <div className='inline-flex my-3 w-full mx-4'>
                <Link href='/'>
                    <p className='font-light font-sans text-4xl text-white'>
                        <span className='text-accent-100'>up</span>Lift
                    </p>
                </Link>
            </div>
            <ul className='list-none'>
                <li>
                </li>
                <li>
                </li>
                <li>
                </li>
            </ul>
        </div>
    )
}
