import 'package:flutter/material.dart';
import 'Screens/home.dart';
//import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
    
        primarySwatch: Colors.blue,
      ),
      home: const XDHome(),
      localizationsDelegates: const [
       // Applocal.delegate,
      //  GlobalMaterialLocalizations.delegate,
      //  GlobalWidgetsLocalizations.delegate,
      //  GlobalCupertinoLocalizations.delegate,
      ] ,
      supportedLocales: const[
        Locale("ar","JO"),
        Locale("en","GB"),
      ],
      //to handle the languages
      localeResolutionCallback:(currentLang,supportLang){
        if(currentLang!=null){
           for(Locale locale in supportLang){
            if(locale.languageCode==currentLang.languageCode){
              return currentLang; 
            }

           }
        }
        return supportLang.first;
      },
    );
  }
}

