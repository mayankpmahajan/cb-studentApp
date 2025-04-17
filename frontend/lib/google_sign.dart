import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:frontend/main.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:google_sign_in_platform_interface/google_sign_in_platform_interface.dart';

class GoogleSign extends StatefulWidget {
  const GoogleSign({super.key});

  @override
  State<GoogleSign> createState() => _GoogleSignState();
}

class _GoogleSignState extends State<GoogleSign> {
  // Configure GoogleSignIn with your client ID for web
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    // This client ID will be used on web platform
    clientId: kIsWeb ? '168890524134-5sigpkr7korvan59cquhumqjv5l6gkvb.apps.googleusercontent.com' : null,
    scopes: [
      'email',
      'profile',
    ],
  );

  bool _isSigningIn = false;

  @override
  void initState() {
    super.initState();
    // Initialize web-specific configuration if needed
    if (kIsWeb) {
      _initializeWebSignIn();
    }
  }

  void _initializeWebSignIn() async {
    // Initialize the platform-specific sign-in with parameters if required
    // This is only necessary for web
    if (kIsWeb) {
      final GoogleSignInPlatform platform = GoogleSignInPlatform.instance;
      await platform.initWithParams(const SignInInitParameters(
        clientId: 'your-client_id.apps.googleusercontent.com',
      ));
    }
  }

  Future<void> googleSignIn() async {
    setState(() {
      _isSigningIn = true;
    });

    try {
      final user = await _googleSignIn.signIn();
      print(user);
      if (user != null && mounted) {
        // Handle successful sign-in
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const OnboardingForm()),
        );
      } else {
        print("Sign in cancelled or failed");
      }
    } catch (e) {
      print("Error signing in: $e");
    } finally {
      if (mounted) {
        setState(() {
          _isSigningIn = false;
        });
      }
    }
  }

  Future<void> signOut() async {
    try {
      await _googleSignIn.signOut();
      print("Signed out successfully");
    } catch (e) {
      print("Error signing out: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Google Sign In")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (_isSigningIn)
              const CircularProgressIndicator()
            else
              ElevatedButton.icon(
                onPressed: googleSignIn,
                icon: Image.network(
                  'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
                  height: 24,
                  width: 24,
                ),
                label: const Text("Sign in with Google"),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 16,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}