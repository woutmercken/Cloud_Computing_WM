#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BucketList.Models;

namespace BucketList.Controllers
{
    [Route("api/BucketItems")]
    [ApiController]
    public class BucketItemsController : ControllerBase
    {
        private readonly BucketContext _context;

        public BucketItemsController(BucketContext context)
        {
            _context = context;
        }

        // GET: api/BucketItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BucketItem>>> GetTodoItems()
        {
            return await _context.BucketItems.ToListAsync();
        }

        // GET: api/BucketItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BucketItem>> GetBucketItem(long id)
        {
            var bucketItem = await _context.BucketItems.FindAsync(id);

            if (bucketItem == null)
            {
                return NotFound();
            }

            return bucketItem;
        }

        // PUT: api/BucketItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBucketItem(long id, BucketItem bucketItem)
        {
            if (id != bucketItem.id)
            {
                return BadRequest();
            }

            _context.Entry(bucketItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BucketItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BucketItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BucketItem>> PostBucketItem(BucketItem bucketItem)
        {
            _context.BucketItems.Add(bucketItem);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetBucketItem", new { id = bucketItem.id }, bucketItem);
            return CreatedAtAction(nameof(GetBucketItem), new { id = bucketItem.id }, bucketItem);
        }

        // DELETE: api/BucketItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBucketItem(long id)
        {
            var bucketItem = await _context.BucketItems.FindAsync(id);
            if (bucketItem == null)
            {
                return NotFound();
            }

            _context.BucketItems.Remove(bucketItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BucketItemExists(long id)
        {
            return _context.BucketItems.Any(e => e.id == id);
        }
    }
}
