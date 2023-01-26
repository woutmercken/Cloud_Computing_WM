using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BucketList.Models
{
    public class BucketContext : DbContext
    {
        public BucketContext(DbContextOptions<BucketContext> options)
            : base(options)
        {
        }

        public DbSet<BucketItem> BucketItems { get; set; } = null!;
    }
}