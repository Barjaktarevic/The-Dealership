import loader from '../assets/loader.svg'

export default function Loader() {
    return (
        <div className='flex flex-col space-y-6 items-center'>
            <img src={loader} className='h-48 w-48 bg-slate-900' />
        </div>
    )
}
