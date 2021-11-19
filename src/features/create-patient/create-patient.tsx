import React, {Fragment, useState} from 'react';
import styles from './create-patient.module.scss';

const CreatePatient = () => {
    const [datos, setData] = useState({
        name: ''
    })

    const handleInputChange = (event: any) => {
        setData({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event: any) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.name)
    }

    return (
        <Fragment>
            <h1 className= {styles.manu} >Crear Paciente</h1>
            <form onSubmit={sendData}>
                <div>
                    <input type="text" placeholder="Nombre"  onChange={handleInputChange} name="name"></input>
                </div>
                <button type="submit">Enviar</button>
            </form>
            <ul>
                <li>{datos.name}</li>
            </ul>
        </Fragment>
    );
}
 
export default CreatePatient;
