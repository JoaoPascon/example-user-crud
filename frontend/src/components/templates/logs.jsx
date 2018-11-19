import React, {Component} from 'react'
import axios from 'axios'

import Main from './main'

const buttonsStyle = {
    post: 'btn btn-success btn-sm',
    put: 'btn btn-warning btn-sm',
    delete: 'btn btn-danger btn-sm'
}
const baseUrlLog = 'http://localhost:3001/logs'
const headerProps = {
    icon: 'arrows',
    title: 'Logs',
    subtitle: 'Logs das ultimas ações realizadas pelo usuário'
}

export default class Logs extends Component {

    state = {
        logs: []
    }

    componentWillMount(){
        this.getLogs();
    }

    getLogs(){
        axios(baseUrlLog).then( resp => {
            this.setState({ logs: resp.data})
        })
    }

    renderTable() {
        return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>Usuário</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
            {this.renderRows()}
            </tbody>
        </table>
        )
    }

    renderRows(){
    return (
    this.state.logs.map( log => {
        return (
            <tr>
            <td>
                <button className={buttonsStyle[`${log.action}`]} disabled>{log.action.toUpperCase()}</button>
            </td>
            <td>{log.userName}</td>
            <td>{log.id}</td>
            </tr>
        )
    })
 )
    }

    render(){
        return(
        <Main {...headerProps}>
           { this.renderTable() }
        </Main>)
    }
}