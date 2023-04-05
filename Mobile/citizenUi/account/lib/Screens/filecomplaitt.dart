
// ignore_for_file: library_private_types_in_public_api

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';





class HomePage1 extends StatefulWidget {
  const HomePage1({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage1> {
  File? image1;
  final _picker = ImagePicker();
 

  // Implementing the image picker
  Future<void> _openImagePicker() async {
    final XFile? pickedImage =
        await _picker.pickImage(source: ImageSource.gallery);
    if (pickedImage != null) {
      setState(() {
        image1 = File(pickedImage.path);
      });
    }
  }

  //Classification items
  var items = ['Select type',"تراكم النفايات","مبعثرات حول الحاوية","مخلفات تقليم الأشجار","مطبات اسمنتية عشوائية","تجمعات المياه ","خط مياه محطم","تصدعات في الشارع","حفر في الشارع","مناهل مفقودة",'مناهل منخفضة عن مستوى الشارع', 'مناهل مرتفعة عن خط الشارع', 'شواخص إعلانية غير قانونية', ' شواخص مرورية مكسورة,محجوبة', 'انارة الشوارع التالفة',"تكسر/تصدع جدار استنادي","رسومات","الطمم"];
  String dropdownvalue = 'Select type';




//Location implemntation
  String? currentAddress;
  Position? _currentPosition;

  Future<bool> _handleLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // ignore: use_build_context_synchronously
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



      
      body: SafeArea(
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
      
            DropdownButton(
                isExpanded: true,
                value: dropdownvalue,
                
         
                // Down Arrow Icon
                icon: const Icon(Icons.keyboard_arrow_down),

                // Array list of items
                items: items.map((String items) {
                  return DropdownMenuItem(
                    value: items,
                    child: Text(items),
                  );
                }).toList(),
                
                // After selecting the desired option,it will
                // change button value to selected value
                onChanged: (String? newValue) {
                  setState(() {
                    dropdownvalue = newValue!;
                    // insertInfo(newValue);
                    _getCurrentPosition();
                  });
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
              size: 50,
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
                 _getCurrentPosition();
                  _openImagePicker();
                 
                 
                },
                child:
                  const Text('     +   Import image'),
               
              ),
            ),
          
             const SizedBox(
              height: 10,
            ),
            
               ElevatedButton(
               style: ElevatedButton.styleFrom(
                  foregroundColor: const Color.fromARGB(255, 202, 112, 105),
                  backgroundColor: Colors.white,
                  
                ),
              
                onPressed:() {}
                  
                  /*_isNextButtonEnabled==true && image1!=null && currentAddress !=null ? (){
                     _navigateToNextScreen(context);
                     }:
                  null*/
                 
               ,
                child: Row(children: const [ Text("Next",style: TextStyle(fontWeight: FontWeight.bold),textAlign:TextAlign.center ,),
                Icon(Icons.arrow_forward),],)
                
                
              ),
            
          ]),
        ),
      ),
     
    );
  }}
 




