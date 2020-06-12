using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> listarTipoUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> lista = (from tipousuario in bd.TipoUsuario
                                              where tipousuario.Bhabilitado == 1
                                              select new TipoUsuarioCLS
                                              {
                                                  iidtipousuario = tipousuario.Iidtipousuario,
                                                  nombre = tipousuario.Nombre,
                                                  descripcion = tipousuario.Descripcion,
                                                  bhabilitado = (int)tipousuario.Bhabilitado
                                              }).ToList();
                return lista;
            }
        }

        [HttpPost]
        [Route("api/TipoUsuario/guardarTipoUsuario")]
        public int guardarTipoUsuario([FromBody]TipoUsuarioCLS oTipoUsuarioCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (var tx = new TransactionScope())
                    {
                        if (oTipoUsuarioCLS.iidtipousuario == 0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.iidtipousuario;
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            oTipoUsuario.Bhabilitado = 1;
                            bd.TipoUsuario.Add(oTipoUsuario);

                            int idTipoUsuario = oTipoUsuario.Iidtipousuario;
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            for (int i = 0; i < ids.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idTipoUsuario;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                            }

                            rpta = 1;
                        }
                        else
                        {
                            TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.iidtipousuario).FirstOrDefault();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            bd.TipoUsuario.Update(oTipoUsuario);

                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            List<PaginaTipoUsuario> lista = bd.PaginaTipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuario.Iidtipousuario).ToList();
                            foreach (var item in lista)
                            {
                                item.Bhabilitado = 0;
                                bd.PaginaTipoUsuario.Update(item);
                            }

                            int cantidad;
                            for (int i = 0; i < ids.Length; i++)
                            {
                                if (ids[i] == "") continue;
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();
                                if (cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuario.Iidtipousuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else
                                {
                                    PaginaTipoUsuario oPaginaTIpoUsuario = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).FirstOrDefault();
                                    oPaginaTIpoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Update(oPaginaTIpoUsuario);
                                }
                            }

                            rpta = 1;
                        }
                        bd.SaveChanges();
                        tx.Complete();
                    }

                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/TipoUsuario/recuperarTipoUsuario/{idTipoUsuario}")]
        public TipoUsuarioCLS recuperarTipoUsuario(int idTipoUsuario)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                TipoUsuarioCLS oTipoUsuarioCls = (from tipoUsuario in bd.TipoUsuario
                                                  where tipoUsuario.Bhabilitado == 1
                                                  && tipoUsuario.Iidtipousuario == idTipoUsuario
                                                  select new TipoUsuarioCLS
                                                  {
                                                      iidtipousuario = tipoUsuario.Iidtipousuario,
                                                      nombre = tipoUsuario.Nombre,
                                                      descripcion = tipoUsuario.Descripcion
                                                  }).FirstOrDefault();
                return oTipoUsuarioCls;
            }
        }

        [HttpGet]
        [Route("api/TipoUsuario/eliminarTipoUsuario/{idTipoUsuario}")]
        public int eliminarTipoUsuario(int idTipoUsuario)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).FirstOrDefault();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.TipoUsuario.Update(oTipoUsuario);
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

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasTipoUsuario")]
        public List<PaginaCLS> listarPaginasTipoUsuario()
        {
            List<PaginaCLS> lista = new List<PaginaCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                lista = (from pagina in bd.Pagina
                         where pagina.Bhabilitado == 1
                         select new PaginaCLS
                         {
                             iidpagina = pagina.Iidpagina,
                             mensaje = pagina.Mensaje
                         }).ToList();
            }
            return lista;
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar/{idTipoUsuario}")]
        public TipoUsuarioCLS listarPaginasRecuperar(int idTipoUsuario)
        {
            TipoUsuarioCLS oTipoUsuarioCLS = new TipoUsuarioCLS();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PaginaCLS> lista = (from tipousuario in bd.TipoUsuario
                                         join paginaTipoUsu in bd.PaginaTipoUsuario
                                         on tipousuario.Iidtipousuario equals paginaTipoUsu.Iidtipousuario
                                         join pagina in bd.Pagina
                                         on paginaTipoUsu.Iidpagina equals pagina.Iidpagina
                                         where paginaTipoUsu.Iidtipousuario == idTipoUsuario
                                         && paginaTipoUsu.Bhabilitado == 1
                                         select new PaginaCLS
                                         {
                                             iidpagina = pagina.Iidpagina
                                         }).ToList();
                TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).FirstOrDefault();

                oTipoUsuarioCLS.iidtipousuario = oTipoUsuario.Iidtipousuario;
                oTipoUsuarioCLS.nombre = oTipoUsuario.Nombre;
                oTipoUsuarioCLS.descripcion = oTipoUsuario.Descripcion;
                oTipoUsuarioCLS.listaPaginas = lista;
            }
            return oTipoUsuarioCLS;
        }
    }
}