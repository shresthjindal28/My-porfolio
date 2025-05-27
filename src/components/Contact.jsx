import  { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", success: null });

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", success: null });

    // Validate form data
    if (!formData.email || !formData.message) {
      setStatus({
        message: "Please fill all required fields",
        success: false
      });
      setLoading(false);
      return;
    }

    // Prepare template parameters with proper field mapping
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      reply_to: formData.email,
      message: formData.message
    };

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus({ 
          message: "Message sent successfully! I'll get back to you soon.", 
          success: true 
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ 
        message: `Failed to send message: ${error.text || "Unknown error"}. Please try again.`, 
        success: false 
      });
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg space-y-8"
      >
        <div className="text-center">
          <motion.div 
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 p-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Let&#39;s Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-gray-400"
          >
            Have a question or proposal, or just want to say hello? Go ahead.
          </motion.p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-transparent backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-800 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-3 bg-gray-900/70 text-gray-300 rounded-lg border border-gray-700 placeholder-transparent focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors duration-200"
                placeholder="First Name"
              />
              <label 
                htmlFor="firstName" 
                className="absolute -top-5 left-2 text-xs text-pink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-pink-400"
              >
                First Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-3 bg-gray-900/70 text-gray-300 rounded-lg border border-gray-700 placeholder-transparent focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors duration-200"
                placeholder="Last Name"
              />
              <label 
                htmlFor="lastName" 
                className="absolute -top-5 left-2 text-xs text-pink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-pink-400"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full px-4 py-3 bg-gray-900/70 text-gray-300 rounded-lg border border-gray-700 placeholder-transparent focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors duration-200"
              placeholder="Email Address"
            />
            <label 
              htmlFor="email" 
              className="absolute -top-5 left-2 text-xs text-pink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-pink-400"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="peer w-full px-4 py-3 bg-gray-900/70 text-gray-300 rounded-lg border border-gray-700 placeholder-transparent focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors duration-200"
              placeholder="Your Message"
            ></textarea>
            <label 
              htmlFor="message" 
              className="absolute -top-5 left-2 text-xs text-pink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-pink-400"
            >
              Your Message
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Message"}
          </motion.button>

          {status.message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-3 rounded-lg ${status.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>

        <div className="flex justify-center space-x-6 pt-4">
          {[
            { name: 'github', url: 'https://github.com/yourUsername' },
            { name: 'linkedin', url: 'https://linkedin.com/in/yourProfile' },
            { name: 'twitter', url: 'https://twitter.com/yourHandle' }
          ].map((social) => (
            <motion.a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
            >
              <span className="sr-only">{social.name}</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d={
                  social.name === 'github' 
                    ? "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    : social.name === 'linkedin'
                    ? "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    : "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                } clipRule="evenodd" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
