// ignore_for_file: constant_identifier_names, duplicate_ignore, unused_element, depend_on_referenced_packages

import 'package:account/Screens/public_feed.dart';
import 'package:flutter/material.dart';
import 'package:adobe_xd/pinned.dart';
import 'complaints_list.dart';
import 'edit_profile.dart';
import 'login.dart';
import 'map.dart';
import 'package:adobe_xd/page_link.dart';
import 'package:flutter_svg/flutter_svg.dart';

String usernameInfo="";
String emailInfo="";
String phoneInfo="";
String locationInfo="";

class XDProfile extends StatelessWidget {
  const XDProfile({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffffffff),
      body: Stack(
        children: <Widget>[
          SizedBox(
            width: 430.0,
            height: 932.0,
            child: SvgPicture.string(
              _svg_v33nho,
              allowDrawingOutsideViewBox: true,
            ),
          ),
          Pinned.fromPins(
            Pin(start: -61.4, end: -99.1),
            Pin(size: 368.2, start: -180.2),
            child:
                // Adobe XD layer: 'Action Bar' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(size: 477.0, end: 0.0),
                  Pin(start: 27.4, end: 0.0),
                  child: SvgPicture.string(
                    _svg_tllar,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 477.0, start: 0.0),
                  Pin(start: 27.4, end: 0.0),
                  child: SvgPicture.string(
                    _svg_mz,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 432.0, start: 60.8),
                  Pin(start: 0.0, end: 35.1),
                  child: SvgPicture.string(
                    _svg_gg6p5,
                    allowDrawingOutsideViewBox: true,
                    fit: BoxFit.fill,
                  ),
                ),
              ],
            ),
          ),
          Transform.translate(
            offset: const Offset(0.0, 75.0),
            child: SizedBox(
              width: 430.0,
              height: 650.0,
              child: Transform.rotate(
                angle: 0.0,
                child:
                    // Adobe XD layer: 'Profile' (group)
                    Stack(
                  children: <Widget>[
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, end: 0.0),
                      child:
                          // Adobe XD layer: 'Notifications' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'NotificationsBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'NotificationsLabel' (text)
                                const Text(
                              'Receive notifications',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 41.0),
                            child:
                                // Adobe XD layer: 'Notifications' (text)
                                const Text(
                              'Enabled',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Pinned.fromPins(
                            Pin(size: 46.0, end: 30.0),
                            Pin(size: 24.0, middle: 0.5094),
                            child:
                                // Adobe XD layer: 'NotificationsEdit' (group)
                                Stack(
                              children: <Widget>[
                                // Adobe XD layer: 'Switch' (shape)
                                Container(
                                  width: 46.0,
                                  height: 24.0,
                                  decoration: BoxDecoration(
                                    color: const Color(0xff2a0340),
                                    borderRadius: BorderRadius.circular(20.0),
                                  ),
                                ),
                                Transform.translate(
                                  offset: const Offset(24.0, 2.0),
                                  child: Transform.rotate(
                                    angle: 3.1416,
                                    child:
                                        // Adobe XD layer: 'SwitchKnob' (shape)
                                        Container(
                                      width: 20.0,
                                      height: 20.0,
                                      decoration: BoxDecoration(
                                        color: const Color(0xffffffff),
                                        borderRadius:
                                            BorderRadius.circular(20.0),
                                        border: Border.all(
                                            width: 1.0,
                                            color: const Color(0xff6f407d)),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, end: 77.0),
                      child:
                          // Adobe XD layer: 'Password' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'PasswordBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(366.0, 30.0),
                            child:
                                // Adobe XD layer: 'PasswordEdit' (text)
                                const Text(
                              'Edit',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.14,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 40.0),
                            child:
                                // Adobe XD layer: 'Password' (text)
                                const Text(
                              '●●●●●●●●',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'PasswordLabel' (text)
                                const Text(
                              'Password',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, middle: 0.6859),
                      child:
                          // Adobe XD layer: 'Location' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'LocationBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(366.0, 30.0),
                            child:
                                // Adobe XD layer: 'LocationEdit' (text)
                                const Text(
                              'Edit',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.14,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 41.0),
                            child:
                                // Adobe XD layer: 'Location' (text)
                                const Text(
                              'Amman, Jordan',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'LocationLabel' (text)
                                const Text(
                              'Location',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, middle: 0.5288),
                      child:
                          // Adobe XD layer: 'Phonenumber' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'PhonenumberBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(366.0, 30.0),
                            child:
                                // Adobe XD layer: 'PhonenumberEdit' (text)
                                const Text(
                              'Edit',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.14,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 41.0),
                            child:
                                // Adobe XD layer: 'Phonenumber' (text)
                                const Text(
                              '0797383352',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'PhonenumberLabel' (text)
                                const Text(
                              'Phonenumber',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, middle: 0.3717),
                      child:
                          // Adobe XD layer: 'Email' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'EmailBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'EmailLabel' (text)
                                const Text(
                              'Email',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 41.0),
                            child:
                                // Adobe XD layer: 'Email' (text)
                                const Text(
                              'fake.email@mail.com',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(366.0, 30.0),
                            child:
                                // Adobe XD layer: 'EmailEdit' (text)
                                const Text(
                              'Edit',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.14,
                              ),
                              softWrap: false,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Pinned.fromPins(
                      Pin(start: 0.0, end: 0.0),
                      Pin(size: 77.0, middle: 0.2147),
                      child:
                          // Adobe XD layer: 'Username' (group)
                          Stack(
                        children: <Widget>[
                          // Adobe XD layer: 'UsernameBox' (shape)
                          Container(
                            width: 430.0,
                            height: 77.0,
                            color: const Color(0xffffffff),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 15.0),
                            child:
                                // Adobe XD layer: 'UsernameLabel' (text)
                                const Text(
                              'Username',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0x5992a5c6),
                                letterSpacing: -0.14,
                                fontWeight: FontWeight.w500,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(34.0, 41.0),
                            child:
                                // Adobe XD layer: 'Username' (text)
                                Text(
                               usernameController.text,
                              style: const TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 16,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.16,
                              ),
                              softWrap: false,
                            ),
                          ),
                          Transform.translate(
                            offset: const Offset(366.0, 30.0),
                            child:
                                // Adobe XD layer: 'UsernameEdit' (text)
                                const Text(
                              'Edit',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 14,
                                color: Color(0xff2a0340),
                                letterSpacing: -0.14,
                              ),
                              softWrap: false,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Align(
                      alignment: Alignment.topCenter,
                      child: SizedBox(
                        width: 218.0,
                        height: 63.0,
                        child:
                            // Adobe XD layer: 'NameDisplay' (group)
                            Stack(
                          children: <Widget>[
                        Transform.translate(
                        offset: const Offset(200.0, 40.0),
                        child:  InkWell(
                          onTap:() {
                             Navigator.push(context,MaterialPageRoute(builder: (context) => EditProfilePage()),);
                          },
                          child:
                        const Icon(Icons.edit,color: Colors.white,),

                             ),),
                            // Adobe XD layer: 'FullNameDisplay' (text)
                            const SizedBox(
                              width: 218.0,
                              child: Text(
                                'Hussain Ghanem',
                                style: TextStyle(
                                  fontFamily: 'Euclid Circular A',
                                  fontSize: 27,
                                  color: Color(0xffffffff),
                                  letterSpacing: -0.27,
                                  fontWeight: FontWeight.w700,
                                  height: 1.1851851851851851,
                                ),
                                textHeightBehavior: TextHeightBehavior(
                                    applyHeightToFirstAscent: false),
                                textAlign: TextAlign.center,
                                softWrap: false,
                              ),
                            ),
                            Transform.translate(
                              offset: const Offset(26.0, 43.0),
                              child:
                                  // Adobe XD layer: 'UsernameDisplay' (text)
                                  const SizedBox(
                                width: 166.0,
                                child: Text(
                                  'ID: 2000335796',
                                  style: TextStyle(
                                    fontFamily: 'Euclid Circular A',
                                    fontSize: 16,
                                    color: Color(0xffdcdcdc),
                                    letterSpacing: -0.16,
                                    height: 1.375,
                                  ),
                                  textHeightBehavior: TextHeightBehavior(
                                      applyHeightToFirstAscent: false),
                                  textAlign: TextAlign.center,
                                  softWrap: false,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Pinned.fromPins(
            Pin(start: 0.0, end: 0.0),
            Pin(size: 172.0, end: 0.0),
            child:
                // Adobe XD layer: 'NavBar' (group)
                Stack(
              children: <Widget>[
                Pinned.fromPins(
                  Pin(start: 0.0, end: 0.0),
                  Pin(startFraction: 0.0, endFraction: 0.1201),
                  child: Transform.rotate(
                    angle: 3.1416,
                    child:
                        // Adobe XD layer: 'Gradiant' (shape)
                        Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment(0.0, 0.978),
                          end: Alignment(0.0, -0.987),
                          colors: [
                            Color(0x00ffffff),
                            Color(0xe4828282)
                          ],
                          stops: [0.0, 1.0],
                        ),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 46.0, 0.0, 0.0),
                  child:
                      // Adobe XD layer: 'Bar' (group)
                      Stack(
                    children: <Widget>[
                      Align(
                        alignment: Alignment.topCenter,
                        child: SizedBox(
                          width: 75.0,
                          height: 74.0,
                          child:
                              // Adobe XD layer: 'Button' (group)
                              Stack(
                            children: <Widget>[
                              // Adobe XD layer: 'ButtonFill' (shape)
                              Container(
                                decoration: BoxDecoration(
                                  gradient: const LinearGradient(
                                    begin: Alignment(0.0, -1.0),
                                    end: Alignment(0.0, 1.0),
                                    colors: [
                                      Color(0xff2a0340),
                                      Color(0xff223e6d)
                                    ],
                                    stops: [0.0, 1.0],
                                  ),
                                  borderRadius: const BorderRadius.all(
                                      Radius.elliptical(9999.0, 9999.0)),
                                  border: Border.all(
                                      width: 4.0,
                                      color: const Color(0xffffffff)),
                                  boxShadow: const [
                                    BoxShadow(
                                      color: Color(0x29000000),
                                      offset: Offset(0, 3),
                                      blurRadius: 40,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Pinned.fromPins(
                        Pin(start: 0.0, end: 0.0),
                        Pin(size: 77.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'BottomBar' (shape)
                            SvgPicture.string(
                          _svg_qn9i8,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        ),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 26.1, end: 28.7),
                  Pin(size: 35.1, end: 18.6),
                  child:
                      // Adobe XD layer: 'Profile' (group)
                      Stack(
                    children: <Widget>[
                      Pinned.fromPins(
                        Pin(start: 2.0, end: 2.0),
                        Pin(size: 9.0, end: 0.0),
                        child:
                            // Adobe XD layer: 'Label' (text)
                            const Text(
                          'Profile',
                          style: TextStyle(
                            fontFamily: 'Euclid Circular A',
                            fontSize: 7,
                            color: Color(0xff6f407d),
                            fontWeight: FontWeight.w700,
                            height: 0.7142857142857143,
                          ),
                          textHeightBehavior: TextHeightBehavior(
                              applyHeightToFirstAscent: false),
                          softWrap: false,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 9.0),
                        child: SizedBox.expand(
                            child:
                                // Adobe XD layer: 'Profile' (shape)
                                SvgPicture.string(
                          _svg_wt915,
                          allowDrawingOutsideViewBox: true,
                          fit: BoxFit.fill,
                        )),
                      ),
                    ],
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 39.0, middle: 0.7715),
                  Pin(size: 35.0, end: 18.6),
                  child:
                      // Adobe XD layer: 'Complaints' (group)
                      PageLink(
                    links: [
                      PageLinkInfo(
                        duration: 0,
                        pageBuilder: () => const XDComplaintsList(),
                      ),
                    ],
                    child: Stack(
                      children: <Widget>[
                        Pinned.fromPins(
                          Pin(start: 0.0, end: 0.0),
                          Pin(size: 9.0, end: 0.0),
                          child:
                              // Adobe XD layer: 'Label' (text)
                              const Text(
                            'Complaints',
                            style: TextStyle(
                              fontFamily: 'Euclid Circular A',
                              fontSize: 7,
                              color: Color(0xffbbc7db),
                              fontWeight: FontWeight.w700,
                              height: 0.7142857142857143,
                            ),
                            textHeightBehavior: TextHeightBehavior(
                                applyHeightToFirstAscent: false),
                            softWrap: false,
                          ),
                        ),
                        Pinned.fromPins(
                          Pin(start: 6.5, end: 6.5),
                          Pin(size: 26.0, start: 0.0),
                          child:
                              // Adobe XD layer: 'ComplaintsIcon' (shape)
                              SvgPicture.string(
                            _svg_btlkna,
                            allowDrawingOutsideViewBox: true,
                            fit: BoxFit.fill,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Align(
                  alignment: const Alignment(0.0, -0.062),
                  child: SizedBox(
                    width: 34.0,
                    height: 31.0,
                    child:
                        // Adobe XD layer: 'FillComplaintIcon' (group)
                        Stack(
                      children: <Widget>[
                        Pinned.fromPins(
                          Pin(size: 1.0, middle: 0.5153),
                          Pin(start: 0.0, end: 0.0),
                          child: SvgPicture.string(
                            _svg_xph1jx,
                            allowDrawingOutsideViewBox: true,
                            fit: BoxFit.fill,
                          ),
                        ),
                        Pinned.fromPins(
                          Pin(start: 0.0, end: 0.0),
                          Pin(size: 1.0, middle: 0.5165),
                          child: SvgPicture.string(
                            _svg_o6ekv6,
                            allowDrawingOutsideViewBox: true,
                            fit: BoxFit.fill,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 26.0, middle: 0.2711),
                  Pin(size: 35.0, end: 17.0),
                  child:
                      // Adobe XD layer: 'Map' (group)
                      PageLink(
                    links: [
                      PageLinkInfo(
                        duration: 0,
                        pageBuilder: () => const XDMap_(),
                      ),
                    ],
                    child: Stack(
                      children: <Widget>[
                        const Align(
                          alignment: Alignment.bottomCenter,
                          child: SizedBox(
                            width: 15.0,
                            height: 9.0,
                            child:
                                // Adobe XD layer: 'Label' (text)
                                Text(
                              'Map',
                              style: TextStyle(
                                fontFamily: 'Euclid Circular A',
                                fontSize: 7,
                                color: Color(0xffbbc7db),
                                fontWeight: FontWeight.w700,
                                height: 0.7142857142857143,
                              ),
                              textHeightBehavior: TextHeightBehavior(
                                  applyHeightToFirstAscent: false),
                              softWrap: false,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 9.0),
                          child: SizedBox.expand(
                              child:
                                  // Adobe XD layer: 'Map' (shape)
                                  SvgPicture.string(
                            _svg_p8s453,
                            allowDrawingOutsideViewBox: true,
                            fit: BoxFit.fill,
                          )),
                        ),
                      ],
                    ),
                  ),
                ),
                Pinned.fromPins(
                  Pin(size: 29.6, start: 34.7),
                  Pin(size: 36.6, end: 17.0),
                  child:
                      // Adobe XD layer: 'Home' (group)
                      PageLink(
                    links: [
                      PageLinkInfo(
                        duration: 0,
                        pageBuilder: () => const XDPublicFeed1(),
                      ),
                    ],
                    child: Stack(
                      children: <Widget>[
                        Pinned.fromPins(
                          Pin(start: 2.3, end: 2.4),
                          Pin(size: 11.0, end: 0.0),
                          child:
                              // Adobe XD layer: 'Label' (text)
                              const Text(
                            'Home',
                            style: TextStyle(
                              fontFamily: 'Euclid Circular A',
                              fontSize: 9,
                              color: Color(0xffbbc7db),
                              fontWeight: FontWeight.w700,
                              height: 0.6666666666666666,
                            ),
                            textHeightBehavior: TextHeightBehavior(
                                applyHeightToFirstAscent: false),
                            softWrap: false,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 11.5),
                          child: SizedBox.expand(
                              child:
                                  // Adobe XD layer: 'HomeIcon' (shape)
                                  SvgPicture.string(
                            _svg_ax8kh6,
                            allowDrawingOutsideViewBox: true,
                            fit: BoxFit.fill,
                          )),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
         
        ],
      ),
    );
  }
}

// ignore: constant_identifier_names
const String _svg_tllar =
    '<svg viewBox="-13.1 -60.8 477.0 340.8" ><path transform="matrix(1.0, 0.0, 0.0, 1.0, -13.08, -60.83)" d="M 166.5 -1.195902399331317e-07 L 310.5 -2.230196400887507e-07 C 402.4554138183594 -2.890675148137234e-07 477 76.29647064208984 477 170.4129486083984 C 477 264.5294189453125 402.4554138183594 340.8258972167969 310.5 340.8258972167969 L 166.5 340.8258972167969 C 74.54458618164062 340.8258972167969 -1.856381146581043e-07 264.5294189453125 -1.195902399331317e-07 170.4129486083984 C -5.354237586630006e-08 76.29647064208984 74.54458618164062 -5.354237586630006e-08 166.5 -1.195902399331317e-07 Z" fill="#8285bd" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_mz =
    '<svg viewBox="-126.5 -60.8 477.0 340.8" ><path transform="matrix(1.0, 0.0, 0.0, 1.0, -126.5, -60.83)" d="M 166.5 -1.195902399331317e-07 L 310.5 -2.230196400887507e-07 C 402.4554138183594 -2.890675148137234e-07 477 76.29647064208984 477 170.4129486083984 C 477 264.5294189453125 402.4554138183594 340.8258972167969 310.5 340.8258972167969 L 166.5 340.8258972167969 C 74.54458618164062 340.8258972167969 -1.856381146581043e-07 264.5294189453125 -1.195902399331317e-07 170.4129486083984 C -5.354237586630006e-08 76.29647064208984 74.54458618164062 -5.354237586630006e-08 166.5 -1.195902399331317e-07 Z" fill="#8285bd" fill-opacity="0.89" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_gg6p5 =
    '<svg viewBox="-65.7 -88.2 432.0 333.1" ><path transform="translate(-65.7, -88.23)" d="M 100.4580535888672 0 L 331.5115661621094 0 C 386.9930114746094 0 431.9696044921875 32.0065803527832 431.9696044921875 71.48870849609375 L 431.9696044921875 261.648681640625 C 431.9696044921875 301.1308288574219 386.9930114746094 333.1373901367188 331.5115661621094 333.1373901367188 L 100.4580535888672 333.1373901367188 C 44.97659683227539 333.1373901367188 0 301.1308288574219 0 261.648681640625 L 0 71.48870849609375 C 0 32.0065803527832 44.97659683227539 0 100.4580535888672 0 Z" fill="#6f407d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_v33nho =
    '<svg viewBox="0.0 0.0 430.0 932.0" ><path transform="matrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)" d="M 0 0 L 430 0 L 430 932 L 0 932 L 0 0 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_qn9i8 =
    '<svg viewBox="0.0 65.0 430.0 77.0" ><path transform="translate(0.0, 65.0)" d="M 56.74769973754883 77.02020263671875 C 56.17734527587891 77.02020263671875 55.6075553894043 77.01351165771484 55.04129028320312 77.00040435791016 L 0 77.00040435791016 L 0 15.00030040740967 C 0 6.715800285339355 6.715800285339355 0 15.00030040740967 0 L 70.510498046875 0 L 70.510498046875 0.1467000097036362 L 150.506103515625 0.1467000097036362 C 150.506103515625 0.1467000097036362 156.3993072509766 -0.4446000158786774 162.8793029785156 2.59470009803772 C 169.3592987060547 5.634900093078613 172.8899993896484 12.30660057067871 172.8899993896484 12.30660057067871 C 172.8899993896484 12.30660057067871 188.3205108642578 36.60480117797852 217.0413055419922 36.43830108642578 C 249.0669097900391 36.20610046386719 262.5632934570312 12.34530067443848 262.5632934570312 12.34530067443848 C 262.5632934570312 12.34530067443848 266.8544921875 5.163300037384033 270.9027099609375 2.59470009803772 C 274.9508972167969 0.02610000036656857 278.2863159179688 0.1467000097036362 285.1416015625 0.1467000097036362 L 359.4888000488281 0.1467000097036362 L 359.4888000488281 0 L 415.9998168945312 0 C 421.89501953125 0 426.9396057128906 3.643968343734741 429.0035400390625 8.80247688293457 C 429.6484375 10.19120025634766 430.0002136230469 11.68927192687988 430.0002136230469 13.25069999694824 L 430.0002136230469 14.00040054321289 L 430.0002136230469 77.00040435791016 L 375.4934997558594 77.00040435791016 C 374.92724609375 77.01351165771484 374.3574523925781 77.02020263671875 373.787109375 77.02020263671875 L 56.74769973754883 77.02020263671875 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_wt915 =
    '<svg viewBox="4.3 0.0 26.1 26.1" ><path transform="translate(0.26, -4.0)" d="M 17.02800750732422 17.02800750732422 C 20.62699317932129 17.02800750732422 23.54201126098633 14.11298942565918 23.54201126098633 10.51400375366211 C 23.54201126098633 6.915016651153564 20.62699317932129 4 17.02800750732422 4 C 13.42901802062988 4 10.51400375366211 6.915016651153564 10.51400375366211 10.51400375366211 C 10.51400375366211 14.11298942565918 13.42901802062988 17.02800750732422 17.02800750732422 17.02800750732422 Z M 17.02800750732422 20.28500938415527 C 12.67990875244141 20.28500938415527 4 22.46719932556152 4 26.79901313781738 L 4 30.0560131072998 L 30.0560131072998 30.0560131072998 L 30.0560131072998 26.79901313781738 C 30.0560131072998 22.46719932556152 21.37610244750977 20.28500938415527 17.02800750732422 20.28500938415527 Z" fill="#6f407d" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_btlkna =
    '<svg viewBox="11.1 0.0 26.0 26.0" ><path transform="translate(9.12, -2.0)" d="M 4.600000381469727 7.20000171661377 L 2 7.20000171661377 L 2 25.39999961853027 C 2 26.82999801635742 3.170000553131104 28 4.600000381469727 28 L 22.80000114440918 28 L 22.80000114440918 25.39999961853027 L 4.600000381469727 25.39999961853027 L 4.600000381469727 7.20000171661377 Z M 25.39999961853027 2 L 9.80000114440918 2 C 8.370001792907715 2 7.20000171661377 3.170000553131104 7.20000171661377 4.600000381469727 L 7.20000171661377 20.20000076293945 C 7.20000171661377 21.63000106811523 8.370001792907715 22.80000114440918 9.80000114440918 22.80000114440918 L 25.39999961853027 22.80000114440918 C 26.82999801635742 22.80000114440918 28 21.63000106811523 28 20.20000076293945 L 28 4.600000381469727 C 28 3.170000553131104 26.82999801635742 2 25.39999961853027 2 Z M 25.39999961853027 15.00000286102295 L 22.14999961853027 13.05000114440918 L 18.89999961853027 15.00000286102295 L 18.89999961853027 4.600000381469727 L 25.39999961853027 4.600000381469727 L 25.39999961853027 15.00000286102295 Z" fill="#bbc7db" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_xph1jx =
    '<svg viewBox="16.8 0.0 1.0 31.3" ><path transform="translate(16.81, 0.0)" d="M 0 0 L 0 31.3182373046875" fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_o6ekv6 =
    '<svg viewBox="0.0 15.7 33.6 1.0" ><path transform="matrix(0.0, 1.0, -1.0, 0.0, 33.62, 15.66)" d="M 0 0 L 0 33.6187744140625" fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="4" stroke-linecap="round" /></svg>';
const String _svg_p8s453 =
    '<svg viewBox="0.0 0.0 26.0 26.0" ><path transform="translate(-3.0, -3.0)" d="M 28.27777862548828 2.999999761581421 L 28.04666709899902 3.043332815170288 L 20.33333206176758 6.033331871032715 L 11.66666603088379 2.999999761581421 L 3.519999742507935 5.744444847106934 C 3.216666460037231 5.845555305480957 2.999999761581421 6.105555534362793 2.999999761581421 6.437777519226074 L 2.999999761581421 28.27777862548828 C 2.999999761581421 28.68222236633301 3.317777872085571 29 3.722221612930298 29 L 3.953333616256714 28.9566650390625 L 11.66666603088379 25.9666633605957 L 20.33333206176758 29 L 28.4799976348877 26.25555610656738 C 28.78333282470703 26.15444564819336 29 25.89444351196289 29 25.56222343444824 L 29 3.722221612930298 C 29 3.317777872085571 28.68222236633301 2.999999761581421 28.27777862548828 2.999999761581421 Z M 20.33333206176758 26.11111068725586 L 11.66666603088379 23.06332969665527 L 11.66666603088379 5.888888359069824 L 20.33333206176758 8.936665534973145 L 20.33333206176758 26.11111068725586 Z" fill="#bbc7db" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_ax8kh6 =
    '<svg viewBox="0.7 8.0 29.6 25.2" ><path transform="translate(-1.27, 5.0)" d="M 13.85300064086914 28.1876220703125 L 13.85300064086914 19.29787445068359 L 19.77949523925781 19.29787445068359 L 19.77949523925781 28.1876220703125 L 27.1876220703125 28.1876220703125 L 27.1876220703125 16.33462524414062 L 31.63249969482422 16.33462524414062 L 16.81625175476074 2.999999523162842 L 1.999999523162842 16.33462524414062 L 6.444873809814453 16.33462524414062 L 6.444873809814453 28.1876220703125 L 13.85300064086914 28.1876220703125 Z" fill="#bbc7db" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-linecap="butt" /></svg>';
const String _svg_nrpqt7 =
    '<svg viewBox="29.7 3.7 1.3 4.0" ><path transform="translate(29.67, 3.67)" d="M 0 0 L 0 4 C 0.8047311305999756 3.661223411560059 1.328037977218628 2.873133182525635 1.328037977218628 2 C 1.328037977218628 1.126866698265076 0.8047311305999756 0.3387765288352966 0 0" fill="#ffffff" fill-opacity="0.4" stroke="none" stroke-width="1" stroke-opacity="0.4" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';
const String _svg_kzxo3p =
    '<svg viewBox="428.0 17.3 15.3 11.0" ><path transform="translate(428.03, 17.33)" d="M 7.636517524719238 10.96560001373291 C 7.553837299346924 10.96560001373291 7.473147392272949 10.93181037902832 7.415117263793945 10.87290000915527 L 5.417117595672607 8.856900215148926 C 5.355837345123291 8.796520233154297 5.321717262268066 8.712539672851562 5.323517322540283 8.626500129699707 C 5.325307369232178 8.540619850158691 5.363027572631836 8.458290100097656 5.427017211914062 8.400600433349609 C 6.043807506561279 7.878690242767334 6.828487396240234 7.591279983520508 7.636517524719238 7.591279983520508 C 8.444547653198242 7.591279983520508 9.229227066040039 7.878699779510498 9.846017837524414 8.400600433349609 C 9.909987449645996 8.457460403442383 9.947707176208496 8.539790153503418 9.949517250061035 8.626500129699707 C 9.95131778717041 8.712539672851562 9.917197227478027 8.796520233154297 9.855916976928711 8.856900215148926 L 7.857917308807373 10.87290000915527 C 7.799037456512451 10.93268013000488 7.720407485961914 10.96560001373291 7.636517524719238 10.96560001373291 Z M 11.1447172164917 7.427700042724609 C 11.06472778320312 7.427700042724609 10.9886474609375 7.397650241851807 10.93051719665527 7.343100070953369 C 10.02612781524658 6.524199962615967 8.856297492980957 6.073200225830078 7.636517524719238 6.073200225830078 C 6.417577266693115 6.073200225830078 5.248707294464111 6.524189949035645 4.345217227935791 7.343100070953369 C 4.287087440490723 7.397650241851807 4.211007595062256 7.427700042724609 4.131017208099365 7.427700042724609 C 4.048027515411377 7.427700042724609 3.970037460327148 7.395420074462891 3.911417484283447 7.336800098419189 L 2.757617473602295 6.170400142669678 C 2.695777416229248 6.108550071716309 2.662217378616333 6.026730060577393 2.663117408752441 5.940000057220459 C 2.664007425308228 5.853139877319336 2.69884729385376 5.771959781646729 2.761217355728149 5.711400032043457 C 4.090717315673828 4.47461986541748 5.822447299957275 3.793499946594238 7.637417316436768 3.793499946594238 C 9.452387809753418 3.793499946594238 11.18411731719971 4.47461986541748 12.51361751556396 5.711400032043457 C 12.57655715942383 5.772540092468262 12.61171722412109 5.853720188140869 12.61261749267578 5.940000057220459 C 12.61350727081299 6.025139808654785 12.57939720153809 6.109109878540039 12.51901721954346 6.170400142669678 L 11.36431694030762 7.336800098419189 C 11.30568695068359 7.395420074462891 11.227707862854 7.427700042724609 11.1447172164917 7.427700042724609 Z M 13.80421733856201 4.743000030517578 C 13.72327709197998 4.743000030517578 13.64720726013184 4.711999893188477 13.59001731872559 4.655700206756592 C 11.97507762908936 3.121779918670654 9.860747337341309 2.276999950408936 7.636517524719238 2.276999950408936 C 5.41138744354248 2.276999950408936 3.297057390213013 3.121769905090332 1.683017373085022 4.655700206756592 C 1.625837445259094 4.711989879608154 1.549757361412048 4.743000030517578 1.468817353248596 4.743000030517578 C 1.385827422142029 4.743000030517578 1.3078373670578 4.710720062255859 1.249217391014099 4.652100086212158 L 0.09361741691827774 3.485699892044067 C 0.03236741945147514 3.423549890518188 -0.0008725797524675727 3.342360019683838 1.742024505801965e-05 3.257100105285645 C 0.000917420256882906 3.170560121536255 0.03511742129921913 3.089689970016479 0.09631741791963577 3.029400110244751 C 2.134447336196899 1.075860023498535 4.812267303466797 0 7.636517524719238 0 C 10.46076774597168 0 13.13859748840332 1.075860023498535 15.17671775817871 3.029400110244751 C 15.23734760284424 3.090039968490601 15.27211761474609 3.173029899597168 15.27211761474609 3.257100105285645 C 15.2730073928833 3.342360019683838 15.23976707458496 3.423549890518188 15.17851734161377 3.485699892044067 L 14.02291774749756 4.652100086212158 C 13.96428775787354 4.710720062255859 13.88662719726562 4.743000030517578 13.80421733856201 4.743000030517578 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';
const String _svg_h2c2uc =
    '<svg viewBox="406.0 17.7 17.0 10.7" ><path transform="translate(406.0, 17.67)" d="M 16.00020027160645 10.6668004989624 L 15.00029945373535 10.6668004989624 C 14.44894981384277 10.6668004989624 14.00039958953857 10.2182502746582 14.00039958953857 9.666900634765625 L 14.00039958953857 0.9998999834060669 C 14.00039958953857 0.4485500156879425 14.44894981384277 0 15.00029945373535 0 L 16.00020027160645 0 C 16.55154991149902 0 17.00010108947754 0.4485500156879425 17.00010108947754 0.9998999834060669 L 17.00010108947754 9.666900634765625 C 17.00010108947754 10.2182502746582 16.55154991149902 10.6668004989624 16.00020027160645 10.6668004989624 Z M 11.33369922637939 10.6668004989624 L 10.33290004730225 10.6668004989624 C 9.781549453735352 10.6668004989624 9.332999229431152 10.2182502746582 9.332999229431152 9.666900634765625 L 9.332999229431152 3.333600044250488 C 9.332999229431152 2.782249927520752 9.781549453735352 2.333699941635132 10.33290004730225 2.333699941635132 L 11.33369922637939 2.333699941635132 C 11.88504981994629 2.333699941635132 12.33360004425049 2.782249927520752 12.33360004425049 3.333600044250488 L 12.33360004425049 9.666900634765625 C 12.33360004425049 10.2182502746582 11.88504981994629 10.6668004989624 11.33369922637939 10.6668004989624 Z M 6.666300296783447 10.6668004989624 L 5.666399955749512 10.6668004989624 C 5.115049839019775 10.6668004989624 4.666500091552734 10.2182502746582 4.666500091552734 9.666900634765625 L 4.666500091552734 5.66640043258667 C 4.666500091552734 5.115050315856934 5.115049839019775 4.666500091552734 5.666399955749512 4.666500091552734 L 6.666300296783447 4.666500091552734 C 7.218140125274658 4.666500091552734 7.667099952697754 5.115050315856934 7.667099952697754 5.66640043258667 L 7.667099952697754 9.666900634765625 C 7.667099952697754 10.2182502746582 7.218140125274658 10.6668004989624 6.666300296783447 10.6668004989624 Z M 1.999799966812134 10.6668004989624 L 0.9998999834060669 10.6668004989624 C 0.4485500156879425 10.6668004989624 0 10.2182502746582 0 9.666900634765625 L 0 7.667100429534912 C 0 7.115260124206543 0.4485500156879425 6.666300296783447 0.9998999834060669 6.666300296783447 L 1.999799966812134 6.666300296783447 C 2.55115008354187 6.666300296783447 2.99970006942749 7.115260124206543 2.99970006942749 7.667100429534912 L 2.99970006942749 9.666900634765625 C 2.99970006942749 10.2182502746582 2.55115008354187 10.6668004989624 1.999799966812134 10.6668004989624 Z" fill="#ffffff" stroke="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="butt" /></svg>';