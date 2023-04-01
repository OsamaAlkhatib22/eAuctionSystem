 import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
final _formKey = GlobalKey<FormState>();
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
  if (_formKey.currentState!.validate()) {
    // form is valid, proceed with sign-up process
  }
}
 dynamic sendKey(){
    return _formKey;
  }

