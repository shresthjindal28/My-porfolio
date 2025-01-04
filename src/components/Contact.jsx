import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        "service_oup4jwd",
        "template_7acuogl",
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          reply_to: formData.email,
          message: formData.message,
        },
        "yAd2NYh-wFQ-Yxezp"
      );

      if (result.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          {/* Chat bubble icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img 
                src="https://img.icons8.com/fluency/48/speech-bubble-with-dots.png" 
                alt="chat-bubble" 
                className="w-8 h-8"
              />
            </div>
          {/* Heading */}
          <h2 className="text-4xl font-bold text-white">Get In Touch</h2>
          </div>
          {/* Description */}
          <p className="mt-2 text-sm text-gray-400">
            Have questions or just want to say hello? Fill out the form below,
            and we’ll get back to you as soon as possible!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-transparent backdrop-blur-sm p-6 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="Last Name"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Email Address"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Your Message"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          {status && (
            <p className="text-center text-sm text-white mt-4">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
