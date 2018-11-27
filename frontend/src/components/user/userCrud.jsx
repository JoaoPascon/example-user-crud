import React, {Component} from 'react'
import axios from 'axios'
import Main from '../templates/main'

import Btn from '../templates/btn'
import GetAdress from '../andressUtil.js'
import Input from '../input'

const getCep = GetAdress;
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
    adress: {
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


    clear() {
        this.setState({user: initialState.user})
    }

    save() {
        const user = this.state.user
        user.adress = this.state.adress;
        const method = user.id ? 'put' : 'post' // se o is estiver valido eu dou update se não eu salvo
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        this.saveLog(method, user);
        axios[method](url, user)
            .then(resp => {
                this.setState({ user: initialState.user, adress: initialState.adress })
            })
    }

    saveLog(action, user) {
        const log = {
            action: action,
            userName: user.name + ' ' + user.lastName
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

    getAdress(event){
        const adress = { ...this.state.adress }
        adress[event.target.name] = event.target.value;
        this.setState({adress: adress})
        
        if(adress.cep.length === 8) {
        getCep(event.target.value).then(value => {
            if(value) {
                this.setState({adress: value})
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
                {this.renderAdress()}  
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

    renderAdress() {
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
                                name="cep" value={this.state.adress.cep}
                                onChange={ e => this.getAdress(e)}
                                placeholder="Digite o cep..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input type="text" className="form-control"
                                name="logradouro" value={this.state.adress.logradouro}
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite a rua..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control"
                                name="bairro" value={this.state.adress.bairro}
                                onChange={ e =>this.updateField(e)}
                                placeholder="Digite o Bairro..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control"
                                name="localidade" value={this.state.adress.localidade}
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control"
                                name="uf" value={this.state.adress.uf}
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite o estado..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Número</label>
                            <input type="number" className="form-control"
                                name="number" value={this.state.adress.number}
                                onChange={ e => this.updateField(e)}
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
