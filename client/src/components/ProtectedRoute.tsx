import { FC } from "react"
import { useAuth } from "../hooks/useAuth"

interface Props{
    children: JSX.Element
}

export const ProtectedRoute:FC<Props> = ({children}) =>{
    const isAuth = useAuth()
    return <>
        {isAuth ? children : <div className="mt-20 flex flex-col items-center justify-center gap-10" >
                <h1 className="text-lg">You need to be logged in system</h1>
            </div>}
    </>
}