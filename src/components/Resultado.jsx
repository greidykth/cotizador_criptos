const Resultado = ({ resultadoCotizacion }) => {
  const { IMAGEURL, PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } =
    resultadoCotizacion;

  return (
    <div className="container flex mt-5">
      <img
        className="md:w-1/3 block w-20"
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="imagen"
      />
      <div className="md:w-2/3">
        <p className="text-white text-2xl font-bold mb-2">
          El precio es de: <span>{PRICE}</span>
        </p>
        <p className="text-white text-lg mb-1">
          Precio más alto del día: <span>{HIGHDAY}</span>
        </p>
        <p className="text-white text-lg mb-1">
          Precio más bajo del día: <span>{LOWDAY}</span>
        </p>
        <p className="text-white text-lg mb-1">
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </p>
        <p className="text-white text-lg mb-1">
          Última actualización: <span>{LASTUPDATE}</span>
        </p>
      </div>
    </div>
  );
};

export default Resultado;
