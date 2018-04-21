using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ToDoListApp_DAL.Models;
using ToDoListApp_DAL.Reposiitories;

namespace ToDoWebAPI.Controllers
{
    public class ToDosController : ApiController
    {
        private ToDosRepository toDosRepo;

        public ToDosController()
        {
            toDosRepo = new ToDosRepository();
        }

        // GET api/values
        public async Task<HttpResponseMessage> Get()
        {
            var toDosCollection = await toDosRepo.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, toDosCollection);
            
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public async Task<HttpResponseMessage> Post([FromBody]ToDoItem value)
        {
            try
            {
               await toDosRepo.AddAsync(value);
            }
            catch (Exception ex)
            {
                var thisException = ex;
            }
            return Request.CreateResponse(HttpStatusCode.OK, value);

        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
