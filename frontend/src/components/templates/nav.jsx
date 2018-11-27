import './nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import LinkTo from './linkTo'

export default props =>
        <aside className="menu-area">
            <nav className="menu">
                <LinkTo to="/" icon="fa fa-address-book" title="Agenda"/>
                <LinkTo to="/users" icon="fa fa-pencil" title="Adicionar Usuário"/>
                <LinkTo to="/logs" icon="fa fa-arrows" title="Logs"/>
                <LinkTo to="/about" icon="fa fa-home" title="Sobre"/>
            </nav>
        </aside>