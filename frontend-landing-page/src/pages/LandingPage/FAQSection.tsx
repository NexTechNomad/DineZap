import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Do I need to download an app?",
      answer:
        "No, DineZap is completely web-based. Simply scan the QRCode on your table with your phone's camera to instantly access the menu, place orders, and pay! no app downloads required!",
    },
    {
      question: "How does the ordering system work?",
      answer:
        "Our real time ordering system lets you place and track your orders instantly through your phone's browser. You can see your order status, make special requests, and even notify staff directly all from the same interface.",
    },
    {
      question: "What if my food arrives incorrectly?",
      answer:
        "If there's any issue with your order, simply notify the staff through the same QRCode interface.",
    },
    {
      question: "Is my payment info secure?",
      answer:
        "Absolutely! We use industry standard security protocols and trusted payment gateways like Paystack to process all transactions. Your payment information is encrypted and never stored on our servers, ensuring safe and secure payments every time.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center gap-4 mb-12"
      >
        <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
        <h2 className="text-4xl font-medium tracking-[0.2rem]">FAQ</h2>
        <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto space-y-4"
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white rounded-lg overflow-hidden shadow-sm border-l-2 ${
              openIndex === index
                ? "border-main-amber/50"
                : "border-main-purple/50"
            }`}
          >
            <motion.button
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-main-slateGray/10"
              onClick={() => toggleFAQ(index)}
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <motion.svg
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-main-slateGray/10">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQSection;
