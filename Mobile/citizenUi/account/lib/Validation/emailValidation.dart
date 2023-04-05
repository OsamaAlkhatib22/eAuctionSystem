
import 'package:flutter/material.dart';

import '../Screens/signup.dart';
final _formKey = GlobalKey<FormState>();
final _formKey2 = GlobalKey<FormState>();
Widget emaile(){
    return Form(
      key: _formKey,
      child: Column(
         
    crossAxisAlignment: CrossAxisAlignment.start,
        children: 
       <Widget>[
      const Text(
        "البريد الالكتروني",
        style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color:Colors.black87
        ),

      ),
      const SizedBox(
        height: 5,
      ),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            controller: email,
           
        decoration: const InputDecoration(
            contentPadding: EdgeInsets.symmetric(vertical: 0,
                horizontal: 3),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(
                  color: Colors.grey
              ),

            ),
            border: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.grey)
            )
        ),
  
            validator: (value) => validateEmail(value!),
           // autovalidateMode: AutovalidateMode.onUserInteraction,
            onSaved: (value) {
              var _email = value;
            },
          ),
        ],
      ),
    );
  }

 String? validateEmail(String value) {
    String pattern =
        r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'; // email validation regex pattern
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value)) {
      return 'Please enter a valid email address';
    } else {
      return null;
    }
  }

  void _handleSignUp() {
  if (_formKey.currentState!.validate() && _formKey2.currentState!.validate()) {
    // form is valid, proceed with sign-up process
  }
}
 dynamic sendKey(){
    return _formKey;
  }
  dynamic sendKey2(){
    return _formKey2;
  }

 Widget passowrd() {
    return Form(
      key: _formKey2,
      child: Column(
         
    crossAxisAlignment: CrossAxisAlignment.start,
        children: 
       <Widget>[
      const Text(
        "كلمة المرور",
        style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color:Colors.black87
        ),

      ),
      const SizedBox(
        height: 5,
      ),
          TextFormField(
            keyboardType: TextInputType.visiblePassword,
            obscureText: true,
            controller: password,
            decoration: const InputDecoration(
            contentPadding: EdgeInsets.symmetric(vertical: 0,
                horizontal: 3),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(
                  color: Colors.grey
              ),

            ),
            border: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.grey)
            )
        ),
  
            validator: (value) => validatePassword(value!),
           // autovalidateMode: AutovalidateMode.onUserInteraction,
            onSaved: (value) {
              var _password = value;
            },
          ),
        ],
      ),
    );
  }


  String? validatePassword(String value) {
    String pattern =
       r'^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$'; // passowrd validation regex pattern
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value)) {
      return 'Please choose a strong passowrd.Try a mix of upper letters,numbers and symbols';
    } else {
      return null;
    }
  }

 
