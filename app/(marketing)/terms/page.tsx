export default function TermsPage() {
  return (
    <div className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-4xl mx-auto text-slate_gray">
          <h1 className="text-midnight_navy">Terms of Service</h1>
          <p className="lead">
            Welcome to DripPay! These Terms of Service ("Terms") govern your access to and use of the DripPay protocol,
            website, and services (collectively, the "Services"). Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do
            not agree to these Terms, do not use our Services.
          </p>

          <h2>2. The DripPay Protocol</h2>
          <p>
            DripPay is a decentralized billing protocol that enables automated, recurring crypto payments via smart
            contracts. The protocol is non-custodial, meaning DripPay never takes control of users' funds. Transactions
            are processed directly on the blockchain by smart contracts.
          </p>

          <h2>3. Your Responsibilities</h2>
          <ul>
            <li>
              You are responsible for the security of your wallet, private keys, and any other credentials used to
              access the Services.
            </li>
            <li>You are responsible for complying with all applicable laws and regulations in your jurisdiction.</li>
            <li>You agree not to use the Services for any illegal or unauthorized purpose.</li>
          </ul>

          <h2>4. Fees and Payments</h2>
          <p>
            Certain services offered by DripPay may be subject to fees. Any applicable fees will be disclosed to you
            prior to your use of the service. Blockchain transaction fees (gas fees) are not controlled by DripPay and
            are a standard part of using blockchain networks.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The DripPay name, logo, and all related names, logos, product and service names, designs, and slogans are
            trademarks of DripPay or its affiliates or licensors. You must not use such marks without the prior written
            permission of DripPay.
          </p>

          <h2>6. Disclaimers and Limitation of Liability</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED. DRIPPAY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            IN NO EVENT SHALL DRIPPAY BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            EXEMPLARY DAMAGES... (Standard limitation of liability clause).
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new
            Terms on this page. Your continued use of the Services after any such change constitutes your acceptance of
            the new Terms.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@drippay.xyz">legal@drippay.xyz</a>.
          </p>
          <p className="text-sm text-slate_gray/70">Last updated: May 30, 2025</p>
        </article>
      </div>
    </div>
  )
}
