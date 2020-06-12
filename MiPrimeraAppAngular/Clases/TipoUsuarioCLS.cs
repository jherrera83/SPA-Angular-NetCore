using System.Collections.Generic;

namespace MiPrimeraAppAngular.Clases
{
    public class TipoUsuarioCLS
    {
        public int iidtipousuario { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int bhabilitado { get; set; }
        public string valores { get; set; }
        public List<PaginaCLS> listaPaginas { get; set; }
    }
}
