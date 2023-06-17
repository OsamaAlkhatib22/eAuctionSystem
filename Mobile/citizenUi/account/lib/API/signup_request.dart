
// ignore_for_file: avoid_print, unused_local_variable

import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';

import '../Screens/login.dart';


class UserSignup{


void signup(String username,String phone,String password,
String firstName,String lastName,String email,String  nationalId,String passportNumber,
String registrationNumber,String nationalIdNumber,BuildContext context) async {

  print(username + phone  + password + email +nationalId + firstName + lastName +nationalIdNumber  );

  
    try{
      HttpOverrides.global = MyHttpOverrides();
      registrationNumber='666/555';
      //nationalIdNumber=  'ABC12345';
     
      
       Response response = await  http.post(
        
        Uri.parse('https://10.0.2.2:5000/api/account/register/'),
        headers: {
          'Content-Type': 'application/json',},
          

        body:jsonEncode({
        
        "strUsername": username,
        "strPhonenumber": "0795820003",
        "strPassword": password,
        "strFirstName": "ruba",
        "strLastName": lastName,
        "strEmail": "rubaabu@yahoo.com",
        "strNationalId": nationalId,
        "strPassportNumber": passportNumber,
        "strRegistrationNumber": registrationNumber,
        "strNationalIdNumber": "BBB00000",
        }),
      
      );
   print(response.body);
   print(response.headers );
   print(response.reasonPhrase);
    print(response.statusCode);
    if (response.statusCode == 200) {
    Map<String, dynamic> jsonResponse = jsonDecode(response.body);
    print(response.body);

    var userName = jsonResponse['strUserName'];
    var token1 = jsonResponse['strToken'];
    var fName = jsonResponse['strFirstName'];
    var lName = jsonResponse['strLastName'];
    print('Signup successful. Welcome, $fName $lName!');
     Navigator.push(context,MaterialPageRoute(builder: (context) => XDLogin()),);

  } else {
    print('Signup failed. Status code: ${response.statusCode}');
  }
} catch (e) {
  print('Error occurred while registering: $e');
}

}
}



class MyHttpOverrides extends HttpOverrides{
  @override
  HttpClient createHttpClient(SecurityContext? context){
    return super.createHttpClient(context)
      ..badCertificateCallback = (X509Certificate cert, String host, int port)=> true;
  }
}