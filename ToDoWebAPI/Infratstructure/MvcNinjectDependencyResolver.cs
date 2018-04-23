using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;

namespace ToDoWebAPI.Infratstructure
{
    public class MvcNinjectDependencyResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;

        public MvcNinjectDependencyResolver(IKernel kernel)
        {
            _kernel = kernel;
            Bindings.AddBindings(_kernel);
        }

        public IDependencyScope BeginScope()
        {
            return this;
        }

        public void Dispose()
        {

        }

        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }
    }
}