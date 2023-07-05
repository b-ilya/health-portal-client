import { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import LoginPage from "./login";
import Redirecting from "../components/redirecting";
import AuthContext from "../contexts/AuthContext";
import '@picocss/pico'
import '../../styles/global.css'

const protectedPages: string[] = [
    '/patients/'
]

function HealthPortalApp({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter()

    const loggedIn = true;
    if (!loggedIn && protectedPages.includes(router.asPath)) {
        return <Redirecting path = '/login' />
    }

    return (
        <AuthContext>
            <Component { ...pageProps } /> 
        </AuthContext>
    )
}

export default HealthPortalApp