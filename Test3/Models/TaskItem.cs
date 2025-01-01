﻿namespace Test3.Models
{
    public class TaskItem
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Priority { get; set; }
        public string? UserId { get; set; } // Relation to User
    }

}
