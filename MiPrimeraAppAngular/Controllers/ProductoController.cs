using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Producto/listarProductos")]
        public IEnumerable<ProductoCLS> listarProductos()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           select new ProductoCLS
                                           {
                                               idProducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtrarProductosPorNombre/{nombre}")]
        public IEnumerable<ProductoCLS> filtrarProductosPorNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Nombre.ToUpper().Contains(nombre.ToUpper())
                                           select new ProductoCLS
                                           {
                                               idProducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtrarProductosPorCategoria/{idcategoria}")]
        public IEnumerable<ProductoCLS> filtrarProductosPorCategoria(int idcategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Iidcategoria == idcategoria
                                           select new ProductoCLS
                                           {
                                               idProducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/listarMarcas")]
        public IEnumerable<MarcaCLS> listarMarcas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<MarcaCLS> lista = (from marca in bd.Marca
                                        where marca.Bhabilitado == 1
                                        select new MarcaCLS
                                        {
                                            iidmarca = marca.Iidmarca,
                                            nombre = marca.Nombre
                                        }).ToList();
                return lista;
            }
        }

        [HttpPost]
        [Route("api/Producto/guardarProducto")]
        public int guardarProducto([FromBody]ProductoCLS oProductoCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oProductoCLS.idProducto == 0)
                    {
                        Producto oProducto = new Producto();
                        oProducto.Iidproducto = oProductoCLS.idProducto;
                        oProducto.Nombre = oProductoCLS.nombre;
                        oProducto.Stock = oProductoCLS.stock;
                        oProducto.Precio = oProductoCLS.precio;
                        oProducto.Iidmarca = oProductoCLS.idmarca;
                        oProducto.Iidcategoria = oProductoCLS.idcategoria;
                        oProducto.Bhabilitado = 1;
                        bd.Producto.Add(oProducto);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Producto oProducto = bd.Producto.Where(p => p.Iidproducto == oProductoCLS.idProducto).FirstOrDefault();
                        oProducto.Iidproducto = oProductoCLS.idProducto;
                        oProducto.Nombre = oProductoCLS.nombre;
                        oProducto.Stock = oProductoCLS.stock;
                        oProducto.Precio = oProductoCLS.precio;
                        oProducto.Iidmarca = oProductoCLS.idmarca;
                        oProducto.Iidcategoria = oProductoCLS.idcategoria;
                        bd.Producto.Update(oProducto);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
            }
            catch (Exception)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Producto/recuperarProducto/{idProducto}")]
        public ProductoCLS recuperarProducto(int idProducto)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                ProductoCLS oproducto = (from producto in bd.Producto
                                         where producto.Bhabilitado == 1
                                         && producto.Iidproducto == idProducto
                                         select new ProductoCLS
                                         {
                                             idProducto = producto.Iidproducto,
                                             nombre = producto.Nombre,
                                             stock = (int)producto.Stock,
                                             precio = (decimal)producto.Precio,
                                             idmarca = (int)producto.Iidmarca,
                                             idcategoria = (int)producto.Iidcategoria,
                                         }).FirstOrDefault();
                return oproducto;
            }
        }

        [HttpGet]
        [Route("api/Producto/eliminarProducto/{idProducto}")]
        public int eliminarProducto(int idProducto)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Producto oProducto = bd.Producto.Where(p => p.Iidproducto == idProducto).FirstOrDefault();
                    oProducto.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }
            catch (Exception)
            {
                rpta = 0;
            }

            return rpta;
        }

    }
}