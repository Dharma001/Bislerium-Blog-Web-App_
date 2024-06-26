﻿namespace backend.Models.Requests.Users
{
    public class UserWithRole
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RoleName { get; set; }
        public bool Status { get; set; }
    }
}
