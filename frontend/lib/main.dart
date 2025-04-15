import 'package:flutter/material.dart';
import 'package:frontend/google_sign.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Onboarding App',
      theme: ThemeData(primarySwatch: Colors.indigo),
      // home: const OnboardingForm(),
      home: GoogleSign()
    );
  }
}

class OnboardingForm extends StatefulWidget {
  const OnboardingForm({super.key});

  @override
  State<OnboardingForm> createState() => _OnboardingFormState();
}

class _OnboardingFormState extends State<OnboardingForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();

  List<dynamic> centers = [];
  List<dynamic> courses = [];
  List<dynamic> batches = [];

  dynamic selectedCenter;
  dynamic selectedCourse;
  dynamic selectedBatch;

  @override
  void initState() {
    super.initState();
    fetchDropdownData();
  }

  Future<void> fetchDropdownData() async {
    final response =
        await http.get(Uri.parse('http://10.0.2.2:5000/api/v1/mappings/dropdown'));

    if (response.statusCode == 200) {
      try {
        final data = jsonDecode(response.body)['data'];
        if (mounted) {
          setState(() {
            centers = data['centers'];
            courses = data['courses'];
            batches = data['batches'];
          });
        }
      } catch (e) {
        debugPrint('Error parsing response: $e');
      }
    } else {
      debugPrint('Failed to fetch dropdown data: ${response.statusCode}');
    }
  }

  Future<void> submitForm() async {
    if (_formKey.currentState!.validate()) {
      final data = {
        'first_name': _firstNameController.text,
        'last_name': _lastNameController.text,
        'email': _emailController.text,
        'phone_number': _phoneController.text,
        'google_id': _phoneController.text, // Assuming google_id = phone_number
        'centre': selectedCenter?['id'],
        'course': selectedCourse?['id'],
        'batch': selectedBatch?['id'],
      };

      final response = await http.post(
        Uri.parse('http://10.0.2.2:5000/api/v1/student/onboarding'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );

      if (response.statusCode == 201) {
        final responseData = jsonDecode(response.body);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(responseData['message'])),
          );
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const FeedPage()),
          );
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to onboard student')),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Onboarding Form')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                TextFormField(
                  controller: _firstNameController,
                  decoration: const InputDecoration(labelText: 'First Name'),
                ),
                TextFormField(
                  controller: _lastNameController,
                  decoration: const InputDecoration(labelText: 'Last Name'),
                ),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                ),
                TextFormField(
                  controller: _phoneController,
                  decoration: const InputDecoration(labelText: 'Phone Number'),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField(
                  value: selectedCenter,
                  items: centers.map((center) {
                    return DropdownMenuItem(
                      value: center,
                      child: Text(center['name']),
                    );
                  }).toList(),
                  onChanged: (val) {
                    setState(() {
                      selectedCenter = val;
                    });
                  },
                  decoration: const InputDecoration(labelText: 'Center'),
                ),
                DropdownButtonFormField(
                  value: selectedCourse,
                  items: courses.map((course) {
                    return DropdownMenuItem(
                      value: course,
                      child: Text(course['name']),
                    );
                  }).toList(),
                  onChanged: (val) {
                    setState(() {
                      selectedCourse = val;
                    });
                  },
                  decoration: const InputDecoration(labelText: 'Course'),
                ),
                DropdownButtonFormField(
                  value: selectedBatch,
                  items: batches.map((batch) {
                    return DropdownMenuItem(
                      value: batch,
                      child: Text(batch['name']),
                    );
                  }).toList(),
                  onChanged: (val) {
                    setState(() {
                      selectedBatch = val;
                    });
                  },
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: submitForm,
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class FeedPage extends StatelessWidget {
  const FeedPage({super.key});

  final List<Map<String, String>> videos = const [
    {
      'title': 'Flutter Crash Course',
      'thumbnail': 'https://img.youtube.com/vi/x0uinJvhNxI/0.jpg',
      'url': 'https://www.youtube.com/watch?v=x0uinJvhNxI',
    },
    {
      'title': 'Learn Dart in 1 Hour',
      'thumbnail': 'https://img.youtube.com/vi/Ej_Pcr4uC2Q/0.jpg',
      'url': 'https://www.youtube.com/watch?v=Ej_Pcr4uC2Q',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Resources')),
      body: ListView.builder(
        itemCount: videos.length,
        itemBuilder: (context, index) {
          final video = videos[index];
          return Card(
            margin: const EdgeInsets.all(12),
            child: ListTile(
              leading: Image.network(
                video['thumbnail']!,
                width: 100,
                fit: BoxFit.cover,
              ),
              title: Text(video['title']!),
              onTap: () {
                showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: Text(video['title']!),
                    content: Text('Open video?\n${video['url']}'),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Close'),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                          // In a real app, you'd use url_launcher to open the video.
                        },
                        child: const Text('Open'),
                      ),
                    ],
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
