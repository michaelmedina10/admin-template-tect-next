import Image from "next/image"
import loading from '../../../public/images/loading.gif'
import useAuth from "../../data/hook/useAuth"
import Router from "next/router"
import Head from "next/head"

interface ForcarAutenticacaoProps {
    children?: any
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps){

    const {carregando, usuario} = useAuth()

    function renderizarConteudo(){
        return (
            <>
            <Head>
                <script 
                    dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-template-estudo")){
                                window.location.href = "/autenticacao"
                            }
                        `
                    }}
                />
            </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando(){
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt="Imagem de Carregamento"/>
            </div>
        )
    }

    if (!carregando && usuario?.email){
        return renderizarConteudo()
    } else if(carregando){
        return renderizarCarregando()
    } else {
        Router.router?.push('/autenticacao')
        return null
    }
}