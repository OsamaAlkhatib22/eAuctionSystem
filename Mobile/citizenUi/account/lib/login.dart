import 'package:account/signRequest.dart';
import 'package:account/signup.dart';
import 'package:account/emailValidation.dart' as a;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
 final _formKey = GlobalKey<FormState>();
  String? _email;
class LoginPgae extends StatefulWidget {
  const LoginPgae({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<LoginPgae> {

 
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,

        /*In Flutter, leading is a property that can be set on certain widgets to position 
        an icon or widget at the beginning of a row, typically in an app bar or a list item*/
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios,
          size: 20,
          color: Colors.black,),


        ), systemOverlayStyle: SystemUiOverlayStyle.dark,
      ),
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Expanded(child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Directionality(textDirection: TextDirection.rtl, child: 
                Column(
                  children: <Widget>[
                    const Text("تسجيل الدخول",
                    style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),),
                    const SizedBox(height: 20,),
                    Text("تسجيل الدخول الى حسابك",
                    style: TextStyle(
                      fontSize: 15,
                    color:Colors.grey[700]),)
                  ],
                )),

                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 40),
                  child:Directionality(textDirection: TextDirection.rtl, child: Column(
                    children: <Widget>[
                     a.emaile(),
                      inputFile(label: "كلمة السر", obscureText: true,myController:passwordController,)
                    ],
                  ),
                 ) ),
                  Padding(padding:
                  const EdgeInsets.symmetric(horizontal: 40),
                  child: Container(
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
                        height: 60,
                        onPressed: () {
                        if (a.sendKey().currentState!.validate()) {}
                          User user=User();
                          user.login(emailController.text.toString(),passwordController.text.toString());
                        },
                        color: const Color(0xff0095FF),
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),

                        ),
                        child: const Text(
                          "تسجيل الدخول", style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 18,
                          color: Colors.white,

                        ),
                        ),

                      ),
                    ),
                  ),


                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                        
                  GestureDetector(
                    onTap: (){
                    Navigator.push(context, MaterialPageRoute(builder: (context)=>  SignupPage()));
                    },
                    child:const Text(" تسجيل", style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,

                    ),),
                  ),

                   
                 const Text("ليس لديك حساب؟"),
                  ],
                ),

                

              ],
            ))
          ],
        ),
      ),
    );
  }

}


// we will be creating a widget for text field
Widget inputFile({label, obscureText = false,  required TextEditingController  myController,validator})
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
        controller: myController,
        decoration: const InputDecoration(
          contentPadding: EdgeInsets.symmetric(vertical: 0,
          horizontal: 10),
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
