export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-4xl mx-auto text-slate_gray">
          <h1 className="text-midnight_navy">Privacy Policy</h1>
          <p className="lead">
            Your privacy is important to us. This Privacy Policy explains how DripPay ("we," "us," or "our") collects,
            uses, and discloses information about you when you access or use our website, protocol, and services
            (collectively, the "Services").
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Information You Provide:</strong> When you sign up for our waitlist, contact support, or otherwise
              communicate with us, you may provide us with personal information such as your email address, name, and
              project details.
            </li>
            <li>
              <strong>Blockchain Data:</strong> Our Services interact with public blockchains. Information related to
              your blockchain address and transactions (e.g., subscription payments facilitated by DripPay smart
              contracts) is publicly available and not controlled by DripPay. We do not collect or store your private
              keys.
            </li>
            <li>
              <strong>Usage Information:</strong> We may collect information about your use of our website, such as your
              IP address, browser type, operating system, pages visited, and the dates/times of your visits. This is
              typically done through standard server logs and analytics tools (e.g., Plausible, Google Analytics).
            </li>
            <li>
              <strong>Cookies:</strong> We may use cookies and similar tracking technologies to enhance your experience
              on our website. You can control cookies through your browser settings.
            </li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Services.</li>
            <li>Communicate with you, including responding to your inquiries and sending service updates.</li>
            <li>Process waitlist signups and manage early access programs.</li>
            <li>Analyze usage trends to improve our website and Services.</li>
            <li>Prevent fraud and ensure the security of our platform.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>3. How We Share Information</h2>
          <p>We do not sell your personal information. We may share information as follows:</p>
          <ul>
            <li>
              With service providers who perform services on our behalf (e.g., email providers, analytics providers),
              subject to confidentiality obligations.
            </li>
            <li>If required by law, such as to comply with a subpoena or other legal process.</li>
            <li>To protect the rights, property, or safety of DripPay, our users, or others.</li>
            <li>In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
          </ul>
          <p>Remember, blockchain transaction data is public by nature.</p>

          <h2>4. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfill the purposes for which it was collected,
            or as required by applicable laws or regulations.
          </p>

          <h2>5. Your Choices</h2>
          <p>
            You may opt-out of promotional communications by following the unsubscribe instructions in those emails. You
            can typically control cookies through your browser settings.
          </p>

          <h2>6. Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized
            access, disclosure, alteration, and destruction. However, no security system is impenetrable.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal
            information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the
            date at the bottom of this policy and, in some cases, we may provide additional notice (such as adding a
            statement to our homepage or sending you a notification).
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@drippay.xyz">privacy@drippay.xyz</a>.
          </p>
          <p className="text-sm text-slate_gray/70">Last updated: May 30, 2025</p>
        </article>
      </div>
    </div>
  )
}
