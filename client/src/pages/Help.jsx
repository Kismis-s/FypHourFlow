import React from "react";

export default function HelpSupportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Help & Support – <span className="text-blue-900">HourFlow</span></h1>
      <p className="mb-6">
        Welcome to the HourFlow Help & Support Center! Whether you're new or
        need help with a specific feature, you’ll find everything you need right
        here.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          🔍 Frequently Asked Questions (FAQs)
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>How do I create an account?</strong>
            <br />
            Click on "Sign Up," fill in your basic info, and verify your email
            to get started.
          </li>
          <li>
            <strong>How does time banking work on HourFlow?</strong>
            <br />
            Every hour you spend helping someone earns you 1 time credit, which
            you can use to request help from others.
          </li>
          <li>
            <strong>Can I exchange services outside my neighborhood?</strong>
            <br />
            Yes, HourFlow uses live location to match you with nearby users
            within your preferred distance range.
          </li>
          <li>
            <strong>How are service ratings calculated?</strong>
            <br />
            After a service is completed, both users rate each other. The
            average of these ratings appears on your profile.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">👥 Getting Started</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>How to Set Up Your Profile</li>
          <li>Posting and Accepting Service Requests</li>
          <li>Using Time as Currency</li>
          <li>Joining Skill Groups</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          🛠️ Troubleshooting & Technical Support
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Reset your password if you can't log in.</li>
          <li>
            Turn on your location and check permissions if you don't see nearby
            services.
          </li>
          <li>
            Refresh the page or contact support if you see an error during
            service confirmation.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📣 Report a Problem</h2>
        <p>
          Found a bug or issue? Fill out our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Bug Report Form
          </a>{" "}
          or email us at <strong>support@hourflow.com</strong>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">💬 Contact Us</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Email:</strong> support@hourflow.com
          </li>
          <li>
            <strong>Live Chat:</strong> Available 9AM–6PM (Mon–Fri)
          </li>
          <li>
            <strong>Phone Support:</strong> +1 (555) 123-4567
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          💡 Feedback & Suggestions
        </h2>
        <p>
          Have an idea or want a feature added? Let us know via our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Feedback Form
          </a>
        </p>
      </section>

     
    </div>
  );
}
