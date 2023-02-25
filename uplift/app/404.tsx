import Navbar from "@/components/Navbar";
export default function Custom404 () {
    return(
        <>
        <Navbar />
        <div className= 'flex flex-col'>
            <div className='flex items-center h-24 justify-center'>
                <h1 className='text-white text-2xl text-center'> 404 | Nope, couldn't find that one :( </h1>
            </div>
            <img className='grow' src='josh.jpeg'></img>
        </div>
        </>
    );
}