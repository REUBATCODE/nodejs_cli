SELECT
    YEAR(v.fecha) AS ano,
    (
        SELECT nombre
        FROM ventas_detalle vd2
        WHERE vd2.id_venta = v.id
        GROUP BY vd2.nombre
        ORDER BY SUM(vd2.cantidad) DESC
        LIMIT 1
    ) AS producto_mas_vendido,
    (
        SELECT SUM(cantidad)
        FROM ventas_detalle vd2
        WHERE vd2.id_venta = v.id
        AND vd2.nombre = (
            SELECT nombre
            FROM ventas_detalle vd3
            WHERE vd3.id_venta = v.id
            GROUP BY vd3.nombre
            ORDER BY SUM(vd3.cantidad) DESC
            LIMIT 1
        )
    ) AS cantidad_producto_mas_vendido
FROM ventas v
GROUP BY ano
ORDER BY ano;
