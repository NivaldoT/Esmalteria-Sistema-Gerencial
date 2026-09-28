'use client'
import ApiClient from "@/utils/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function FormUsuario({usuarioParam}) {

    const [alteracao, setAlteracao] = useState(false);
    const router = useRouter();

    const nome = useRef("");
    const email = useRef("");
    const senha = useRef("");
    const confirmarSenha = useRef("");
    const ativo = useRef(null);

    function validar(){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if( !nome.current.value || nome.current.length < 3 )
        {
            toast.error("O nome deve ter pelo menos 3 caracteres");
            return false;
        } else if( !regex.test(email.current.value))
        {
            toast.error("O email não é válido");
            return false;
        } else if( !senha.current.value || senha.current.length < 6 )
        {
            toast.error("A senha deve ter pelo menos 6 caracteres");
            return false;
        } else if( senha.current.value != confirmarSenha.current.value)
        {
            toast.error("As senhas não coincidem");
            return false;
        } return true;
    }
    async function gravar() {
        //valida os campos
        if(validar()){
            //cria o form data para enviar ao backend
            let obj = {
                nome: nome.current.value,
                email: email.current.value,
                senha: senha.current.value
            };
            //fazer o fetch
            let resposta = await ApiClient.post("usuario", obj);
            if(resposta) {
                toast.success("Usuário cadastrado com sucesso!")
                //navega para a listagem
                router.replace('/login')
            }
        }
    }

    async function alterar() {
        //valida os campos
        if(validar()) {
            console.log(usuarioParam)
            let usuarioNovo = {
                id: usuarioParam.id,
                nome: nome.current.value,
                email: email.current.value,
                senha: senha.current.value,
                ativo: ativo.current.checked ? "S" : "N"
            };

            //fazer o fetch
            let resposta = await ApiClient.put("usuario", usuarioNovo);

            if(resposta) {
                toast.success("Usuário alterado com sucesso!")
            }
        }
    }

    useEffect(() => {
        //se diferente de null, estamos em alteração
        if(usuarioParam) {
            // troca o estado e preenche os ref's
            nome.current.value = usuarioParam.nome;
            email.current.value = usuarioParam.email;
            senha.current.value = usuarioParam.senha;
            confirmarSenha.current.value = usuarioParam.senha;
            ativo.current.checked = usuarioParam.ativo == "S";
            setAlteracao(true);
        }
    }, [])

    return (
        <div>
            {alteracao ? <h1>Editar Meus Dados</h1> : <h1>Realizar Cadastro</h1>}
            <div className="form-group">
                <label>Nome:</label>
                <input ref={nome} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>E-mail:</label>
                <input ref={email} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Senha:</label>
                <input ref={senha} type="password" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Confirmar Senha:</label>
                <input ref={confirmarSenha} type="password" className="form-control"></input>
            </div> 
            <div className="form-group form-check" style={{display: alteracao ? "block" : "none"}}>
                <input ref={ativo} type="checkbox" className="form-check-input"></input>
                <label>Ativo:</label>
            </div>
            <div>
                <button onClick={alteracao ? alterar : gravar} className="btn btn-primary"><i className="fas fa-check"></i> Confirmar</button>
            </div> 
        </div>
    )
}