// ignore_for_file: avoid_print, unused_local_variable

import 'dart:convert';
import 'dart:io';
import 'package:account/API/sign_in_up_request.dart';
import 'package:http/http.dart' as http;

class Complaint {

  Future<void> fileComplaint(
    int intTypeId,
    List<File> lstMedia,
    double decLat,
    double decLng,
    String strComment,
  ) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('https://10.0.2.2:5000/api/complaints'),
      );

      // Add the request headers
      request.headers['Authorization'] = 'Bearer $token2';
      request.headers['Content-Type'] = 'multipart/form-data';

      // Add the request fields
      request.fields['intTypeId'] = intTypeId.toString();
      request.fields['decLat'] = decLat.toString();
      request.fields['decLng'] = decLng.toString();
      request.fields['strComment'] = strComment;

      // Add the files
      for (var i = 0; i < lstMedia.length; i++) {
        var file = lstMedia[i];
        var stream = http.ByteStream(file.openRead());
        var length = await file.length();
        var multipartFile = http.MultipartFile(
          'lstMedia',
          stream,
          length,
          filename: file.path.split('/').last,
        );
        request.files.add(multipartFile);
      }

      // Send the request
      final response = await request.send();

      // Get the response body
      final responseJson = await response.stream.bytesToString();

      // Print the response
      print(responseJson);
      print(response.headers);
      print(response.reasonPhrase);
      print(response.statusCode);

      if (response.statusCode == 200) {
        Map<String, dynamic> jsonResponse = jsonDecode(responseJson);
        print(responseJson);
        print('Complaint assigned successfully.');
      } else {
        print('failed');
      }
    } catch (e) {
      print('Error: $e');
    }
  }
}