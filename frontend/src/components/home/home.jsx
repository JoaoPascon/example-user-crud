import React, { Component }from 'react'
import Main from '../templates/main'
import Btn from '../templates/btn'
import { Switch, Route, Redirect } from 'react-router'
import axios from 'axios'
import toastr from 'reactjs-toastr'
import UserCrud from '../user/userCrud'
import 'reactjs-toastr/lib/toast.css'

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
const initialState = {
    user: { name: '', email: '', lastName: '', tel: '', cel: '', desc: '', adress: {}},
    list: [],
    filterList: [],
    andress: {
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        number: ''
    },
    isOpen: false
}

export default class Home extends Component {

    state = {...initialState}

    toggleModal() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }    

      load(user) {
       // this.props.history.push('/users' + user.id)
      }

    remove(){
        if(this.state.isOpen){
        return (
        <h1>
        Here's some content for the modal
        </h1> )
        }
    }

    filterList(letter) {
        currentLetter = letter;
        const list = this.state.list;
        const filterList = list.filter( user => {
           return user.name.substr(0, 1).toUpperCase() === letter
        })
        this.setState({ filterList: filterList })
      
    }

    componentWillMount() {
        axios(baseUrl).then( resp => {
            this.setState({ list: resp.data})
            this.setState({ filterList: resp.data})
            this.filterList('A');
        })
    }

    renderButtonsLetters() {
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

    renderTable() {
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
                        <Btn style="btn btn-danger ml-2" function={() => this.toggleModal(user)}
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
                {this.remove()}
            </div>
        </Main>
    )
   }
}
