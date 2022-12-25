import route from 'next/router'
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
    children?: any
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User | null): Promise<Usuario | null> {
    if(!usuarioFirebase){
        return null
    }
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean){
    if(logado){
        Cookies.set('admin-template-estudo', "true", {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-estudo')
    }
}

export function AuthProvider(props: AuthContextProps) {
    const [usuario, setUsuario] = useState<Usuario>()
    const [carregando, setCarregando] = useState(true)

    async function configurarSessao(usuarioFirebase: firebase.User | any){
        if(usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            usuario ? setUsuario(usuario) : ''
            gerenciarCookie(true)
            setCarregando(false)
            return usuario?.email
        } else {
            setUsuario(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            if(resp.user){
                configurarSessao(resp.user)
                route.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function logout(){
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally{
            setCarregando(false)
            route.push('/autenticacao')
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-estudo')) {
            const cancelar =firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            // contexto que sera compartilhado para todos componentes
            usuario,
            carregando,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext