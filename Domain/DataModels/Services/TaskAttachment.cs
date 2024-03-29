﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModels.Services
{
    [Table("TaskAttachment")]
    public class TaskAttachment
    {

        [Column("service_id")]
        [ForeignKey("Service")] 
        public int ServiceId { get; set; }
        public Service Service { get; set; }

        [Column("media_ref")]
        [Required]
        public string MediaRef { get; set; }

        [Column("FromFreeLancer")]
        public bool FromFreeLancer { get; set; }

        [Column("Comment")]
        public string Comment { get; set; }

        [Column("date_created")]
        [Required]
        public DateTime DateCreated { get; set; }

    }
}
