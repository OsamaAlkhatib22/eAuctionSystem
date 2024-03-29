# eAuction Project Setup Guide

## Prerequisites

Before setting up the eAuction project, make sure you have the following tools installed on your machine:

- [Visual Studio](https://visualstudio.microsoft.com/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/downloads/)

## Backend Setup (ASP.NET)

1. Open the eAuction solution in Visual Studio.

2. Ensure that the target framework is set to `net6.0` in the `eAuction.csproj` file.

    ```xml
    <PropertyGroup>
      <TargetFramework>net6.0</TargetFramework>
      <!-- ... -->
    </PropertyGroup>
    ```

3. Install the required NuGet packages specified in the `eAuction.csproj` file.

    ```xml
    <ItemGroup>
      <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="6.0.15" />
      <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.4">
        <!-- ... -->
      </PackageReference>
      <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
      <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="6.27.0" />
    </ItemGroup>
    ```

4. If you're using Entity Framework, set up the database connection string in the `appsettings.json` file.

5. Run the following commands in the Package Manager Console to apply migrations and update the database:

    ```bash
    Update-Database
    ```

## Frontend Setup (React)

1. Open the `client` folder in Visual Studio Code.

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

## Testing APIs with Postman

1. Open Postman and import the provided Postman collection.

2. Test the APIs by sending requests to the specified endpoints.

## Project Overview

### Introduction

Learn about the freelancing domain and the need for eAuction.

### Problem Statement

Understand the challenges faced by freelancers and clients in existing platforms.

### Objectives

Explore the specific goals of the eAuction project, including user registration, dynamic bidding, enhanced transaction processing, wallet functionality, notification system, and a user-friendly interface.

### Overview of Technologies

Get insights into the backend (.NET, MySQL) and frontend (React, JavaScript) technologies chosen for the project. Understand the rationale behind technology selection.

By following these instructions, you should be able to set up and run the eAuction project locally for development and testing purposes.
