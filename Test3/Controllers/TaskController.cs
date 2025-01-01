using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Test3.Models;

namespace Test3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public TaskController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult CreateTaskItem(TaskItem taskItem)
        {
            taskItem.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _dbContext.TaskItems.Add(taskItem);
            _dbContext.SaveChanges();
            return Ok(taskItem);
        }

        [HttpGet]
        public IActionResult GetTaskItems()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tasks = _dbContext.TaskItems.Where(t => t.UserId == userId).ToList();
            return Ok(tasks);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTaskItem(int id, TaskItem updatedTaskItem)
        {
            var taskItem = _dbContext.TaskItems.Find(id);
            if (taskItem == null) return NotFound();
            taskItem.Title = updatedTaskItem.Title;
            taskItem.Description = updatedTaskItem.Description;
            taskItem.DueDate = updatedTaskItem.DueDate;
            taskItem.Priority = updatedTaskItem.Priority;
            _dbContext.SaveChanges();
            return Ok(taskItem);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTaskItem(int id)
        {
            var taskItem = _dbContext.TaskItems.Find(id);
            if (taskItem == null) return NotFound();
            _dbContext.TaskItems.Remove(taskItem);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }

}
