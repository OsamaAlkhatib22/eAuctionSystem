// ignore_for_file: avoid_print, unused_local_variable

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

import 'login_request.dart';

class Complaint {
  Future<void> fileComplaint(
    int intTypeId,
    int intPrivacyId,
    List<MediaFile> lstMedia,
    String strComment,
    double decLat,
    double decLng,
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
      request.fields['intPrivacyId'] = intPrivacyId.toString();
      request.fields['strComment'] = strComment;

      // Add the files
      for (var mediaFile in lstMedia) {
        var stream = http.ByteStream(mediaFile.file.openRead());
        var length = await mediaFile.file.length();
        var multipartFile = http.MultipartFile(
          'lstMedia',
          stream,
          length,
          filename: mediaFile.file.path.split('/').last,
        );
        request.files.add(multipartFile);
        request.fields['decLat'] = mediaFile.decLat.toString();
        request.fields['decLng'] = mediaFile.decLng.toString();
        request.fields['blnIsVideo'] = mediaFile.blnIsVideo.toString();
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

class MediaFile {
  final File file;
  final double decLat;
  final double decLng;
  final bool blnIsVideo;

  MediaFile(this.file, this.decLat, this.decLng, this.blnIsVideo);
}