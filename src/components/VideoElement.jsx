export default function VideoElement({ source, classes }) {
    return (
        <div>
            <video autoPlay muted loop className={'w-full border-4 border-cyan-400 rounded-lg object-cover cursor-pointer ' + classes} controls width="250">
                <source src={source} />
            </video>
        </div>
    )
}
