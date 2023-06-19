// ignore_for_file: library_private_types_in_public_api, deprecated_member_use

import 'package:flutter/material.dart';
import 'package:account/API/edit_user_info_request.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({super.key});

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

  TextEditingController newUsername = TextEditingController();
  TextEditingController newEmail = TextEditingController();
  TextEditingController newPhone = TextEditingController();
  TextEditingController newLocation = TextEditingController();
  TextEditingController newPassword = TextEditingController();



class _EditProfilePageState extends State<EditProfilePage> {
  bool showPassword = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.green,
          ),
          onPressed: () {},
        ),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.green,
            ),
            onPressed: () {
             // Navigator.of(context).push(MaterialPageRoute(
                //  builder: (BuildContext context) => SettingsPage()));
            },
          ),
        ],
      ),
      body: Container(
        padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              const Text(
                "Edit Profile",
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
              ),
             
              Center(
                child: Stack(
                  children: [
                    
                    Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              width: 4,
                              color: Theme.of(context).scaffoldBackgroundColor,
                            ),
                            color: Colors.green,
                          ),
                          child: const Icon(
                            Icons.edit,
                            color: Colors.white,
                          ),
                        )),
                  ],
                ),
              ),
              const SizedBox(
                height: 35,
              ),
              buildTextField("Username", "Dor Alex", false,newUsername),
              buildTextField("E-mail", "alexd@gmail.com", false,newEmail),
              buildTextField("Phone Number", "0778619015", false,newPhone),
              buildTextField("Password", "********", true,newPassword),
              buildTextField("Location", "Amman-Jordan", false,newLocation),
             
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                 OutlinedButton(
  onPressed: () {},
  style: OutlinedButton.styleFrom(
    padding: const EdgeInsets.symmetric(horizontal: 50),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
  ),
  child: const Text(
    "CANCEL",
    style: TextStyle(fontSize: 14, letterSpacing: 2.2, color: Colors.black),
  ),
),
                 ElevatedButton(
      onPressed: () {
        EditInfo edit=EditInfo();
        edit.updateAccount(newUsername.text, newEmail.text, newPassword.text, newPhone.text, newLocation.text);

      },
      style: ElevatedButton.styleFrom(primary: Colors.green),
     // padding: const EdgeInsets.symmetric(horizontal: 50),
      child: const Text(
        "SAVE",
        style: TextStyle(fontSize: 14, letterSpacing: 2.2, color: Colors.white),
      ),
    ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(
      String labelText, String placeholder, bool isPasswordTextField,var _editController) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 35.0),
      child: TextField(
        controller: _editController,
        obscureText: isPasswordTextField ? showPassword : false,
        decoration: InputDecoration(
            suffixIcon: isPasswordTextField
                ? IconButton(
                    onPressed: () {
                      setState(() {
                        showPassword = !showPassword;
                      });
                    },
                    icon: const Icon(
                      Icons.remove_red_eye,
                      color: Colors.grey,
                    ),
                  )
                : null,
            contentPadding: const EdgeInsets.only(bottom: 3),
            labelText: labelText,
            floatingLabelBehavior: FloatingLabelBehavior.always,
            hintText: placeholder,
            hintStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            )),
      ),
    );
  }
}