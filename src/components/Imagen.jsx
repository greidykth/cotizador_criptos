import ImagenCripto from '../img/imagen-criptos.png'

const Imagen = () => {
  return (
    <div className="md:w-2/5 mt-10">
        <img className="block max-w-md w-96"
            src={ImagenCripto}
            alt="Imagenes criptomonedas"
        />
    </div>
  )
}

export default Imagen