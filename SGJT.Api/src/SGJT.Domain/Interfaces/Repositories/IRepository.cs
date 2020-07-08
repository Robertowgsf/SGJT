using SGJT.Domain.Entities;
using System.Linq;

namespace SGJT.Domain.Interfaces.Repositories
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        void Add(TEntity entity);
        TEntity Get(long id);
        IQueryable<TEntity> Get();
        void Update(TEntity entity);
        void Remove(long id);
        int SaveChanges();
    }
}
