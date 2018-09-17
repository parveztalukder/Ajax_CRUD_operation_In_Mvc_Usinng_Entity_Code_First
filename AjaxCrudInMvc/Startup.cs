using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AjaxCrudInMvc.Startup))]
namespace AjaxCrudInMvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
