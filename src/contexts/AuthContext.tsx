import { type } from "os";
import { createContext, useContext, useState } from "react";

type loginFn = (username: string, password: string) => Promise<void>
type logoutFn = () => Promise<void>
interface User {
    username: string,
    superuser: boolean
}

interface Authentication {
    user: User | null
    login: loginFn
    logout: logoutFn
} 

const authContext = createContext<Authentication>({
    user: null,
    login: async (username, password) => {},
    logout: async () => {}
})

export const useAuth = () => {
    return useContext(authContext)
}

interface AuthContextProps {
    children?: React.ReactNode
}
const AuthContext: React.FC<AuthContextProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const performLogin: loginFn = async (username, password) => {
        setUser((prev) => {
            return {
                username: username,
                superuser: false
            }
        })
    }

    const performLogout: logoutFn = async () => {
        setUser((prev) => {
            return null;
        })
    } 

    return <authContext.Provider value={{
        user: user,
        login: performLogin,
        logout: performLogout
    }}>
        {children}
    </authContext.Provider>
}

export default AuthContext