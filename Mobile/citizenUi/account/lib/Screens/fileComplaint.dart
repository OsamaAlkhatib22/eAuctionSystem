// ignore_for_file: file_names, sort_child_properties_last


import 'package:account/Screens/filecomplaitt.dart';
import 'package:flutter/material.dart';

class SO extends StatelessWidget {
  const SO({super.key});


  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
     // drawer:
      body: Stack(
        children:[
      
     Column(
        children: <Widget>[
          Expanded(
            flex: 2,
            child: Container(color: Colors.deepPurple),
          ),
          Expanded(
            child: Container(color: Colors.transparent),
            flex: 5,
          ),
        ],
      ),

          
 const ListTile(
    contentPadding: EdgeInsets.only(left: 20, right: 20, top: 20),
    title: Text(
      'Dashboard',
      style: TextStyle(color: Colors.white),
    ),
    subtitle: Text(
      '10 items',
      style: TextStyle(color: Colors.blue),
    ),
    trailing: CircleAvatar(),
  ),

  Expanded(
        child: Container(
          padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
          child: GridView.count(
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            crossAxisCount: 2,
            childAspectRatio: .90,
            children: List.generate(1, (_) {
              return cardView("تقديم شكوى",context);
            }),
            
          ),
        ))]));
  
}


Widget cardView(label,BuildContext context){
  return
  GestureDetector(
  onTap:()=>_navigateToNextScreen(context) ,
  child: 

             Card(
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8)
                ),
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[const FlutterLogo(), Text(label)],
                  ),
                ),
              ));
}
 void _navigateToNextScreen(BuildContext context) {
    Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => const HomePage1(
           
            
          ),
          
        ));
  }
}  
          
          
        
  