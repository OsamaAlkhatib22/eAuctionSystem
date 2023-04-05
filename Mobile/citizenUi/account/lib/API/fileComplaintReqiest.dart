// ignore_for_file: file_names, avoid_print
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart';


class User {
  
 Future<void> Filecomplaint(String email, password) async {
   
    try{
      
       Response response = await post(
        Uri.parse('https://10.0.2.2:5000/api/account/login/'),
       
      headers: <String, String> {
         "Content-type": "application/json",
          "Accept": "application/json",

      },

        body:jsonEncode({
        {
        "intTypeId": 0,
        "lstMedia": File,
        "decLat": 0.0,
        "decLng": 0.0,
        "strComment": "String",
}
        }),
        
      );
      if(response.statusCode == 200){
       
       final token = jsonDecode(response.body)[''];

       
        print(token);
        print('Login successfully');
      }
      else {
        print('Login failed');
      }
    }catch(e){
      print(e.toString());
    }
 }
}

