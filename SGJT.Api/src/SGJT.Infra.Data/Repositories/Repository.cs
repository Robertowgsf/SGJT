using Microsoft.EntityFrameworkCore;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using SGJT.Infra.Data.Contexts;
using System.Linq;

namespace SGJT.Infra.Data.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : Entity
    {
        protected readonly SGJTContext Db;
        protected readonly DbSet<TEntity> DbSet;

        public Repository(SGJTContext context)
        {
            Db = context;
            DbSet = Db.Set<TEntity>();
        }

        public virtual void Add(TEntity obj)
        {
            DbSet.Add(obj);
        }

        public virtual TEntity Get(long id)
        {
            return DbSet.Find(id);
        }

        public virtual IQueryable<TEntity> Get()
        {
            return DbSet;
        }

        public void Update(TEntity obj)
        {
            DbSet.Update(obj);
        }

        public virtual void Remove(long id)
        {
            DbSet.Remove(DbSet.Find(id));
        }

        public int SaveChanges()
        {
            return Db.SaveChanges();
        }
    }
}
