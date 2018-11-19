import React, {Component} from 'react'
import Main from '../templates/main'

const headerProps = {
    icon: 'home',
    title: 'Sobre Nós',
    subtitle: 'Projeto desenvolvido para o aprendizado de React!'
}

const infoUser = [
   { 
        title: 'Autor',
        desc: 'João Pascon'
    },
   { 
        title: 'Desenvolvedor',
        desc: 'Web Full Stack'
    },
    {
        title: 'GitHub',
        desc: 'https://github.com/JoaoPascon'
    },
    {
        title: 'Linkedin',
        desc: 'https://www.linkedin.com/in/joao-natan-6852a5120/'
    }
]

const infoAdress = [
    { 
         title: 'Rua',
         desc: 'Armando Lopes 664'
     },
    { 
         title: 'Bairro',
         desc: 'Parque Luzia'
     },
     {
         title: 'Cidade',
         desc: 'Americana'
     },
     {
         title: 'Estado',
         desc: 'São Paulo'
     },
     {
        title: 'Pais',
        desc: 'Brasil'
    }
 ]

export default class About extends Component {
    render() { 
        return (
         <Main {...headerProps}>
             <div className="main-subtitle">
             <h4> Dados Pessoais </h4>
               {this.renderInfo(infoUser)}
             <h4> Endereço </h4>
                {this.renderMap()}
             </div>
         </Main>
     )
    };

renderInfo(info) {
    return info.map( i => {
         return (
            <div>{i.title}: 
                <strong> {i.desc}</strong> 
            </div>
        )
    })
}

renderMap() {
    return (
        <div className="row">
        <div className="col-sm-12 col-md-6">
            {this.renderInfo(infoAdress)}
        </div>
        <div className="col-sm-12 col-md-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d17504.899541577222!2d-47.35839256900153!3d-22.73003215315157!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1542063590580" width="400" height="200" frameborder="0" 
            style={{border: 0}} allowfullscreen></iframe>
        </div>
        </div>
    )
}

}



