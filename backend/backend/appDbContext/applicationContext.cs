using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.appDbContext
{
    public class applicationContext : DbContext
    {
        public applicationContext(DbContextOptions<applicationContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogVote> BlogVotes { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<BlogHistory> BlogHistory { get; set; }
        public DbSet<CommentHistory> CommentHistory { get; set; }
        public DbSet<CommentVote> CommentVotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasMany(r => r.Users)
                .WithOne(u => u.Role)
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.User)
                .WithMany(u => u.Blogs)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<BlogVote>()
                .HasKey(bv => new { bv.UserId, bv.BlogId });

            modelBuilder.Entity<BlogVote>()
                .HasOne(bv => bv.User)
                .WithMany(u => u.BlogVotes)
                .HasForeignKey(bv => bv.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<BlogVote>()
                .HasOne(bv => bv.User)
                .WithMany(u => u.BlogVotes)
                .HasForeignKey(bv => bv.UserId);

            modelBuilder.Entity<BlogVote>()
                .HasOne(bv => bv.Blog)
                .WithMany(b => b.BlogVotes)
                .HasForeignKey(bv => bv.BlogId);


            modelBuilder.Entity<CommentVote>()
                .HasKey(cv => new { cv.UserId, cv.BlogId, cv.CommentId });

            modelBuilder.Entity<CommentVote>()
                .HasOne(cv => cv.User)
                .WithMany(u => u.CommentVotes)
                .HasForeignKey(cv => cv.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<CommentVote>()
                .HasOne(cv => cv.Blog)
                .WithMany(b => b.CommentVotes)
                .HasForeignKey(cv => cv.BlogId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<CommentVote>()
                .HasOne(cv => cv.Comment)
                .WithMany(c => c.CommentVotes)
                .HasForeignKey(cv => cv.CommentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(u => u.BlogHistory)
                .WithOne(bh => bh.User)
                .HasForeignKey(bh => bh.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BlogHistory>()
                .HasKey(bh => bh.Id);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CommentHistory)
                .WithOne(ch => ch.User)
                .HasForeignKey(ch => ch.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Blog>()
                .HasMany(u => u.CommentHistory)
                .WithOne(ch => ch.Blog)
                .HasForeignKey(ch => ch.BlogId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CommentHistory>()
                .HasKey(ch => ch.Id);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Blog)
                .WithMany(b => b.Comments)
                .HasForeignKey(c => c.BlogId);
        }
    }
}
