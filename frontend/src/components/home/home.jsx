import React, { Component }from 'react'
import Main from '../templates/main'
import Btn from '../templates/btn'
import { Switch, Route, Redirect } from 'react-router'
import axios from 'axios'
import toastr from 'reactjs-toastr'
import UserCrud from '../user/userCrud'
import 'reactjs-toastr/lib/toast.css'
import GetAdress from '../andressUtil.js'
import Input from '../input'

const getCep = GetAdress;

const styleButtons = {
    default: "btn btn-default",
    info: "btn btn-success"
}
let currentLetter = '';
const headerProps = {
    icon: 'address-book',
    title: 'Agenda de usuários',
    subtitle: 'Pesquise os seus usuários utilizando os botões de filtro logo abaixo !'
}


const buttosLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z']
const baseUrl = 'http://localhost:3001/users'
const baseUrlLog = 'http://localhost:3001/logs'
const initialState = {
    user: { name: '', email: '', lastName: '', tel: '', cel: '', desc: '', adress: {}},
    list: [],
    filterList: [],
    adress: {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        number: ''
    },
    isEdit: false
}

export default class Home extends Component {

    state = {...initialState}

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
    }}

    clear() {
        this.setState({user: initialState.user, isEdit: false})
    }

    load(user) {
       this.setState({ isEdit: true})
       this.setState({ user: user, adress: user.adress})
    }

    delete(user){
        const use2 = user;
        axios.delete(`${baseUrl}/${user.id}`).then( resp => {
            this.componentWillMount(user.name.substr(0, 1));
            this.saveLog('delete', user);
            this.clear();
        })
    }

    save() {
        const user = this.state.user
        user.adress = this.state.adress;
        const method = user.id ? 'put' : 'post' // se o is estiver valido eu dou update se não eu salvo
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                this.saveLog(method, user);
                this.setState({ isEdit: false})
                this.componentWillMount(user.name.substr(0, 1));
            })
     }

    saveLog(action, user) {
        const log = {
            action: action,
            userName: user.name + ' ' + user.lastName
        }
        axios.post(baseUrlLog, log);
    }

    filterList(letter) {
        currentLetter = letter;
        const list = this.state.list;
        const filterList = list.filter( user => {
           return user.name.substr(0, 1).toUpperCase() === letter
        })
        this.setState({ filterList: filterList })
    }

    componentWillMount(letter) {
        const letterSelected = (letter && letter.toUpperCase()) || 'A';
        axios(baseUrl).then( resp => {
            this.setState({ list: resp.data})
            this.setState({ filterList: resp.data})
            this.filterList(letterSelected);
        })
    }

    renderButtonsLetters() {
        if(!this.state.isEdit){
        return  buttosLetter.map( letter => { 
        return (
            <button title={"Filtrar por " + letter} key={letter} 
            onClick={() => this.filterList(letter)} 
            className={ currentLetter === letter ? styleButtons.info : styleButtons.default }>
                {letter}
            </button>
                )
            })
        }
    }

    renderForm() {
        if(this.state.isEdit){
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
                {this.renderadress()}  
                <hr/>
                {this.renderButtons()}
            </div>
        )
    }
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value;
        this.setState({user: user})
    }

    renderButtons() {
        return (
        <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-warning ml-2"
                            onClick={e => this.clear()}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.delete(e)}>
                            Excluir
                        </button>
                    </div>
        </div>
                )
    }

    renderadress() {
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
                                onChange={ e => this.updateField(e)}
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

    renderTable() {
        if(!this.state.isEdit){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tel / Cel</th>
                        <th>Cidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    }

    renderRows() {
        return this.state.filterList.map(user =>{
            return(
                <tr key={user.id}>
                    <td>{user.name} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.tel} / {user.cel}</td>
                    <td>{user.adress.localidade}</td>
                    <td>
                        <Btn style="btn btn-info ml-2" function={() => this.load(user)}
                        icon="fa fa-pencil"/>
                        <Btn style="btn btn-danger ml-2" function={() => this.delete(user)}
                        icon="fa fa-trash"/>
                    </td>
                </tr>
            )
        })
    }
    
    render() { 
       return (
        <Main {...headerProps}>
            <div className="text-center">
                {this.renderButtonsLetters()}
                {this.renderTable()}
                {this.renderForm()}
            </div>
        </Main>
    )
   }
}
