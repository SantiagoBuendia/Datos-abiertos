export class Municipio {
  constructor({ region, c_digo_dane_del_departamento, departamento, c_digo_dane_del_municipio, municipio }) {
    this.region = region;
    this.codigoDepto = c_digo_dane_del_departamento;
    this.departamento = departamento;
    this.codigoMunicipio = c_digo_dane_del_municipio;
    this.municipio = municipio;
  }

  // Método para generar una fila HTML del municipio
  generarFilaHTML() {
    return `
      <tr>
        <td>${this.region}</td>
        <td>${this.departamento}</td>
        <td>${this.codigoDepto}</td>
        <td>${this.municipio}</td>
        <td>${this.codigoMunicipio}</td>
      </tr>
    `;
  }
}
