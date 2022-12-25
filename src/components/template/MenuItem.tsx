import Link from "next/link"
import { ReactElement } from "react"

interface MenuItemProps {
    url?: string
    texto: string
    icone: string | ReactElement
    // retorna um evento
    onClick?: (evento: any) => void
    className?: string
}

export default function MenuItem(props: MenuItemProps){

    function renderizarLink(){
        return (
            <span className={`
            flex
            flex-col
            justify-center
            items-center
            w-20
            h-20
            text-gray-600
            dark:text-gray-200
            ${props.className}
        `}>
            {props.icone}
            <span className={`text-xs font-light`}>
                {props.texto}
            </span>
        </span>
        )
    }
    return (
        <li onClick={props.onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-pointer
            ${props.className}
            `}>
        {props.url ? (
                <Link href={props.url}>
                    {renderizarLink()}
                </Link>) : (
            renderizarLink()
            )}
        </li>
    )
}