import UtilsStore from "../stores/UtilsStore"

export default function Container({ children }) {

    const handleClick = () => {
        if (UtilsStore.sidebarOpen) {
            UtilsStore.sidebarOpen = !UtilsStore.sidebarOpen
        } else {
            return
        }
    }

    return (
        <div className='min-h-screen bg-slate-900 text-white' onClick={handleClick}>
            {children}
        </div>
    )
}
