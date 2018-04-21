using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ToDoListApp_DAL.Context;
using ToDoListApp_DAL.Interfaces;

namespace ToDoListApp_DAL.Reposiitories
{
    public abstract class AbstractRepository<T>
        where T: class, IBasicEntity
    {
        public async Task<List<T>> GetWhereAsync(Expression<Func<T,bool>> whereQuery)
        {
            using (var db = new DNVDbContext())
            {
                return await db.Set<T>()
                    .Where(whereQuery)
                    .ToListAsync();
            }
        }

        public async Task<List<T>> GetAll()
        {
            using (var db = new DNVDbContext())
            {
                return await db.Set<T>()
                    .ToListAsync();
            }
        }

        public async Task<int> AddAsync(T entity)
        {
            using (var db = new DNVDbContext())
            {
                db.Set<T>().Add(entity);
                return await db.SaveChangesAsync();
            }
        }

        public async Task<int> Update(T entity)
        {
            using (var db = new DNVDbContext())
            {
                db.Entry(entity).State = EntityState.Modified;
                return await db.SaveChangesAsync();
            }
        }

        public async Task Delete(int id)
        {
            using (var db = new DNVDbContext())
            {
                db.Entry(db.Set<T>().Where(c => c.Id == id).FirstOrDefault()).State = EntityState.Deleted;
                await db.SaveChangesAsync();
            }
        }
        
    }
}
