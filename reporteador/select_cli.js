const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pos"
});

function connect() {
  return new Promise((resolve, reject) => {
    con.connect(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function queryProducts(query) {
    console.log(query);
    consulta= '';
    switch (query) {
        case 1:consulta='SELECT count(*) FROM ventas;'
            
            break;
        case 2:consulta='SELECT * FROM ventas ORDER BY fecha ASC LIMIT 1;'

            break;
        case 3:consulta='SELECT * FROM ventas ORDER BY fecha DESC LIMIT 1;'

            break;
        case 4:consulta='SELECT sum(cantidad) FROM ventas_detalle;'

            break;
        case 5:consulta='SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre;'

            break;
        case 6:consulta='SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) DESC LIMIT 1;'

            break;
        case 7:consulta='SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) ASC LIMIT 1;'

            break;
        case 8:consulta='SELECT productos.nombre, ventas_detalle.nombre FROM productos LEFT JOIN ventas_detalle USING(nombre) WHERE ventas_detalle.nombre is null;'

            break;
        case 9:consulta='SELECT sum(cantidad*precio) FROM ventas_detalle;'

            break;
        case 10:consulta='SELECT v.id AS venta_id, v.fecha, v.hora, SUM(vd.cantidad * vd.precio) AS total_venta FROM ventas v JOIN ventas_detalle vd ON v.id = vd.id_venta GROUP BY v.id, v.fecha, v.hora ORDER BY v.fecha, v.hora LIMIT 10;'

            break;
        case 11:consulta='SELECT YEAR(v.fecha) AS ano, COUNT(*) AS total_ventas FROM ventas v GROUP BY YEAR(v.fecha) ORDER BY ano;'

            break;
        case 12:consulta='SELECT YEAR(fecha) AS ano, COUNT(*) AS total_ventas FROM ventas GROUP BY YEAR(fecha) ORDER BY total_ventas ASC LIMIT 1;'

            break;
        case 13:consulta='SELECT YEAR(fecha) AS ano, COUNT(*) AS total_ventas FROM ventas GROUP BY YEAR(fecha) ORDER BY total_ventas DESC LIMIT 1;'

            break;
        case 14:consulta='SELECT YEAR(fecha) AS ano, COUNT(*) AS total_ventas FROM ventas GROUP BY YEAR(fecha) ORDER BY ano;'

            break;
        case 15:consulta='SELECT YEAR(v.fecha) AS ano,(SELECT nombre FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id GROUP BY vd2.nombre ORDER BY SUM(vd2.cantidad) DESC LIMIT 1) AS producto_mas_vendido,(SELECT SUM(cantidad) FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id AND vd2.nombre = (SELECT nombre FROM ventas_detalle vd3 WHERE vd3.id_venta = v.id GROUP BY vd3.nombre ORDER BY SUM(vd3.cantidad) DESC LIMIT 1)) AS cantidad_producto_mas_vendido FROM ventas v GROUP BY ano ORDER BY ano;'

            break;
        case 16:consulta='SELECT YEAR(v.fecha) AS ano,(SELECT nombre FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id GROUP BY vd2.nombre ORDER BY SUM(vd2.cantidad) ASC LIMIT 1) AS producto_menos_vendido,(SELECT SUM(cantidad) FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id AND vd2.nombre = (SELECT nombre FROM ventas_detalle vd3 WHERE vd3.id_venta = v.id GROUP BY vd3.nombre ORDER BY SUM(vd3.cantidad) ASC LIMIT 1)) AS cantidad_producto_menos_vendido FROM ventas v GROUP BY ano ORDER BY ano;'

            break;
        default:
            break;
    }
  return new Promise((resolve, reject) => {
    con.query(consulta, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function reporte(query) {
  try {
    await connect();
    const results = await queryProducts(query);
    console.log(results);
    con.end();
  } catch (error) {
    console.error(error);
  }
}

console.log('test');
reporte(15).then(() => {
  process.exit();
});
