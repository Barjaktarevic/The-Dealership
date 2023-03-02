export default function PageHeading({ children }) {
    return (
        <h1 className='text-slate-100 text-2xl lg:text-7xl font-righteous uppercase py-4 text-center bg-gradient-to-l from-transparent via-cyan-500 to-transparent px-20 tilt-in-left-1' data-cy="page-heading">{children}</h1>
    )
}
