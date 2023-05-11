
// ignore_for_file: depend_on_referenced_packages, implementation_imports, no_logic_in_create_state, unnecessary_null_comparison

import 'dart:io';
import 'package:account/API/file_complaint_request.dart';
import 'package:flutter/material.dart';
import 'package:geolocator_platform_interface/src/models/position.dart';
import 'package:intl/intl.dart';
import 'package:account/Screens/file_complaint.dart';
import 'file_complaint.dart';



final now = DateTime.now();

class SubmissionPage extends StatefulWidget {
  final File? image1;
  final DropDownValue dropdownvalue;
  final String? currentAddress;
  final Position? currentPosition;
  final String? comment;
  final  List<File> selectedImages ;
  
  
 
   const SubmissionPage(
      {super.key,
      this.image1,
      required this.dropdownvalue,
      required this.currentAddress,this.currentPosition,required this.comment,required this.selectedImages});
      


  @override
  State<SubmissionPage> createState() =>
      _SubmissionPageState(image1, dropdownvalue, currentAddress,currentPosition,comment,selectedImages);
}


class _SubmissionPageState extends State<SubmissionPage> {
  File? image1;
  DropDownValue dropdownvalue;
  String? currentAddress;
  Position ? currentPosition;
  String ?comment;
 final  List<File> selectedImages;

  _SubmissionPageState(this.image1, this.dropdownvalue, this.currentAddress, this.currentPosition,this.comment,this.selectedImages);
  String formatter = DateFormat('d-M-y').format(now);




  show() {
    
  
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Submission'),
          content: const Text('Your complaint was submitted successfully!'),
          actions: [
            TextButton(
              onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (context) => const HomePage1()));
              },
              child: const Text(
                'Home',
                style: TextStyle(color: Color.fromARGB(255, 176, 63, 63)),
              ),
            ),
          ],
        );
      },
    );
  }




  @override
  Widget build(BuildContext context) {
  
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 230, 227, 227),
        appBar: AppBar(
          title: const Text(
            "Submission",
            textAlign: TextAlign.center,
          ),
          backgroundColor: const Color.fromARGB(255, 176, 63, 63),
        ),
        body: SafeArea(
          child: Column(children: [
            const SizedBox(height: 40),
            Card(
              elevation: 10,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)),
              child: Column(children: [
                const SizedBox(
                  height: 20,
                  width: 50,
                ),
                
                 
                  const Text("Picked Files:"),
                  const Divider(),

                  selectedImages != null?Wrap(
                     children: selectedImages.map((imageone){
                        return Card( 
                           child: SizedBox(
                              height: 100, width:100,
                              child: Image.file(File(imageone.path)),
                           ),
                        );
                     }).toList(),
                  ):Container()
               ],
             ),
            ),

                const SizedBox(height: 30),
                Row(
                  children: [
                    const Icon(
                      Icons.report_problem_outlined,
                      color: Color.fromARGB(255, 186, 172, 42),
                    ),
                    Text(
                      'Complaint type:${dropdownvalue.stringName}',
                      textAlign: TextAlign.start,
                    ),
                  ],
                ),

                Row(
                  children: [
                    const Icon(
                      Icons.location_on_sharp,
                      color: Colors.red,
                    ),
                    Text(
                      '$currentAddress ',
                      softWrap: true,
                    ),
                  ],
                ),
                Row(
                  children: [
                    const Icon(
                      Icons.calendar_month_outlined,
                      color: Colors.red,
                    ),
                    Text('Complaint date : $formatter'),
                  ],
                ),

              

                const SizedBox(height: 20),
             
            
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                foregroundColor: const Color.fromARGB(255, 202, 112, 105),
                backgroundColor: Colors.white,
              ),
              onPressed: () {
                Complaint complaint=Complaint();
                complaint.fileComplaint(dropdownvalue.intID,selectedImages,currentPosition?.latitude as double,currentPosition?.longitude as double,comment!);
                show();
            

                           
            
              },
              child: const Text("submit"),
            ), ]),));
    
        
  }
}


