
// ignore_for_file: library_private_types_in_public_api

import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import '../API/signRequest.dart';
import 'package:account/Screens/fileComplaintSub';




class HomePage1 extends StatefulWidget {
  const HomePage1( {Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage1> {
  //File? image1;
  List<File> selectedImages = [];
  final _picker = ImagePicker();
  TextEditingController textArea = TextEditingController();
  String? dropdownvalue;
 

  // Implementing the image picker
  Future getImages() async {

    final pickedFile = await _picker.pickMultiImage(
        imageQuality: 50, 
     // maxHeight: 1000, // To set maxheight of images that you want in your app
     // maxWidth: 1000
      ); 
    List<XFile> xfilePick = pickedFile;
 
         // if atleast 1 images is selected it will add
        // all images in selectedImages
        // variable so that we can easily show them in UI
        if (xfilePick.isNotEmpty) {
          for (var i = 0; i < xfilePick.length; i++) {
            
            selectedImages.add(File(xfilePick[i].path));
          }
           setState(
      () {  },
    );
    print(selectedImages.length);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Nothing is selected')));
        }
  }

//fetch classification
 Future<List<Map<String, dynamic>>> getAllCategory() async {
   HttpOverrides.global = MyHttpOverrides();
   
  var baseUrl = "https://10.0.2.2:5000/api/complaints/types";
  http.Response response = await http.get(Uri.parse(baseUrl),
   headers: {
          'Authorization': 'Bearer $token2',
        }
  );


  if (response.statusCode == 200) {
    var jsonData = json.decode(response.body) as List;
    return jsonData.map((element) => {
      "intId": element["intId"],
      "strNameAr": element["strNameAr"],
      "strNameEn": element["strNameEn"]
    }).toList();
  } else {
    throw response.statusCode;
  }
}



//Location implemntation
  String? currentAddress;
  Position? _currentPosition;

  Future<bool> _handleLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
              'Location services are disabled. Please enable the services')));
      return false;
    }
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // ignore: use_build_context_synchronously
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Location permissions are denied')));
        return false;
      }
    }
    if (permission == LocationPermission.deniedForever) {
      // ignore: use_build_context_synchronously
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
              'Location permissions are permanently denied, we cannot request permissions.')));
      return false;
    }
    return true;
  }

  Future<void> _getCurrentPosition() async {
    final hasPermission = await _handleLocationPermission();

    if (!hasPermission) return;
    await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
        .then((Position position) {
      setState(() => _currentPosition = position);
      _getAddressFromLatLng(_currentPosition!);
    }).catchError((e) {
      debugPrint(e);
    });
  }

  Future<void> _getAddressFromLatLng(Position position) async {
    await placemarkFromCoordinates(
            _currentPosition!.latitude, _currentPosition!.longitude)
        .then((List<Placemark> placemarks) {
      Placemark place = placemarks[0];
      setState(() {
        currentAddress =
            '${place.street}, ${place.subLocality}, ${place.subAdministrativeArea}, ${place.postalCode}';
      });
    }).catchError((e) {
      debugPrint(e);
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 207, 207, 207),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 216, 90, 81),
        shape: BeveledRectangleBorder(borderRadius: BorderRadius.circular(5)),
        title: const Text(
          'Complaint details',
          textAlign: TextAlign.center,
          style: TextStyle(fontWeight: FontWeight.normal),
          textDirection: TextDirection.rtl,
        ),
      ),



      
       body:  SingleChildScrollView(
        child:SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(children: [
            
             const SizedBox(height:20),
            Row(children: const [
            Icon(Icons.flag_circle,color: Colors.red,),
            Text("Complaint type",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 20),)
            ],),
            const SizedBox(height:5),
            const Text("   Choose type of complaint that you want to report",style: TextStyle(fontSize: 12,color: Color.fromARGB(255, 167, 167, 167)),),
           const SizedBox(height:20),
           
          
          FutureBuilder<List<Map<String, dynamic>>>(
          future: getAllCategory(),
          builder: (context, snapshot) {
          if (snapshot.hasData) {
         var data = snapshot.data!;
         return DropdownButton(
        value: dropdownvalue ?? data[0]["strNameEn"],
        icon: const Icon(Icons.keyboard_arrow_down),
        items: data.map((item) {
          return DropdownMenuItem(
            value: item["strNameEn"],
            child: Text(item["strNameEn"]),
          );
        }).toList(),
        onChanged: (newValue) {
          setState(() {
            dropdownvalue = newValue as String?;
          });
        },
      );
    } else {
      return const CircularProgressIndicator();
    }
  },
),
            
          
             const SizedBox(height:30,),
             Row(children: const [
            Icon(Icons.info_outline,color: Colors.red,),
            Text("Complaint Information",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 18),)
            ],),
            const Text("Enable your location and import an image",style: TextStyle(fontWeight:FontWeight.w300,fontSize: 12),),
            const SizedBox(height:20),


            const Icon(
              Icons.camera_alt_outlined,
              size: 5,
              color: Color.fromARGB(255, 146, 145, 145),
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'Please make sure the photo \n  clearly shows the issue.',
              style: TextStyle(color: Colors.grey,fontSize: 15),
            ),
            const SizedBox(
              height: 10,
            ),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  foregroundColor: const Color.fromARGB(255, 202, 112, 105),
                  backgroundColor: Colors.white,
                ),
                onPressed: () {
                // _getCurrentPosition();
                if(selectedImages.length<=3){
                getImages();
                }
                else{
                   ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('you can only 3 images capture')));

                }
                 
                },
                child:
                  const Text('     +   Import image'),
               
              ),
            ),
          
             const SizedBox(
              height: 10,
            ),

             TextField(
              controller: textArea,
               decoration: const InputDecoration( 
                         hintText: "add addtional information",
                         focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(width: 1, color: Colors.redAccent)
                         )
                      ),
            keyboardType: TextInputType.multiline,
            maxLines: 1 
            ),
           
               ElevatedButton(
               style: ElevatedButton.styleFrom(
                  foregroundColor: const Color.fromARGB(255, 202, 112, 105),
                  backgroundColor: Colors.white,
                  
                ),
              
                onPressed:() {
               Navigator.of(context).push(MaterialPageRoute(builder: (context) => SubmissionPage(currentPosition: _currentPosition,
                currentAddress: currentAddress,dropdownvalue: dropdownvalue!,)));
                  
                },
                  
                  
                 
               
                child: Row(children: const [ Text("Next",style: TextStyle(fontWeight: FontWeight.bold),textAlign:TextAlign.center ,),
                Icon(Icons.arrow_forward),],)
                
                
              ),
            
          ]),
        ),
      ),
     
    ));
  }
  
  
  }
 
class MyHttpOverrides extends HttpOverrides{
  @override
  HttpClient createHttpClient(SecurityContext? context){
    return super.createHttpClient(context)
      ..badCertificateCallback = (X509Certificate cert, String host, int port)=> true;
  }
}














