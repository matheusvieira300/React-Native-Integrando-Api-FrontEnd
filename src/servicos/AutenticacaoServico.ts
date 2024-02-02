import api from "./api"

export async function fazerLogin(email: string, senha: string){ //explicitando que o email e senha são uma string
    if(!email || !senha) return null
    try {
        const resultado = await api.post('/auth/login',{
            email,
            senha
        }) //rota e passando os parâmetros pra rota
        console.log(resultado.data)
        return resultado.data
    } catch (error) {
        console.log("erro",error)
        return null
    }
}