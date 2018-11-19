import React, {Component} from 'react'
import axios from 'axios'
import Main from '../templates/main'

import Btn from '../templates/btn'
import GetAndress from '../andressUtil.js'
import Input from '../input'

const getCep = GetAndress;
const headerProps = {
    icon: 'users',
    title: 'Cadastro de usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}


const baseUrl = 'http://localhost:3001/users'
const baseUrlLog = 'http://localhost:3001/logs'
const initialState = {
    user: { name: '', email: '', lastName: '', tel: '', cel: '', desc: '', adress: {}},
    list: [],
    andress: {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        number: ''
    }
}

export default class UserCrud extends Component {

    state = {...initialState }

    componentWillMount() {
      
    }

    clear() {
        this.setState({user: initialState.user})
    }

    save() {
        const user = this.state.user
        user.adress = this.state.andress;
        const method = user.id ? 'put' : 'post' // se o is estiver valido eu dou update se não eu salvo
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        this.saveLog(method, user);
        axios[method](url, user)
            .then(resp => {
                this.setState({ user: initialState.user })
            })
    }

    saveLog(action, user) {
        const log = {
            action: action,
            userName: user.name
        }
        axios.post(baseUrlLog, log);
    }

    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then( resp => {
            const list = this.state.list.filter(u => u.id !== user.id)
            this.setState({ user: initialState.user })
            this.setState({list})
        })
    }

    getAndress(event){
        const andress = { ...this.state.andress }
        andress[event.target.name] = event.target.value;
        this.setState({andress: andress})
        
        if(andress.cep.length === 8) {
        getCep(event.target.value).then(value => {
            if(value) {
                this.setState({andress: value})
            }
        })
    }
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value;
        this.setState({user: user})
    }

    renderWarning(){
        return(<div className="text-danger">
            <span> Cadastro vazio </span>
        </div>)
    }

    renderForm() {

        return (
            <div className="form">
            <span> 
                <h3 className=""><u>DADOS USUÁRIO</u></h3>
            </span>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Nome" type="text" 
                                value={this.state.user.name} name="name"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite seu nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Sobrenome" type="text" 
                                value={this.state.user.lastName} name="lastName"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite seu sobrenome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Email" type="email" 
                                value={this.state.user.email} name="email"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite seu email..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Telefone" type="text" 
                                value={this.state.user.tel} name="tel"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite seu telefone..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Celular" type="text" 
                                value={this.state.user.cel} name="cel"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite seu celular..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <Input label="Descrição" type="text" 
                                value={this.state.user.desc} name="desc"
                                functionChange={e => this.updateField(e)} 
                                placeholder="Digite sua descrição..." />
                        </div>
                    </div>  
                </div>
                <hr/>
                {this.renderAndress()}  
                <hr/>
                {this.renderButtons()}
            </div>
        )
    }

    renderButtons() {
        return (
        <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.clear()}>
                            Cancelar
                        </button>
                    </div>
        </div>
                )
    }

    renderAndress() {
        return (
            <div className="form">
                <span> 
                    <h3 className=""><u>ENDEREÇO</u></h3>
                </span>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control"
                                name="cep" value={this.state.andress.cep}
                                onChange={ e => this.getAndress(e)}
                                placeholder="Digite o cep..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input type="text" className="form-control"
                                name="logradouro" value={this.state.andress.logradouro}
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite a rua..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control"
                                name="bairro" value={this.state.andress.bairro}
                                onChange={ e => this.getAndress(e)}
                                placeholder="Digite o Bairro..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control"
                                name="localidade" value={this.state.andress.localidade}
                                onChange={ e => this.getAndress(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control"
                                name="uf" value={this.state.andress.uf}
                                onChange={ e => this.getAndress(e)}
                                placeholder="Digite o estado..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Número</label>
                            <input type="number" className="form-control"
                                name="number" value={this.state.andress.number}
                                onChange={ e => this.getAndress(e)}
                                placeholder="Digite o numero..." />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}
