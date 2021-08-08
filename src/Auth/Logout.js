import React, { useContext } from "react"
import { UserContext } from "./UserContext"

const Logout = () => {
    const [, setUser] = useContext(UserContext)

    const logout = (event) => {
        event.preventDefault()
        setUser(null)
        localStorage.setItem("user", JSON.stringify(null))
        window.location.reload(false);
    }

    return (
        <>
            <a href="/" onClick={logout}>Logout</a>
        </>
    )
}

export default Logout