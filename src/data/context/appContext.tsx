import { createContext, useEffect, useState } from "react";

// type Tema = 'dark' | ''

interface AppContextProps {
    tema: string
    alternarTema: () => void
    children?: any
}

const AppContext = createContext<AppContextProps>({
    tema: '',
    alternarTema: function (): void {
        throw new Error("Function not implemented.");
    }
});

export function AppProvider(props: AppContextProps){

    const [tema, setTema] = useState('dark')

    function alternarTema(){
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema') ?? ''
        setTema(temaSalvo)
    }, [])

    return (
        <AppContext.Provider value={{tema, alternarTema}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext