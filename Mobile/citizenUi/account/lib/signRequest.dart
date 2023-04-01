// ignore_for_file: file_names, avoid_print
import 'dart:convert';
import 'package:http/http.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class User {
  
 Future<void> login(String email, password) async {
   
    
    try{
      
       Response response = await post(
        Uri.parse(''),
        headers: {
          'Content-Type': 'application/json',},

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
Future<void> signup(String username,String phone,String password,
String firstName,String lastName,String email,String nationalId,String passportNumber,
String registrationNumber,String nationalIdNumber) async {
 
    try{
      
       Response response = await post(
        Uri.parse(''),
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
        "strNationalIdNumber": nationalIdNumber
        }),
        
      );

      if(response.statusCode == 200){
    
        print('Signup successfully');
       
      }
      else {
        print('Signup failed');
      }
    }catch(e){
      print(e.toString());
    }

}
}