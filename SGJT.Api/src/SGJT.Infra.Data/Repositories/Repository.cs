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

        public virtual void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual TEntity Get(long id)
        {
            return DbSet.Find(id);
        }

        public virtual IQueryable<TEntity> Get()
        {
            return DbSet;
        }

        public void Update(TEntity entity)
        {
            // Só uma entidade com o mesmo Id pode ser rastreada.
            var localEntry = DbSet.Local.FirstOrDefault(entry => entry.Id == entity.Id);

            if (localEntry != null)
            {
                Db.Entry(localEntry).State = EntityState.Detached;
            }

            Db.Entry(entity).State = EntityState.Modified;

            DbSet.Update(entity);
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
