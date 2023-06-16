// // ignore_for_file: camel_case_types

// import 'package:account/Screens/view_complaint.dart';
// import 'package:flutter/material.dart';

// import 'file_complaint.dart';  
  
  
// class firstPage extends StatefulWidget {
//   const firstPage({super.key});
  
//   @override  
//   // ignore: library_private_types_in_public_api
//   _MyAppState createState() => _MyAppState();  
// }  
  
// class _MyAppState extends State<firstPage> {  
//   @override  
//   Widget build(BuildContext context) {  
//     return MaterialApp(  
//       home: Scaffold(  
//           appBar: AppBar(  
//             title: Text('Starting Page'),  
//           ),  
//           body: Center(child: Column(children: <Widget>[  
//             Container(  
//               margin: EdgeInsets.all(25),  
//               child: ElevatedButton(  
//                 child: Text('File a Complaint', style: TextStyle(fontSize: 20.0),),  
//                 onPressed: () {
//                    Navigator.push(context,
//                           MaterialPageRoute(builder: (context) => HomePage1()));
//                 },  
//               ),  
//             ),  
//             Container(  
//               margin: EdgeInsets.all(25),  
//               child: ElevatedButton(  
//                 child: Text('View my comaplints', style: TextStyle(fontSize: 20.0),),  
                
//                 onPressed: () {
//                   ViewCompaintState a = ViewCompaintState();
//                   a.getUserComplaints();
//                    Navigator.push(context,
//                           MaterialPageRoute(builder: (context) => ViewComplaint()));
//                 },
                  
//               ),  
//             ),  

//              Container(  
//               margin: EdgeInsets.all(25),  
//               child: FloatingActionButton(  
//                 child: Icon(Icons.skip_previous),
//                 onPressed: () {
//                    Navigator.pop(context,
//                           MaterialPageRoute(builder: (context) => HomePage1()));
//                 },
                  
//               ),  
//             ),  
//           ]  
//          ))  
//       ),  
//     );  
//   }  
// }  