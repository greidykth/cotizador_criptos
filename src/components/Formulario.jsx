import { useEffect, useState } from "react";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Error from "./Error";
import Resultado from "./Resultado";
import Spinner from "./Spinner";

const Formulario = ({setMonedas, resultadoCotizacion, setResultadoCotizacion, setCargando, cargando, error, setError, message, setMessage}) => {

    const monedas = [
        {id: 'USD', nombre: 'Dolar de Estado Unidos'},
        {id: 'MXN', nombre: 'Peso Mexicano'},
        {id: 'EUR', nombre: 'Euro'},
        {id: 'GBP', nombre: 'Libra Esterlina'}
    ]

    const [criptos, setCriptos] = useState([]);

    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas("Elige tu criptomoneda", criptos)

    useEffect( () => {
        setCargando(false);
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

           fetch(url)
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                const arrayCriptos = resultado.Data.map((cripto) => {
                    return {
                        id: cripto.CoinInfo.Name,
                        nombre: cripto.CoinInfo.FullName
                    }
                })
                setCriptos(arrayCriptos);
                setError(false);
                setMessage("");
            })
            .catch((error) => {
              setError(true);
              setMessage("Error al cargar lista de criptomonedas");
            })
        }
        consultarAPI();
    }, [])
     
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([moneda, criptomoneda].includes("")){
            setError(true);
            setResultadoCotizacion({});
            setMessage("Todos los campos son obligatorios");
            return;
        }
        setError(false);
        setMessage("");
        setMonedas({moneda, criptomoneda});
    }
    
  return (
    <div className="md:w-2/5 m-5">
      <h2 className="text-white font-bold text-4xl text-center mb-20">
        Cotiza Criptomonedas {""}<span className="px-2 after: bg-indigo-400">al instante</span>
      </h2>
      {error && <Error message={message} />}
      <form
        onSubmit={handleSubmit}
      >
        
        <SelectMonedas />
        <SelectCriptomonedas />
       
        <input
          className="bg-indigo-400 mt-6 rounded text-white text-xl text-center font-bold p-2 w-full cursor-pointer transition-colors hover:bg-indigo-500"
          value="COTIZAR"
          type="submit"
        />
      </form>
      {cargando && <Spinner />}
      {resultadoCotizacion.PRICE &&
      <Resultado 
        resultadoCotizacion={resultadoCotizacion}
      />}
    </div>
  );
};

export default Formulario;
