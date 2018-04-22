using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using ToDoListApp_DAL.Models;
using ToDoListApp_DAL.Reposiitories;

namespace ToDoWebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ToDosController : ApiController
    {
        private ToDosRepository toDosRepo;

        public ToDosController()
        {
            toDosRepo = new ToDosRepository();
        }

        public async Task<HttpResponseMessage> Get()
        {
            var toDosCollection = await toDosRepo.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, toDosCollection);
            
        }

        public async Task<HttpResponseMessage> Get(int id)
        {
            List<ToDoItem> toDosCollection;

            if (id==1)
            {
                toDosCollection = await toDosRepo.GetWhereAsync(c=>c.IsCompleted==true);
            }
            else if(id==2)
            {
                toDosCollection = await toDosRepo.GetWhereAsync(c => c.IsCompleted == false);
            }
            else
            {
                toDosCollection = await toDosRepo.GetAll();
            }

            return Request.CreateResponse(HttpStatusCode.OK, toDosCollection);
        }

        public async Task<HttpResponseMessage> Post([FromBody]ToDoItem value)
        {
            value.ActualisationDate = DateTime.Now;
            await toDosRepo.AddAsync(value);
            return Request.CreateResponse(HttpStatusCode.OK, value);

        }

        public async Task<HttpResponseMessage> Put([FromBody]ToDoItem value)
        {
            value.ActualisationDate = DateTime.Now;
            await toDosRepo.Update(value);
            return Request.CreateResponse(HttpStatusCode.OK, value);

        }

        public async Task<HttpResponseMessage> Delete(int id)
        {
            await toDosRepo.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
