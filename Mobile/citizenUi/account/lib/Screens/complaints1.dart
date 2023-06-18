// ignore_for_file: depend_on_referenced_packages, constant_identifier_names, unused_element, unnecessary_null_comparison, library_private_types_in_public_api

import 'dart:convert';
import 'dart:io';

import 'package:account/Screens/public_feed.dart';
import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';
import 'package:adobe_xd/page_link.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import '../API/login_request.dart';
import 'complaints2.dart';
import 'package:http/http.dart' as http;
  List<File> selectedImages = [];
  late DropDownValue dropdown=DropDownValue(1, "");
  TextEditingController commentController = TextEditingController();

class XDComplaints1 extends StatefulWidget {
  const XDComplaints1({super.key});

 
  @override
   _XDComplaints1State createState() => _XDComplaints1State();

 }
 class _XDComplaints1State extends State<XDComplaints1> {

  final _picker = ImagePicker();

  //drop down List

  late int intType;
  List<DropDownValue> items = [];
  late Future<List<Map<String, dynamic>>>_futureData;
  String language="strNameAr";


@override
void initState() {
   WidgetsBinding.instance.addPostFrameCallback((_) {
    getImages(context);
  });
  super.initState();
    _futureData=getAllCategory();
   _initializeData();
 
}

  void _initializeData() async {
  final data = await getAllCategory();
  setState(() {
    items = data.map((item) => DropDownValue(item["intId"], item[language])).toList();
    dropdown = items[0];
  });
}


//fetch classification
 Future<List<Map<String, dynamic>>> getAllCategory() async {
   
   
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


Future<void> getImages(BuildContext context) async {
  final pickedFile = await _picker.pickImage(source: ImageSource.camera, imageQuality: 50);

  if (pickedFile != null) {
    selectedImages.add(File(pickedFile.path));
    setState(() {});
    print(selectedImages.length);
  } else {
    Navigator.pop(context,MaterialPageRoute(builder: (context) =>  XDPublicFeed1()));
    // ScaffoldMessenger.of(context).showSnackBar(
    //   const SnackBar(content: Text('Nothing is selected')),);
    
  }
}


  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      
      backgroundColor: const Color(0xffffffff),
      body: Stack(
        children: <Widget>[
          Pinned.fromPins(
            //plus sign
            Pin(start: 23.0, end: 23.0),
            Pin(size: 90.0, middle: 0.5650),
            child: Stack(
              children: <Widget>[

            // DropdownButton(),
                 FutureBuilder<List<Map<String, dynamic>>>(
          //move getAllCategory on page load
           future: _futureData,
          builder: (context, snapshot) {
          if (snapshot.hasData) {
         var data = snapshot.data!;
         var items =  data.map((item) {
          return DropdownMenuItem(
            value:  DropDownValue(item["intId"], item[language]) ,
            child: Text(item[language]),
          );
        }).toList();

      
      // dropdown=items[0].value!;
       dropdown=items[dropdown.intID-1].value!;

         return DropdownButton(
       
        value:dropdown ,
        icon: const Icon(Icons.keyboard_arrow_down),
        items:items,
        onChanged: (newValue) {
          setState(() {
            dropdown= newValue!;
            print(dropdown.intID );
            print(dropdown.stringName );
           
          });
        },

      );
    } else {
      return const CircularProgressIndicator();
    }
  },
),
                Pinned.fromPins(
                  Pin(size: 144.0, start: 3.0),
                  Pin(size: 21.0, start: 0.0),
                  child: const Text(
                    'Type of Complaint',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 15,
                      color: Color(0xff6f407d),
                    ),
                  ),
                ),
                
                
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 23.0, end: 23.0),
            Pin(size: 167.3, middle: 0.8800),
            child: Stack(
              children: <Widget>[
               Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 24.0, 0.0, 0.0),child:
                TextFormField( 
                
                 controller: commentController,
              
                decoration: InputDecoration(
                filled: true,
               fillColor: Colors.white,
               contentPadding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
               border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
             borderSide: BorderSide(
             width: 1,
             color: Color(0xff6f407d),
             ),
            ),
           enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(6),
          borderSide: BorderSide(
        width: 1,
        color:  Color(0xff6f407d),
         ),
        ),
       focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(6),
      borderSide: const BorderSide(
        width: 1,
        color: Color(0xff6f407d),
      ),
    ),
  )
),
                ),

                Pinned.fromPins(
                  Pin(size: 87.0, start: 3.0),
                  Pin(size: 21.0, start: 0.0),
                  child: const Text(
                    'Comments',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 15,
                      color: Color(0xff6f407d),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Pinned.fromPins(
            Pin(start: 63.0, end: 62.0),
            Pin(size: 71.0, end: 20.0),
            child:
                // Adobe XD layer: 'Next Button' (group)
                InkWell(
              
                onTap:(){
                Navigator.push(context,MaterialPageRoute(builder: (context) => XDComplaints2()),);
                },
                
              
              child: Stack(
                children: <Widget>[
                  // Adobe XD layer: 'Next' (shape)
                  Container(
                    decoration: BoxDecoration(
                      color: const Color(0xff2a0340),
                      borderRadius: BorderRadius.circular(20.0),
                      border: Border.all(
                          width: 1.0, color: const Color(0xff707070)),
                    ),
                  ),
                  Pinned.fromPins(
                    Pin(size: 69.0, middle: 0.5),
                    Pin(start: 16.0, end: 15.0),
                    child: const Text(
                      'Next',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 30,
                        color: Color(0xffffffff),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
              ],
              ),
            ),
          ),
          //purple container
          Pinned.fromPins(
            Pin(start: -63.4, end: -145.3),
            Pin(size: 400.3, start: -91.2),
            child:
                // Adobe XD layer: 'Action Bar' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(size: 477.0, end: 0.0),
                  Pin(start: 27.4, end: 0.0),
                  child: SvgPicture.string(
                    _svg_rzpvul,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 477.0, start: 0.0),
                  Pin(start: 27.4, end: 0.0),
                  child: SvgPicture.string(
                    _svg_fypls,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 432.0, start: 60.8),
                  Pin(start: 0.0, end: 35.1),
                  child: SvgPicture.string(
                    _svg_okdldq,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 33.6, middle: 0.6200),
                  Pin(size: 31.3, end: 55.8),
                  child:
                  InkWell(
                  child:  Icon(Icons.add,
                    color: Colors.white,
                    size: 45,),

                    onTap: () {
                      if(selectedImages.length<=2){
                        getImages(context);
                      }
                     else{
                      ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('you can only 3 images capture')));

                }
                    },

                  )
                    // Adobe XD layer: 'FillComplaintIcon' (group)
                   
                ),
              ],
            ),
          ),
          
          
          Pinned.fromPins(
            Pin(size: 21.9, start: 23.0),
            Pin(size: 36.6, start: 49.1),
            child:
              
                // Adobe XD layer: 'BackIcon' (shape)
                PageLink(
              links: [
                PageLinkInfo(
                  duration: 0,
                  pageBuilder: () => XDPublicFeed1(),
                ),
              ],
              child:
                // Adobe XD layer: 'BackIcon' (shape)
                SvgPicture.string(
              _svg_u5a7dw,
              allowDrawingOutsideViewBox: true,
              fit: BoxFit.fill,
            ),
          )),
         
      Align(
  alignment: const Alignment(-0.561, -0.286),
  child: Column(
    children: [
      SizedBox(height: 120),
      Wrap(
        spacing: 13, 
        children: [
          if (selectedImages != null)
            ...selectedImages.map((imageone) {
              return Container(
                width:80,
                height: 80,
                child: Image.file(
                  File(imageone.path),
                  fit: BoxFit.cover,
                ),
              );
            }).toList(),
        ],
      ),
    ],
  ),
),


          Align(
            alignment: const Alignment(-0.251, -0.287),
            child:
                // Adobe XD layer: 'photo' (shape)
                Container(
              width: 48.0,
              height: 48.0,
              decoration: const BoxDecoration(
               
              ),
            ),
          ),
          Align(
            alignment: const Alignment(0.068, -0.286),
            child:
                // Adobe XD layer: 'photo' (shape)
                Container(
              width: 50.0,
              height: 50.0,
              decoration: const BoxDecoration(
                
              ),
            ),
          ),
         
        ],
      ),
    );
  }
}

const String _svg_heebsv =
    '<svg viewBox="23.0 300.0 384.0 66.0" ><path transform="translate(23.0, 300.0)" d="M 10 0 L 374 0 C 379.5228576660156 0 384 4.477152347564697 384 10 L 384 56 C 384 61.52284622192383 379.5228576660156 66 374 66 L 10 66 C 4.477152347564697 66 0 61.52284622192383 0 56 L 0 10 C 0 4.477152347564697 4.477152347564697 0 10 0 Z" fill="#ffffff" stroke="#6f407d" stroke-width="1" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_mvbn2e =
    '<svg viewBox="74.5 300.5 1.0 65.0" ><path transform="translate(74.5, 300.5)" d="M 0 0 L 0 65" fill="none" stroke="#6f407d" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_sp2zzo =
    '<svg viewBox="358.0 326.0 27.0 14.0" ><path transform="matrix(-1.0, 0.0, 0.0, -1.0, 385.0, 340.0)" d="M 13.49999904632568 0 L 27 14 L 0 14 Z" fill="#6f407d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_bs1q1u =
    '<svg viewBox="23.0 300.0 384.0 143.3" ><path transform="translate(23.0, 300.0)" d="M 10 0 L 374 0 C 379.5228576660156 0 384 9.723049163818359 384 21.71703720092773 L 384 121.6154174804688 C 384 133.6094055175781 379.5228576660156 143.3324584960938 374 143.3324584960938 L 10 143.3324584960938 C 4.477152347564697 143.3324584960938 0 133.6094055175781 0 121.6154174804688 L 0 21.71703720092773 C 0 9.723049163818359 4.477152347564697 0 10 0 Z" fill="#ffffff" stroke="#6f407d" stroke-width="1" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_rzpvul =
    '<svg viewBox="35.2 -60.8 477.0 483.9" ><path transform="matrix(1.0, 0.0, 0.0, 1.0, 35.2, -60.83)" d="M 166.5 -1.989373231481295e-06 L 310.5 -3.983765054726973e-06 C 402.4554138183594 -5.257342763798079e-06 477 108.3254547119141 477 241.9517059326172 C 477 375.5779418945312 402.4554138183594 483.9034118652344 310.5 483.9034118652344 L 166.5 483.9034118652344 C 74.54457855224609 483.9034118652344 -3.460002972133225e-06 375.5779418945312 -2.186425490435795e-06 241.9517059326172 C -9.128481224252027e-07 108.3254623413086 74.54458618164062 -7.157958634707029e-07 166.5 -1.989373231481295e-06 Z" fill="#8285bd" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_fypls =
    '<svg viewBox="-126.5 -60.8 477.0 483.9" ><path transform="matrix(1.0, 0.0, 0.0, 1.0, -126.5, -60.83)" d="M 166.5 -1.989373231481295e-06 L 310.5 -3.983765054726973e-06 C 402.4554138183594 -5.257342763798079e-06 477 108.3254547119141 477 241.9517059326172 C 477 375.5779418945312 402.4554138183594 483.9034118652344 310.5 483.9034118652344 L 166.5 483.9034118652344 C 74.54457855224609 483.9034118652344 -3.460002972133225e-06 375.5779418945312 -2.186425490435795e-06 241.9517059326172 C -9.128481224252027e-07 108.3254623413086 74.54458618164062 -7.157958634707029e-07 166.5 -1.989373231481295e-06 Z" fill="#8285bd" fill-opacity="0.89" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_xph1jx =
    '<svg viewBox="16.8 0.0 1.0 31.3" ><path transform="translate(16.81, 0.0)" d="M 0 0 L 0 31.3182373046875" fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_o6ekv6 =
    '<svg viewBox="0.0 15.7 33.6 1.0" ><path transform="matrix(0.0, 1.0, -1.0, 0.0, 33.62, 15.66)" d="M 0 0 L 0 33.6187744140625" fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_okdldq =
    '<svg viewBox="-65.7 -88.2 432.0 476.2" ><path transform="translate(-65.7, -88.23)" d="M 100.4580535888672 0 L 331.5115661621094 0 C 386.9930114746094 0 431.9696044921875 45.75292587280273 431.9696044921875 102.1920318603516 L 431.9696044921875 374.0228576660156 C 431.9696044921875 430.4620056152344 386.9930114746094 476.2149047851562 331.5115661621094 476.2149047851562 L 100.4580535888672 476.2149047851562 C 44.97659683227539 476.2149047851562 0 430.4620056152344 0 374.0228576660156 L 0 102.1920318603516 C 0 45.75292587280273 44.97659683227539 0 100.4580535888672 0 Z" fill="#6f407d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_nrpqt7 =
    '<svg viewBox="29.7 3.7 1.3 4.0" ><path transform="translate(29.67, 3.67)" d="M 0 0 L 0 4 C 0.8047311305999756 3.661223411560059 1.328037977218628 2.873133182525635 1.328037977218628 2 C 1.328037977218628 1.126866698265076 0.8047311305999756 0.3387765288352966 0 0" fill="#ffffff" fill-opacity="0.4" stroke="none" stroke-width="1" stroke-opacity="0.4" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';
const String _svg_pmvna3 =
    '<svg viewBox="392.0 18.2 15.3 11.0" ><path transform="translate(392.03, 18.18)" d="M 7.636517524719238 10.96560001373291 C 7.553837299346924 10.96560001373291 7.473147392272949 10.93181037902832 7.415117263793945 10.87290000915527 L 5.417117595672607 8.856900215148926 C 5.355837345123291 8.796520233154297 5.321717262268066 8.712539672851562 5.323517322540283 8.626500129699707 C 5.325307369232178 8.540619850158691 5.363027572631836 8.458290100097656 5.427017211914062 8.400600433349609 C 6.043807506561279 7.878690242767334 6.828487396240234 7.591279983520508 7.636517524719238 7.591279983520508 C 8.444547653198242 7.591279983520508 9.229227066040039 7.878699779510498 9.846017837524414 8.400600433349609 C 9.909987449645996 8.457460403442383 9.947707176208496 8.539790153503418 9.949517250061035 8.626500129699707 C 9.95131778717041 8.712539672851562 9.917197227478027 8.796520233154297 9.855916976928711 8.856900215148926 L 7.857917308807373 10.87290000915527 C 7.799037456512451 10.93268013000488 7.720407485961914 10.96560001373291 7.636517524719238 10.96560001373291 Z M 11.1447172164917 7.427700042724609 C 11.06472778320312 7.427700042724609 10.9886474609375 7.397650241851807 10.93051719665527 7.343100070953369 C 10.02612781524658 6.524199962615967 8.856297492980957 6.073200225830078 7.636517524719238 6.073200225830078 C 6.417577266693115 6.073200225830078 5.248707294464111 6.524189949035645 4.345217227935791 7.343100070953369 C 4.287087440490723 7.397650241851807 4.211007595062256 7.427700042724609 4.131017208099365 7.427700042724609 C 4.048027515411377 7.427700042724609 3.970037460327148 7.395420074462891 3.911417484283447 7.336800098419189 L 2.757617473602295 6.170400142669678 C 2.695777416229248 6.108550071716309 2.662217378616333 6.026730060577393 2.663117408752441 5.940000057220459 C 2.664007425308228 5.853139877319336 2.69884729385376 5.771959781646729 2.761217355728149 5.711400032043457 C 4.090717315673828 4.47461986541748 5.822447299957275 3.793499946594238 7.637417316436768 3.793499946594238 C 9.452387809753418 3.793499946594238 11.18411731719971 4.47461986541748 12.51361751556396 5.711400032043457 C 12.57655715942383 5.772540092468262 12.61171722412109 5.853720188140869 12.61261749267578 5.940000057220459 C 12.61350727081299 6.025139808654785 12.57939720153809 6.109109878540039 12.51901721954346 6.170400142669678 L 11.36431694030762 7.336800098419189 C 11.30568695068359 7.395420074462891 11.227707862854 7.427700042724609 11.1447172164917 7.427700042724609 Z M 13.80421733856201 4.743000030517578 C 13.72327709197998 4.743000030517578 13.64720726013184 4.711999893188477 13.59001731872559 4.655700206756592 C 11.97507762908936 3.121779918670654 9.860747337341309 2.276999950408936 7.636517524719238 2.276999950408936 C 5.41138744354248 2.276999950408936 3.297057390213013 3.121769905090332 1.683017373085022 4.655700206756592 C 1.625837445259094 4.711989879608154 1.549757361412048 4.743000030517578 1.468817353248596 4.743000030517578 C 1.385827422142029 4.743000030517578 1.3078373670578 4.710720062255859 1.249217391014099 4.652100086212158 L 0.09361741691827774 3.485699892044067 C 0.03236741945147514 3.423549890518188 -0.0008725797524675727 3.342360019683838 1.742024505801965e-05 3.257100105285645 C 0.000917420256882906 3.170560121536255 0.03511742129921913 3.089689970016479 0.09631741791963577 3.029400110244751 C 2.134447336196899 1.075860023498535 4.812267303466797 0 7.636517524719238 0 C 10.46076774597168 0 13.13859748840332 1.075860023498535 15.17671775817871 3.029400110244751 C 15.23734760284424 3.090039968490601 15.27211761474609 3.173029899597168 15.27211761474609 3.257100105285645 C 15.2730073928833 3.342360019683838 15.23976707458496 3.423549890518188 15.17851734161377 3.485699892044067 L 14.02291774749756 4.652100086212158 C 13.96428775787354 4.710720062255859 13.88662719726562 4.743000030517578 13.80421733856201 4.743000030517578 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';
const String _svg_anq0p =
    '<svg viewBox="370.0 18.5 17.0 10.7" ><path transform="translate(370.0, 18.48)" d="M 16.00020027160645 10.6668004989624 L 15.00029945373535 10.6668004989624 C 14.44894981384277 10.6668004989624 14.00039958953857 10.2182502746582 14.00039958953857 9.666900634765625 L 14.00039958953857 0.9998999834060669 C 14.00039958953857 0.4485500156879425 14.44894981384277 0 15.00029945373535 0 L 16.00020027160645 0 C 16.55154991149902 0 17.00010108947754 0.4485500156879425 17.00010108947754 0.9998999834060669 L 17.00010108947754 9.666900634765625 C 17.00010108947754 10.2182502746582 16.55154991149902 10.6668004989624 16.00020027160645 10.6668004989624 Z M 11.33369922637939 10.6668004989624 L 10.33290004730225 10.6668004989624 C 9.781549453735352 10.6668004989624 9.332999229431152 10.2182502746582 9.332999229431152 9.666900634765625 L 9.332999229431152 3.333600044250488 C 9.332999229431152 2.782249927520752 9.781549453735352 2.333699941635132 10.33290004730225 2.333699941635132 L 11.33369922637939 2.333699941635132 C 11.88504981994629 2.333699941635132 12.33360004425049 2.782249927520752 12.33360004425049 3.333600044250488 L 12.33360004425049 9.666900634765625 C 12.33360004425049 10.2182502746582 11.88504981994629 10.6668004989624 11.33369922637939 10.6668004989624 Z M 6.666300296783447 10.6668004989624 L 5.666399955749512 10.6668004989624 C 5.115049839019775 10.6668004989624 4.666500091552734 10.2182502746582 4.666500091552734 9.666900634765625 L 4.666500091552734 5.66640043258667 C 4.666500091552734 5.115050315856934 5.115049839019775 4.666500091552734 5.666399955749512 4.666500091552734 L 6.666300296783447 4.666500091552734 C 7.218140125274658 4.666500091552734 7.667099952697754 5.115050315856934 7.667099952697754 5.66640043258667 L 7.667099952697754 9.666900634765625 C 7.667099952697754 10.2182502746582 7.218140125274658 10.6668004989624 6.666300296783447 10.6668004989624 Z M 1.999799966812134 10.6668004989624 L 0.9998999834060669 10.6668004989624 C 0.4485500156879425 10.6668004989624 0 10.2182502746582 0 9.666900634765625 L 0 7.667100429534912 C 0 7.115260124206543 0.4485500156879425 6.666300296783447 0.9998999834060669 6.666300296783447 L 1.999799966812134 6.666300296783447 C 2.55115008354187 6.666300296783447 2.99970006942749 7.115260124206543 2.99970006942749 7.667100429534912 L 2.99970006942749 9.666900634765625 C 2.99970006942749 10.2182502746582 2.55115008354187 10.6668004989624 1.999799966812134 10.6668004989624 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';
const String _svg_u5a7dw =
    '<svg viewBox="23.0 49.1 21.9 36.6" ><path transform="translate(15.0, 43.14)" d="M 29.90407371520996 10.30359077453613 L 25.73609352111816 6 L 7.999998092651367 24.31315040588379 L 25.73609352111816 42.62630462646484 L 29.90407371520996 38.32271575927734 L 16.36552429199219 24.31315040588379 L 29.90407371520996 10.30359077453613 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';


class DropDownValue{
DropDownValue( this.intID, this.stringName);

late int intID=0;
late String stringName;
}

