import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Imagen from "./components/Imagen";
import Resultado from "./components/Resultado";

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultadoCotizacion, setResultadoCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCriptos = () => {
        setCargando(true);
        setResultadoCotizacion({});
        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        fetch(url)
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            setResultadoCotizacion(resultado.DISPLAY[criptomoneda][moneda]);
            setCargando(false);
          })
          .catch((error) => {
            setError(true);
            setMessage("Error al cotizar criptomoneda");
            setTimeout(() => {
              setCargando(false);
            }, 3000);
          });
      };
      cotizarCriptos();
      setError(false);
      setMessage("");
    }
  }, [monedas]);

  return (
    <div className="container mx-auto mt-28 md:flex justify-center">
      <Imagen />
      <Formulario
        error={error}
        setError={setError}
        message={message}
        setMessage={setMessage}
        setResultadoCotizacion={setResultadoCotizacion}
        setMonedas={setMonedas}
        resultadoCotizacion={resultadoCotizacion}
        cargando={cargando}
        setCargando={setCargando}
      />
    </div>
  );
}

export default App;
