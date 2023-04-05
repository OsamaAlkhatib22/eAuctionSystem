// ignore_for_file: file_names, avoid_print
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

class User {
  
 Future<void> login(String email, password) async {
   
 

    try{
       HttpOverrides.global = new MyHttpOverrides();
       Response response = await post(
        Uri.parse('https://10.0.2.2:5000/api/account/login/'),
       
      headers: <String, String> {
         "Content-type": "application/json",
          "Accept": "application/json",

      },

        body:jsonEncode({
         "strLogin": email,
        "strPassword": password
        }),
        
      );
      

      if(response.statusCode == 200){
       
       final token = jsonDecode(response.body)['token'];
        print(token);
        print('Login successfully');

         // Save the token in shared preferences
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);
        
        final userData =await fetchUserData(token);
        print(userData);

      }
      else {
        print('Login failed');
      }
    }catch(e){
      print(e.toString());
    }
 }

 // allowing subsequent authentication
  Future<Map<String, dynamic>> fetchUserData(String token) async {
    try {
      final response = await http.get(
        Uri.parse(''),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );
     
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        return data;
      
      } else {
         throw Exception('Failed to fetch user data');
      }
    } catch (e) {
       throw Exception(e.toString());
    }

}
void signup(String username,String phone,String password,
String firstName,String lastName,String email,String  nationalId,String passportNumber,
String registrationNumber,String nationalIdNumber) async {

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
        "strPhonenumber": phone,
        "strPassword": password,
        "strFirstName": firstName,
        "strLastName": lastName,
        "strEmail": email,
        "strNationalId": nationalId,
        "strPassportNumber": passportNumber,
        "strRegistrationNumber": registrationNumber,
        "strNationalIdNumber": nationalIdNumber,
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
    var Fname = jsonResponse['strFirstName'];
    var Lname = jsonResponse['strLastName'];
    print('Signup successful. Welcome, $Fname $Lname!');

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