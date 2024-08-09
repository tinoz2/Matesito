
const UserNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-3xl font-semibold flex items-center">Usuario no encontrado</p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-4 text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
        </div>
    )
}

export default UserNotFound