import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface RedirectingProps {
    path: string
}
const Redirecting: React.FC<RedirectingProps> = ({path}) => {
    const router = useRouter()

    useEffect(() => {
        router.push(path)
    }, [])

    return <>
        <h1>Redirecting...</h1><br/>
        <Link href={path} >Click here to manual redirect</Link>
    </>
}
export default Redirecting