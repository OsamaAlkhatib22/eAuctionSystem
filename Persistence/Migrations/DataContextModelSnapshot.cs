﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Complaint", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("intId"), 1L, 1);

                    b.Property<byte[]>("bytImage")
                        .HasColumnType("varbinary(max)")
                        .HasColumnName("IMAGE");

                    b.Property<decimal>("decLat")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LAT");

                    b.Property<decimal>("decLng")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LNG");

                    b.Property<DateTime>("dtmSubmissionDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("intType")
                        .HasColumnType("int")
                        .HasColumnName("TYPE");

                    b.Property<int>("intUserID")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<string>("strAddress")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ADDRESS");

                    b.Property<string>("strCategory")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("CLASSIFICATION");

                    b.HasKey("intId");

                    b.ToTable("Complaints");
                });
#pragma warning restore 612, 618
        }
    }
}
