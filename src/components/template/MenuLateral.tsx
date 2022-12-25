import MenuItem from "./MenuItem";
import * as icons from '../icons';
import Logo from "./Logo";
import useAuth from "../../data/hook/useAuth";


export default function MenuLateral(){
    const {logout} = useAuth()
    return (
        <aside className="flex flex-col dark:bg-gray-900">
            <div className={`
                flex flex-col justify-center items-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={icons.IconeCasa}/>
                <MenuItem url="/ajustes" texto="Ajustes" icone={icons.IconeAjuste}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={icons.IconeSino}/>
            </ul>
            <ul>
                <MenuItem
                    onClick={logout}
                    texto="Sair"
                    icone={icons.IconeLogout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}/>
            </ul>
        </aside>
    )
}