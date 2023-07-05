import { NextRouter, useRouter } from "next/router"
import { Fragment, ReactEventHandler, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"

const takeOne: (value: string | string[] | undefined) => string | undefined = (input) => {
    if (Array.isArray(input)) {
        return input[0]
    } else {
        return input
    }
}

interface LoginPageProps {
    loggedIn: boolean
}
const LoginPage: React.FC<LoginPageProps> = ({loggedIn}) => {
    const router: NextRouter = useRouter()
    const auth = useAuth();

    useEffect(() => {
        if (!!auth.user) {
            router.push(takeOne(router.query.q) || '/')
        }
    }, [auth])

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null) 


    function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const user = usernameRef.current?.value;
        const pass = passwordRef.current?.value;
        user && pass && auth.login(user, pass)
    }

    return (
        <Fragment >
            <form className='w-60 justify-center' onSubmit={login}>
                <h3>Login</h3>
                <input name="username" placeholder="username" ref={usernameRef} />
                <input name="password" placeholder="password" type="password" ref={passwordRef} />
                <input type="submit" />
            </form>
        </Fragment>
    )
}

export default LoginPage;