'use client'
import { createContext, useEffect, useState } from "react";
import Loading from "../components/loading";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    async function carregarUsuario() {
        try {
            let response = await fetch("http://localhost:5500/login/usuario", {
                credentials: "include"
            });

            if (response.ok) {
                let corpo = await response.json();
                setUsuario(corpo);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarUsuario();
    }, [])

    return (
        <UserContext.Provider value={{ usuario, setUsuario }}>
            {
                loading ?
                    <html>
                        <body>
                            <Loading></Loading>
                        </body>
                    </html>
                    :
                    children
            }
        </UserContext.Provider>
    
    )
}

export default UserContext;