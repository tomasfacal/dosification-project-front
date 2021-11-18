import React, {Fragment, useState} from 'react';

const Form = () => {
    const [datos, setDatos] = useState({
        cedula: '',
        modelo: ''
    })

    const handleInputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event: any) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.cedula + ' ' + datos.modelo)
    }

    return (
        <Fragment>
            <h1>Formulario</h1>
            <form onSubmit={enviarDatos}>
                <div>
                    <input type="text" placeholder="Ingrese cedula" onChange={handleInputChange} name="cedula"></input>
                </div>
                <br></br>
                <div>
                    <input type="text" placeholder="Ingrese modelo" onChange={handleInputChange} name="modelo"></input>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </Fragment>
    );
}
 
export default Form;

