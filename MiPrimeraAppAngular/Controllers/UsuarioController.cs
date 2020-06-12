using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Transactions;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;

namespace MiPrimeraAppAngular.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> listarTipoUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                                         where tipoUsuario.Bhabilitado == 1
                                                         select new TipoUsuarioCLS
                                                         {
                                                             iidtipousuario = tipoUsuario.Iidtipousuario,
                                                             nombre = tipoUsuario.Nombre
                                                         }).ToList();
                return listaTipoUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> listarUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona on
                                                 usuario.Iidpersona equals persona.Iidpersona
                                                 join tipoUsuario in bd.TipoUsuario on
                                                 usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 select new UsuarioCLS
                                                 {
                                                     iidusuario = usuario.Iidusuario,
                                                     nombreusuario = usuario.Nombreusuario,
                                                     nombrepersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombretipousuario = tipoUsuario.Nombre
                                                 }).ToList();
                return listaUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/filtrarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> filtrarUsuarioPorTipo(int idTipo = 0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona on
                                                 usuario.Iidpersona equals persona.Iidpersona
                                                 join tipoUsuario in bd.TipoUsuario on
                                                 usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 && usuario.Iidtipousuario == idTipo
                                                 select new UsuarioCLS
                                                 {
                                                     iidusuario = usuario.Iidusuario,
                                                     nombreusuario = usuario.Nombreusuario,
                                                     nombrepersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombretipousuario = tipoUsuario.Nombre
                                                 }).ToList();
                return listaUsuario;
            }
        }

        [HttpPost]
        [Route("api/Usuario/guardarUsuario")]
        public int guardarUsuario([FromBody]UsuarioCLS oUsuarioCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (var transaccion = new TransactionScope())
                    {
                        if (oUsuarioCLS.iidusuario == 0)
                        {
                            Usuario oUsuario = new Usuario();
                            oUsuario.Iidusuario = oUsuarioCLS.iidusuario;
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreusuario;

                            SHA256Managed sha = new SHA256Managed();
                            string clave = oUsuarioCLS.contra;
                            byte[] dataNoCifrada = Encoding.Default.GetBytes(clave);
                            byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                            oUsuario.Contra = BitConverter.ToString(dataCifrada).Replace("-", "");

                            oUsuario.Iidpersona = oUsuarioCLS.iidpersona;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidtipousuario;
                            oUsuario.Bhabilitado = 1;
                            bd.Usuario.Add(oUsuario);

                            Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oUsuarioCLS.iidpersona).FirstOrDefault();
                            oPersona.Btieneusuario = 1;
                            bd.Persona.Update(oPersona);

                            bd.SaveChanges();
                            transaccion.Complete();

                            rpta = 1;
                        }
                        else
                        {
                            Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == oUsuarioCLS.iidusuario).FirstOrDefault();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreusuario;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidtipousuario;
                            bd.Usuario.Update(oUsuario);
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }

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
        [Route("api/Usuario/recuperarUsuario/{idUsuario}")]
        public UsuarioCLS recuperarUsuario(int idUsuario)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                UsuarioCLS ousuario = (from usuario in bd.Usuario
                                       where usuario.Bhabilitado == 1
                                       && usuario.Iidusuario == idUsuario
                                       select new UsuarioCLS
                                       {
                                           iidusuario = usuario.Iidusuario,
                                           nombreusuario = usuario.Nombreusuario,
                                           contra = usuario.Contra,
                                           iidpersona = (int)usuario.Iidpersona,
                                           iidtipousuario = (int)usuario.Iidtipousuario
                                       }).FirstOrDefault();
                return ousuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/eliminarUsuario/{idUsuario}")]
        public int eliminarUsuario(int idUsuario)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idUsuario).FirstOrDefault();
                    oUsuario.Bhabilitado = 0;
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
        [Route("api/Usuario/validarUsuario/{idUsuario}/{nombre}")]
        public int validarUsuario(int idUsuario, string nombre)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (idUsuario == 0)
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower() && p.Iidusuario != idUsuario).Count();
                    }
                }
            }
            catch (Exception)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpPost]
        [Route("api/Usuario/login")]
        public UsuarioCLS login([FromBody] UsuarioCLS usuario)
        {
            UsuarioCLS oUsuarioCLS = new UsuarioCLS();

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                int rpta = 0;

                SHA256Managed sha = new SHA256Managed();
                byte[] dataNoCifrada = Encoding.Default.GetBytes(usuario.contra);
                byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");

                rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == usuario.nombreusuario.ToLower() && p.Contra == claveCifrada).Count();

                if (rpta == 1)
                {
                    Usuario usuariorecuperar = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == usuario.nombreusuario.ToLower() && p.Contra == claveCifrada).FirstOrDefault();
                    HttpContext.Session.SetString("usuario", usuariorecuperar.Iidusuario.ToString());
                    HttpContext.Session.SetString("tipousuario", usuariorecuperar.Iidtipousuario.ToString());
                    oUsuarioCLS.iidusuario = usuariorecuperar.Iidusuario;
                    oUsuarioCLS.nombreusuario = usuariorecuperar.Nombreusuario;
                }
                else
                {
                    oUsuarioCLS.iidusuario = 0;
                    oUsuarioCLS.nombreusuario = "";
                }
            }
            return oUsuarioCLS;
        }

        [HttpGet]
        [Route("api/Usuario/obtenerVariableSession")]
        public SeguridadCLS obtenerVariableSession()
        {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();
            string variableSession = HttpContext.Session.GetString("usuario");
            if (variableSession == null)
            {
                oSeguridadCLS.valor = "";
            }
            else
            {
                oSeguridadCLS.valor = variableSession;
                List<PaginaCLS> listaPaginas = new List<PaginaCLS>();
                int idUsuario = int.Parse(HttpContext.Session.GetString("usuario"));
                int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipousuario"));
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    listaPaginas = (from usuario in bd.Usuario
                                    join tipousuario in bd.TipoUsuario
                                    on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                    join paginatipo in bd.PaginaTipoUsuario
                                    on usuario.Iidtipousuario equals paginatipo.Iidtipousuario
                                    join pagina in bd.Pagina
                                    on paginatipo.Iidpagina equals pagina.Iidpagina
                                    where usuario.Iidusuario == idUsuario
                                    && usuario.Iidtipousuario == idTipoUsuario
                                    select new PaginaCLS
                                    {
                                        accion = pagina.Accion.Substring(1),
                                    }).ToList();
                    oSeguridadCLS.lista = listaPaginas;
                }

            }
            return oSeguridadCLS;
        }

        [HttpGet]
        [Route("api/Usuario/cerrarSession")]
        public SeguridadCLS cerrarSession()
        {
            SeguridadCLS oSeguridadcls = new SeguridadCLS();
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    HttpContext.Session.Remove("usuario");
                    HttpContext.Session.Remove("tipousuario");
                    oSeguridadcls.valor = "ok";
                }
            }
            catch (Exception)
            {
                oSeguridadcls.valor = "";
            }
            return oSeguridadcls;
        }

        [HttpGet]
        [Route("api/Usuario/listarPaginas")]
        public List<PaginaCLS> listarPaginas()
        {
            List<PaginaCLS> lista = new List<PaginaCLS>();
            int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipousuario"));
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                lista = (from paginatipo in bd.PaginaTipoUsuario
                         join pagina in bd.Pagina on paginatipo.Iidpagina equals pagina.Iidpagina
                         where paginatipo.Bhabilitado == 1
                         && paginatipo.Iidtipousuario == idTipoUsuario
                         select new PaginaCLS
                         {
                             iidpagina = pagina.Iidpagina,
                             accion = pagina.Accion,
                             mensaje = pagina.Mensaje,
                             bhabilitado = (int)pagina.Bhabilitado
                         }).ToList();
            }
            return lista;
        }

    }
}