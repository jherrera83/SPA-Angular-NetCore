using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Persona/listarPersonas")]
        public IEnumerable<PersonaCLS> listarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                 where persona.Bhabilitado == 1
                                                 select new PersonaCLS
                                                 {
                                                     iidpersona = persona.Iidpersona,
                                                     nombrecompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     correo = persona.Correo,
                                                     telefono = persona.Telefono
                                                 }).ToList();
                return listaPersona;
            }
        }

        [HttpGet]
        [Route("api/Persona/filtraPersona/{nombreCompleto?}")]
        public IEnumerable<PersonaCLS> filtrarPersona(string nombreCompleto = "")
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona;
                if (nombreCompleto == "")
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1

                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombrecompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        correo = persona.Correo,
                                        telefono = persona.Telefono
                                    }).ToList();
                }
                else
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToUpper().Contains(nombreCompleto.ToUpper())
                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombrecompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        correo = persona.Correo,
                                        telefono = persona.Telefono
                                    }).ToList();
                }

                return listaPersona;
            }
        }

        [HttpPost]
        [Route("api/Persona/guardarPersona")]
        public int guardarPersona([FromBody]PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPersonaCLS.iidpersona == 0)
                    {
                        Persona oPersona = new Persona();
                        oPersona.Iidpersona = oPersonaCLS.iidpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechanacimiento;
                        oPersona.Bhabilitado = 1;
                        oPersona.Btieneusuario = 0;
                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oPersonaCLS.iidpersona).FirstOrDefault();
                        oPersona.Iidpersona = oPersonaCLS.iidpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechanacimiento;
                        bd.Persona.Update(oPersona);
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
        [Route("api/Persona/recuperarPersona/{idPersona}")]
        public PersonaCLS recuperarPersona(int idPersona)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                PersonaCLS opersona = (from persona in bd.Persona
                                       where persona.Bhabilitado == 1
                                       && persona.Iidpersona == idPersona
                                       select new PersonaCLS
                                       {
                                           iidpersona = persona.Iidpersona,
                                           nombre = persona.Nombre,
                                           apPaterno = persona.Appaterno,
                                           apMaterno = persona.Apmaterno,
                                           correo = persona.Correo,
                                           telefono = persona.Telefono,
                                           fechacadena = persona.Fechanacimiento.HasValue? ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd") : ""
                                       }).FirstOrDefault();
                return opersona;
            }
        }

        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idPersona}")]
        public int eliminarPersona(int idPersona)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Persona oPersona = bd.Persona.Where(p => p.Iidpersona == idPersona).FirstOrDefault();
                    oPersona.Bhabilitado = 0;
                    bd.Persona.Update(oPersona);
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
        [Route("api/Persona/validarCorreo/{id}/{correo}")]
        public int validarCorreo(int id, string correo)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0)
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower() && p.Iidpersona != id).Count();
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
        [Route("api/Persona/listarPersonasCombo")]
        public IEnumerable<PersonaCLS> listarPersonasCombo()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                 where persona.Bhabilitado == 1
                                                 && persona.Btieneusuario == 0
                                                 select new PersonaCLS
                                                 {
                                                     iidpersona = persona.Iidpersona,
                                                     nombrecompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     correo = persona.Correo,
                                                     telefono = persona.Telefono
                                                 }).ToList();
                return listaPersona;
            }
        }
    }
}