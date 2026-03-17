using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolMaintenanceDemo.Data;

public class SchoolMaintenanceDemoDataContextFactory : IDesignTimeDbContextFactory<SchoolMaintenanceDemoDataContext>
{
    public SchoolMaintenanceDemoDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}SchoolMaintenanceDemo.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new SchoolMaintenanceDemoDataContext(config.GetConnectionString("ConStr"));
    }
}