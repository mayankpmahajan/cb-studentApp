import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:frontend/main.dart';

class GoogleSign extends StatefulWidget {
  const GoogleSign({super.key});

  @override
  State<GoogleSign> createState() => _GoogleSignState();
}

class _GoogleSignState extends State<GoogleSign> {
  GoogleSignIn signIn = GoogleSignIn();
  void googleSignIn() async {
    try {
      var user = await signIn.signIn(); // async gap
      print(user);
      if (user != null && mounted) {
        // Check if the widget is still mounted before using context
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const OnboardingForm()),
        );
      } else {
        print("Sign in cancelled");
      }
    } catch (e) {
      print("Error signing in: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Google sign in")),
      body: Center(
        child: TextButton(
          onPressed: googleSignIn,
          child: Text("Google sign in"),
        ),
      ),
    );
  }
}
