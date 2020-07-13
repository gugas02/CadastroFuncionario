using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Teste.Api.Config;

namespace Teste.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Env { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry(this.Configuration);

            services.ConfigureErrorHandling();

            services.ConfigureDatabase(this.Configuration);

            services.ConfigureDi(Env, this.Configuration);

            services.ConfigureAuth(this.Configuration);

            services.ConfigureSwagger();

            services.ConfigureMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            app.AddSwagger();

            app.AddCors();

            app.AddExceptionHandling(env, serviceProvider);

            app.UseHttpsRedirection();

            app.ConfigureMvcStaticFilesAndRouting(env);
        }
    }
}
