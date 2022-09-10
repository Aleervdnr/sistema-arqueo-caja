import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./Caja.css"

export default function Caja() {
  const [inputGastosMonto, setInputGastosMonto] = useState(0)
  const [inputGastosDesc, setInputGastosDesc] = useState("")
  const [gastos, setGastos] = useState([])
  const [gastosTotal, setGastosTotal] = useState(0)

  const [inputFajos, setInputFajos] = useState(0)
  const [fajos, setFajos] = useState([])
  const [fajosTotal, setFajosTotal] = useState(0)

  const [inputTransfe, setInputTransfe] = useState(0)
  const [transferencias, setTransferencias] = useState([])
  const [tranfesTotal, setTranfesTotal] = useState(0)

  const manejarEnvioGasto = (e) => {
    e.preventDefault()
    // setInputGastosDesc("")
    // setInputGastosMonto(0)
    document.getElementById("form-gastos").reset();

    const gastoNuevo = {
      gasto: inputGastosMonto,
      descripcion: inputGastosDesc,
      id:uuidv4()
    }

    setGastos([...gastos, gastoNuevo])
    setGastosTotal(gastosTotal + parseInt(gastoNuevo.gasto))

  }

  const eliminarGasto = (id,gasto) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
    setGastosTotal(gastosTotal - gasto)
  }

  //fajos
  const manejarEnvioFajos = (e) => {
    e.preventDefault()

    document.getElementById("form-fajos").reset();

    const fajoNuevo = {
      monto: inputFajos,
      id:uuidv4()
    }

    setFajos([...fajos, fajoNuevo])
    setFajosTotal(fajosTotal + parseInt(fajoNuevo.monto))
  }

  const eliminarFajo = (id, monto) => {
    const fajosActualizados = fajos.filter( fajo => fajo.id !== id)
    setFajos(fajosActualizados)
    setFajosTotal(fajosTotal - monto)
  }

  //Transferencias

  const manejoEnviarTransfe = (e) => {
    e.preventDefault()

    document.getElementById("form-transferencias").reset()

    const transfeNuevo = {
      monto: inputTransfe,
      id:uuidv4()
    }

    setTransferencias([...transferencias, transfeNuevo])
    setTranfesTotal(tranfesTotal + parseInt(transfeNuevo.monto))
  }

  const eliminarTransfe = (id,monto) => {
    const transfesActualizados = transferencias.filter(transfe => transfe.id !== id)

    setTransferencias(transfesActualizados)
    setTranfesTotal(tranfesTotal - monto)
  }

  return (
    <div className='caja-container'>
      <div className="panel ui-box">
        <div className="total-caja">
          Total caja: <span className='totales'>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(gastosTotal + fajosTotal + tranfesTotal)}</span>
        </div>

        <div className="total-gastos-box">
          Total gastos: <span className='totales'>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(gastosTotal)}</span>
        </div>

        <div className="total-fajos">
          Total fajos: <span className='totales'>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(fajosTotal)}</span>
          </div>

        <div className="total-transferencias">
          Total transferencias: <span className='totales'>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(tranfesTotal)}</span>
        </div>
      </div>

      <div className="caja">
        <div className="gastos ui-box2">
          <h3>Gastos</h3>
          <form onSubmit={manejarEnvioGasto} id="form-gastos">
            <input 
              type="number" 
              placeholder='Agregar monto'
              className='input-gasto-monto'
              onChange={(e) => setInputGastosMonto(e.target.value)} 
              required/>

            <input 
              type="text" 
              placeholder='Agregar Descripcion' 
              onChange={(e) => setInputGastosDesc(e.target.value)} 
              required/>
            <button>+</button>
          </form>
          <ul className="lista-gastos">
            {gastos.length ? 

              gastos.map(({gasto,descripcion,id}) => {
                return <>
                  <li key={id} className="gasto ui-box">
                  {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(gasto)} - <span className='gasto_descripcion'> {descripcion}</span> 
                    <div className="close" onClick={() => eliminarGasto(id,gasto)}>X</div>
                  </li> 
                  </>
              }) 

              
            :
              <li className='no-gasto ui-box'>No hay gastos</li>}
              
          </ul>
        </div>

        <div className="fajos ui-box2">
          <h3>Fajos</h3>
          <form onSubmit={manejarEnvioFajos} id="form-fajos">
            <input 
              type="number" 
              placeholder='Agregar monto'
              onChange={(e) => setInputFajos(e.target.value)}
              required/>
            <button>+</button>
          </form>

          <ul className="lista-fajos">
            {fajos.length ? 

              fajos.map(({monto,id}) => {
                return <>
                  <li key={id} className="gasto ui-box">
                  {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(monto)}
                    <div className="close" onClick={() => eliminarFajo(id,monto)}>X</div>
                  </li> 
                  </>
              }) 

              
            :
              <li className='no-gasto ui-box'>No hay fajos</li>}
              
          </ul>
        </div>

        <div className="tranferencias ui-box2">
          <h3>Transferencias</h3>

          <form id='form-transferencias' onSubmit={manejoEnviarTransfe}>
            <input 
              type="number" 
              placeholder='Agregar monto'
              onChange={(e) => setInputTransfe(e.target.value)}
              />
              <button>+</button>
          </form>
          {transferencias.length ? 

            transferencias.map(({monto,id}) => {
              return <>
                <li key={id} className="gasto ui-box">
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(monto)}
                  <div className="close" onClick={() => eliminarTransfe(id,monto)}>X</div>
                </li> 
                </>
            }) 


            :
            <li className='no-gasto ui-box'>No hay transferencias</li>}
        </div>

      </div>
    </div>
  )
}
