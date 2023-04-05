// ignore_for_file: non_constant_identifier_names

import 'package:account/Screens/login.dart';
import 'package:flutter/material.dart';
import 'package:account/Validation/emailValidation.dart' as a;
import 'package:flutter/services.dart';
import '../API/signRequest.dart';

  TextEditingController email = TextEditingController();
 TextEditingController password= TextEditingController();
 var ab=a.sendKey();
 var key2=a.sendKey2();
  enum natonality { jordanian ,notJordanian ,none}
  enum idInfo{nationalID,registrationNumber,none}

class SignupPage extends StatefulWidget {

 @override
  _SignupPageState createState() => _SignupPageState();

}
class _SignupPageState extends State<SignupPage> {
 // create a GlobalKey for the form
 natonality _nationality = natonality.jordanian;
 idInfo selectedOption=idInfo.none;

 TextEditingController nationalid = TextEditingController();
 TextEditingController passportNum = TextEditingController();
 TextEditingController firstName = TextEditingController();
 TextEditingController famileName = TextEditingController();
 TextEditingController phone = TextEditingController();
 TextEditingController username = TextEditingController();
  TextEditingController registrationNumber = TextEditingController();
  TextEditingController registrationNumber2 = TextEditingController();
 TextEditingController nationalIdNumber= TextEditingController();
 



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios,
            size: 20,
            color: Colors.black,),


        ),
      ),
      body: SingleChildScrollView( scrollDirection: Axis.vertical,
        child:   
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          //height: MediaQuery.of(context).size.height - 20,
          width: double.infinity,
          child:
           Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Column(
                children: const <Widget>[
                  Text("تسجيل مستخدم جديد",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,

                  ),),
                
                ],
              ),

              

                  const Text('اختر الجنسية:',style: TextStyle(fontSize: 16),),
                  
                  RadioListTile<natonality>(
                   title: const Text('أردني'),
                   value: natonality.jordanian,
                   groupValue: _nationality,
                   onChanged:(value) {
                    setState((){
                      _nationality=natonality.jordanian;
                    }
                    );
                   
                    
                   },
        ),
         RadioListTile<natonality>(
                   title: const Text('غير أردني'),
                   value: natonality.notJordanian,
                   groupValue: _nationality,
                   onChanged:(value) {
                     setState((){
                      _nationality=natonality.jordanian;
                    }
                    );
                    _nationality=natonality.notJordanian;
                   },
        ),

              
              Directionality(textDirection: TextDirection.rtl, child:

              Column(
                children: 
                  <Widget>[
                  
                  inputFile(label: "الاسم الأول",myController: firstName,type1: TextInputType.text),
                  inputFile(label: "العائلة",myController: famileName,type1: TextInputType.text),
                  Visibility(
                  visible: _nationality==natonality.jordanian ? true :false,
                  child: Column(children: [
                  const Text('آلية التحقق',style: TextStyle(fontSize: 16),),
                  
                  RadioListTile<idInfo>(
                   title: const Text('رقم هوية'),
                   value: idInfo.nationalID,
                   groupValue: selectedOption,
                   onChanged:(value) {
                    setState((){
                      selectedOption=idInfo.nationalID;
                    }
                    );
                   
                    
                   },
        ),
         RadioListTile<idInfo>(
                   title: const Text('رقم القيد المدني'),
                   value: idInfo.registrationNumber,
                   groupValue: selectedOption,
                   onChanged:(value) {
                     setState((){
                      selectedOption=idInfo.registrationNumber;
                    }
                    );
                   
                   },
        ),],)),
                  Visibility(visible: _nationality==natonality.jordanian ? true : false,child: 
                  inputFile(label: "الرقم الوطني", obscureText: false,myController: nationalid,limit: 10,type1: TextInputType.number),
                  ),
                   Visibility(visible: _nationality==natonality.jordanian && selectedOption==idInfo.nationalID ? true : false,child:
                  inputFile(label: "رقم الهوية", obscureText: false,myController: nationalIdNumber,limit: 8),
                ),
                  Visibility(visible: _nationality==natonality.jordanian && selectedOption==idInfo.registrationNumber ? true : false,child:
                  registerField(label: "رقم القيد المدني",myController: registrationNumber,myController2: registrationNumber2),
                ),
                const SizedBox(height: 10,),
                  Visibility(visible: _nationality==natonality.notJordanian ? true : false,child: 
                  inputFile(label: "رقم الجواز", obscureText: false,myController: passportNum),
                  ),
                 
                 inputFile(label: " الهاتف", obscureText: false,myController: phone,limit: 10,type1: TextInputType.phone),
                 a.emaile(), 
                       
                  inputFile(label: " اسم المستخدم", obscureText: false,myController: username),
                  a.passowrd(),
                 // inputFile(label: " كلمة المرور", obscureText: true,myController: password),
                  inputFile(label: " تأكيد كلمة المرور", obscureText: true),
                ],
               ) ),
              Container(
                padding: const EdgeInsets.only(top: 3, left: 3),
                decoration:
                BoxDecoration(
                    borderRadius: BorderRadius.circular(50),
                    border: const Border(
                      bottom: BorderSide(color: Colors.black),
                      top: BorderSide(color: Colors.black),
                      left: BorderSide(color: Colors.black),
                      right: BorderSide(color: Colors.black),



                    )

                ),
                child: MaterialButton(
                  minWidth: double.infinity,
                  height: 50,
                  onPressed: () {
              
                   if (a.sendKey().currentState!.validate()  ){}
                   User user= User();
                   user.signup(username.text,phone.text,password.text,
                   firstName.text,famileName.text,email.text,
                   nationalid.text,passportNum.text,registrationNumber.text+registrationNumber2.text,nationalIdNumber.text,
                    );

                    

                  },
                  color: const Color(0xff0095FF),
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),

                  ),
                  child: const Text(
                    "تسجيل", style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 18,
                    color: Colors.white,

                  ),
                  ),

                ),



              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                
                GestureDetector(
                    onTap: (){
                    Navigator.push(context, MaterialPageRoute(builder: (context)=>  const LoginPgae()));
                    },
                    child:const Text(" تسجيل الدخول", style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                    ))),
                  const Text("هل لديك حساب؟"),
                ],
              )



          ],

          ),


        ),

      

      ));
  }
}



// we will be creating a widget for text field
Widget inputFile({label, obscureText = false, myController,limit,type1})
{
  return Column(
    
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text(
        label,
        style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color:Colors.black87
        ),

      ),
      const SizedBox(
        height: 5,
      ),
    
      TextFormField(
        obscureText: obscureText,
        maxLength: limit,
        controller: myController,
        keyboardType: type1,
         
        decoration: const InputDecoration(
            contentPadding: EdgeInsets.symmetric(vertical: 0,
                horizontal: 3),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(
                  color: Colors.grey
              ),

            ),
            border: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.grey)
            )
        ),
      ),
      const SizedBox(height: 10,)
    ],
  );
}

Widget registerField({label, obscureText = false, myController,myController2,limit,type1})
{
  return Row(
    
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text(
        label,
        style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color:Colors.black87
        ),

      ),
   
    SizedBox(width: 80.0,height: 30.0,child: TextField(
             controller:myController,
            keyboardType: TextInputType.number,
           inputFormatters: [
           LengthLimitingTextInputFormatter(3),
           ],
         ),
       ),
      Text("/"),

       SizedBox(width: 80.0,height: 30.0,child: TextField(
           controller: myController2,
            keyboardType: TextInputType.number,
           inputFormatters: [
           LengthLimitingTextInputFormatter(3),
           ],
         ),
       ),
    //  const SizedBox(height: 10,)
    ],
  );
}



