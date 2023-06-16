// import 'dart:convert';
// import 'package:account/API/file_complaint_request.dart';
// import 'package:account/API/sign_in_up_request.dart';
// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'file_complaint.dart';

// class ViewComplaint extends StatefulWidget {
//   const ViewComplaint({Key? key}) : super(key: key);

//   @override
//   ViewCompaintState createState() => ViewCompaintState();
// }

// class ViewCompaintState extends State<ViewComplaint> {
//    List<Map<String, dynamic>> _complaints={"","","","",""} as List<Map<String, dynamic>>;

//   @override
//   void initState() {
//     super.initState();
//     getUserComplaints();
//   }

//   Future<void> getUserComplaints() async {
//     var baseUrl = "https://10.0.2.2:5000/api/complaints/user";

//     http.Response response = await http.get(Uri.parse(baseUrl),
//         headers: {'Authorization': 'Bearer $token2'});

//     if (response.statusCode == 200) {
//       var jsonData = json.decode(response.body) as List;
//       setState(() {
//         _complaints = jsonData.map((element) => {
//               "complaintType": element["complaintType"],
//               "privacy": element["privacy"],
//               "date": element["date"],
//               "refNum": element["refNum"]
//             }).toList();
//       });
//     } else {
//       _complaints={"","","","",""} as List<Map<String, dynamic>>;
//       throw response.statusCode;
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text("Return Data back from another page"),
//         backgroundColor: Colors.redAccent,
//       ),
//       body: SafeArea(
//         child: Align(
//           alignment: const AlignmentDirectional(-0.95, -0.8),
//           child: Column(
//             mainAxisSize: MainAxisSize.min,
//             mainAxisAlignment: MainAxisAlignment.spaceAround,
//             children: [
//               const Align(
//                 alignment: AlignmentDirectional(-0.85, 0.85),
//                 child: Text(
//                   'My complaints',
//                 ),
//               ),
//               if (_complaints != null)
//                 ListView.builder(
//                   shrinkWrap: true,
//                   itemCount: _complaints.length,
//                   itemBuilder: (context, index) {
//                     final complaint = _complaints[index];
//                     return CardView(
//                       complaints: _complaints
//                     );
//                   },
//                 ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

// Widget CardView({required  List<Map<String, dynamic>>  complaints}) {
//   return Expanded(
//     child: ListView.builder(
//       itemCount: complaints.length,
//       itemBuilder: (BuildContext context, int index) {
//         var complaint = complaints[index];
//         return Align(
//           alignment: const AlignmentDirectional(-0.9, 0),
//           child: Container(
//             width: 220,
//             height: 450,
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(50),
//               shape: BoxShape.rectangle,
//             ),
//             child: Align(
//               alignment: const AlignmentDirectional(0, -0.05),
//               child: ListView(
//                 padding: EdgeInsets.zero,
//                 scrollDirection: Axis.vertical,
//                 children: [
//                   Align(
//                     alignment: const AlignmentDirectional(-0.3, -0.45),
//                     child: Card(
//                       clipBehavior: Clip.antiAliasWithSaveLayer,
//                       // color: FlutterFlowTheme.of(context)
//                       //     .secondaryBackground,
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(20),
//                       ),
//                       child: InkWell(
//                         splashColor: Colors.transparent,
//                         focusColor: Colors.transparent,
//                         hoverColor: Colors.transparent,
//                         highlightColor: Colors.transparent,
//                         onTap: () async {},
//                         child: Column(
//                           mainAxisSize: MainAxisSize.max,
//                           children: [
//                             Align(
//                               alignment: AlignmentDirectional(-1, -0.65),
//                               child: Text(
//                                 complaints.toString(),
//                               ),
//                             ),
//                             Align(
//                               alignment: const AlignmentDirectional(-0.2, 0),
//                               child: SingleChildScrollView(
//                                 child: Column(
//                                   mainAxisSize: MainAxisSize.max,
//                                   mainAxisAlignment:
//                                       MainAxisAlignment.start,
//                                   crossAxisAlignment:
//                                       CrossAxisAlignment.start,
//                                   children: [
//                                     Row(
//                                       mainAxisSize: MainAxisSize.max,
//                                       children: const [
//                                         Text(
//                                           'Status : ',
//                                         ),
//                                         Icon(
//                                           Icons.circle,
//                                           color: Color(0xFFDD0B0B),
//                                           size: 15,
//                                         ),
//                                         Align(
//                                           alignment:
//                                               AlignmentDirectional(
//                                                   -0.95, 0.4),
//                                           child: Text(
//                                             'Pending',
//                                           ),
//                                         ),
//                                       ],
//                                     ),
//                                   ],
//                                 ),
//                               ),
//                             ),
//                           ],
//                         ),
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//             ),
//           ),
//         );
//       },
//     ),
//   );
// }
