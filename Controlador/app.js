import { Municipio } from '../Modelo/Municipio.js';
const cuerpoTabla = document.getElementById("tabla-municipios");
const contador = document.getElementById("contador");

const filtros = {
  region: document.getElementById("filtroRegion"),
  departamento: document.getElementById("filtroDepto"),
  codigoDepto: document.getElementById("filtroCodigoDepto"),
  municipio: document.getElementById("filtroMunicipio"),
  codigoMunicipio: document.getElementById("filtroCodigoMunicipio")
};

const btnLimpiar = document.getElementById("btnLimpiar");
let listaCompleta = [];

function renderizarTabla(municipios) {
  cuerpoTabla.innerHTML = "";
  municipios.forEach(m => {
    cuerpoTabla.innerHTML += m.generarFilaHTML();
  });
  contador.textContent = `Resultados: ${municipios.length}`;
}

function aplicarFiltros() {
  let resultado = listaCompleta;

  resultado = resultado.filter(m =>
    (filtros.region.value === "" || m.region === filtros.region.value) &&
    (filtros.departamento.value === "" || m.departamento === filtros.departamento.value) &&
    (filtros.codigoDepto.value === "" || m.codigoDepto === filtros.codigoDepto.value) &&
    (filtros.municipio.value === "" || m.municipio === filtros.municipio.value) &&
    (filtros.codigoMunicipio.value === "" || m.codigoMunicipio === filtros.codigoMunicipio.value)
  );

  renderizarTabla(resultado);
}

function llenarSelectUnico(select, valores) {
  const únicos = Array.from(new Set(valores)).sort();
  únicos.forEach(valor => {
    const option = document.createElement("option");
    option.value = valor;
    option.textContent = valor;
    select.appendChild(option);
  });
}

function llenarFiltros(municipios) {
  llenarSelectUnico(filtros.region, municipios.map(m => m.region));
  llenarSelectUnico(filtros.departamento, municipios.map(m => m.departamento));
  llenarSelectUnico(filtros.codigoDepto, municipios.map(m => m.codigoDepto));
  llenarSelectUnico(filtros.municipio, municipios.map(m => m.municipio));
  llenarSelectUnico(filtros.codigoMunicipio, municipios.map(m => m.codigoMunicipio));
}

// Cargar datos
fetch('../MunicipiosColombia.json')
  .then(res => res.json())
  .then(datos => {
    listaCompleta = datos.map(d => new Municipio(d));
    llenarFiltros(listaCompleta);
    renderizarTabla(listaCompleta);
  });

// Escuchar cambios en todos los select
Object.values(filtros).forEach(select => {
  select.addEventListener("change", aplicarFiltros);
});

// Botón limpiar
btnLimpiar.addEventListener("click", () => {
  Object.values(filtros).forEach(select => select.value = "");
  renderizarTabla(listaCompleta);
});