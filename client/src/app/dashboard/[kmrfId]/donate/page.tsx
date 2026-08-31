
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHandHoldingHeart,
  faCircleCheck,
  faMobileScreenButton,
  faBuildingColumns,
  faMoneyBillWave,
  faHeart,
  faCopy,
  faCheck,
  faInfoCircle,
  faShieldHalved,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import PaymentSuccess from "@/app/component/payment";

const donationAmounts = [500, 1000, 2000, 5000, 10000];

const donationPurposes = [
  "সাধারণ দান",
  "ছাদকায়ে জারিয়া",
  "ইফতার মাহফিল",
  "ওরস শরীফ",
  "মসজিদ ও মাদ্রাসা",
  "অন্যান্য",
];

const paymentMethods = [
  {
    id: "bkash",
    title: "বিকাশ",
    description: "অ্যাপ বা *247# ডায়াল করে পাঠান",
    icon: faMobileScreenButton,
    color: "bg-[#D12053]",
  },
  {
    id: "nagad",
    title: "নগদ",
    description: "অ্যাপ বা *167# ডায়াল করে পাঠান",
    icon: faMobileScreenButton,
    color: "bg-[#F7921E]",
  },
  {
    id: "bank",
    title: "ব্যাংক ট্রান্সফার",
    description: "যেকোনো ব্যাংক অ্যাকাউন্ট থেকে",
    icon: faBuildingColumns,
    color: "bg-[#0F4A38]",
  },
  {
    id: "cash",
    title: "সরাসরি (অফিস)",
    description: "অফিসে সরাসরি নগদ প্রদান",
    icon: faMoneyBillWave,
    color: "bg-[#A6791E]",
  },
];

// English number -> Bangla number
const toBanglaNumber = (value: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/\d/g, (digit) => {
    return banglaDigits[Number(digit)];
  });
};

// Bangla number -> English number
const toEnglishNumber = (value: string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return value
    .replace(/[০-৯]/g, (digit) => {
      return String(banglaDigits.indexOf(digit));
    })
    .replace(/\D/g, "");
};

// Number formatting
const formatBanglaAmount = (value: number) => {
  return new Intl.NumberFormat("bn-BD").format(value);
};

export default function DonatePage() {
  const params = useParams<{ kmrfId: string }>();

  const kmrfId = params?.kmrfId;

  // -------------------------------------------------------------------------
  // Amount
  // -------------------------------------------------------------------------

  const [amount, setAmount] = useState<number>(1000);

  const [customAmount, setCustomAmount] = useState<string>("");

  // -------------------------------------------------------------------------
  // Donation information
  // -------------------------------------------------------------------------

  const [purpose, setPurpose] =
    useState<string>("সাধারণ দান");

  const [paymentMethod, setPaymentMethod] =
    useState<string>("bkash");

  const [transactionId, setTransactionId] =
    useState<string>("");

  const [senderNumber, setSenderNumber] =
    useState<string>("");

  const [anonymous, setAnonymous] =
    useState<boolean>(false);

  const [agree, setAgree] =
    useState<boolean>(false);

  // -------------------------------------------------------------------------
  // UI states
  // -------------------------------------------------------------------------

  const [submitting, setSubmitting] =
    useState<boolean>(false);

  const [copiedNumber, setCopiedNumber] =
    useState<boolean>(false);

  const [successMessage, setSuccessMessage] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] =
    useState<string>("");

  // -------------------------------------------------------------------------
  // Successful donation data
  // -------------------------------------------------------------------------

  const [successData, setSuccessData] = useState<{
    amount: number;
    purpose: string;
    paymentMethod: string;
    transactionId: string;
    date: string;
  } | null>(null);

  // -------------------------------------------------------------------------
  // Merchant numbers
  // -------------------------------------------------------------------------

  const merchantBkashNumber = "01768674289";
  const merchantNagadNumber = "01768674289";

  // -------------------------------------------------------------------------
  // Selected amount
  // -------------------------------------------------------------------------

  const selectedAmount = customAmount
    ? Number(customAmount)
    : amount;

  // -------------------------------------------------------------------------
  // Select preset amount
  // -------------------------------------------------------------------------

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
    setErrorMessage("");
  };

  // -------------------------------------------------------------------------
  // Custom amount
  // -------------------------------------------------------------------------

  const handleCustomAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    const englishValue =
      toEnglishNumber(inputValue);

    setCustomAmount(englishValue);

    // Custom amount থাকলে preset amount reset
    if (englishValue) {
      setAmount(0);
    } else {
      setAmount(1000);
    }

    setErrorMessage("");
  };

  // -------------------------------------------------------------------------
  // Copy merchant number
  // -------------------------------------------------------------------------

  const handleCopyNumber = async (
    number: string
  ) => {
    try {
      await navigator.clipboard.writeText(number);

      setCopiedNumber(true);

      setTimeout(() => {
        setCopiedNumber(false);
      }, 2000);
    } catch {
      setErrorMessage(
        "নম্বর কপি করা যায়নি।"
      );
    }
  };

  // -------------------------------------------------------------------------
  // Payment method change
  // -------------------------------------------------------------------------

  const handlePaymentMethodChange = (
    method: string
  ) => {
    setPaymentMethod(method);

    setTransactionId("");
    setSenderNumber("");
    setErrorMessage("");
  };

  // -------------------------------------------------------------------------
  // Submit donation
  // -------------------------------------------------------------------------

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccessMessage(false);
    setErrorMessage("");

    // -----------------------------------------------------------------------
    // KMRF ID
    // -----------------------------------------------------------------------

    if (!kmrfId) {
      setErrorMessage(
        "KMRF ID পাওয়া যায়নি।"
      );
      return;
    }

    // -----------------------------------------------------------------------
    // Amount
    // -----------------------------------------------------------------------

    const numericAmount = Number(
      selectedAmount
    );

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setErrorMessage(
        "সঠিক দানের পরিমাণ প্রদান করুন।"
      );
      return;
    }

    if (numericAmount < 1) {
      setErrorMessage(
        "দানের পরিমাণ কমপক্ষে ১ টাকা হতে হবে।"
      );
      return;
    }

    // -----------------------------------------------------------------------
    // bKash / Nagad transaction ID
    // -----------------------------------------------------------------------

    if (
      (paymentMethod === "bkash" ||
        paymentMethod === "nagad") &&
      !transactionId.trim()
    ) {
      setErrorMessage(
        "অনুগ্রহ করে Transaction ID প্রদান করুন।"
      );
      return;
    }

    // -----------------------------------------------------------------------
    // Sender number
    // -----------------------------------------------------------------------

    if (
      (paymentMethod === "bkash" ||
        paymentMethod === "nagad") &&
      senderNumber &&
      !/^01\d{9}$/.test(senderNumber)
    ) {
      setErrorMessage(
        "সঠিক মোবাইল নম্বর প্রদান করুন।"
      );
      return;
    }

    // -----------------------------------------------------------------------
    // Agreement
    // -----------------------------------------------------------------------

    if (!agree) {
      setErrorMessage(
        "শর্তাবলীতে সম্মতি প্রদান করুন।"
      );
      return;
    }

    try {
      setSubmitting(true);

      const donationData = {
        kmrfId,

        // Backend-এ number যাবে
        amount: numericAmount,

        purpose,

        paymentMethod,

        senderNumber:
          senderNumber.trim() || null,

        transactionId:
          transactionId.trim() || null,

        anonymous,
      };

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api";

      const response = await fetch(
        `${ apiUrl }/donations`,
{
  method: "POST",

    headers: {
    "Content-Type": "application/json",
          },

  body: JSON.stringify(
    donationData
  ),
        }
      );

const data = await response.json();

if (!response.ok) {
  throw new Error(
    data?.message ||
    "Donation submit করতে সমস্যা হয়েছে।"
  );
}

// ---------------------------------------------------------------------
// Success data save
// ---------------------------------------------------------------------

const paymentMethodTitle =
  paymentMethods.find(
    (method) =>
      method.id === paymentMethod
  )?.title || paymentMethod;

setSuccessData({
  amount: numericAmount,

  purpose,

  paymentMethod:
    paymentMethodTitle,

  transactionId:
    transactionId.trim(),

  date: new Date().toLocaleDateString(
    "bn-BD",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ),
});

// ---------------------------------------------------------------------
// Reset fields
// ---------------------------------------------------------------------

setTransactionId("");
setSenderNumber("");
setAgree(false);

// ---------------------------------------------------------------------
// Show success page
// ---------------------------------------------------------------------

setSuccessMessage(true);
    } catch (error) {
  console.error(
    "Donation submit error:",
    error
  );

  setErrorMessage(
    error instanceof Error
      ? error.message
      : "দান সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
  );
} finally {
  setSubmitting(false);
}
  };

// -------------------------------------------------------------------------
// Success page
// -------------------------------------------------------------------------

if (successMessage && successData) {
  return (
    <PaymentSuccess
      data={{
        amount: successData.amount,
        purpose: successData.purpose,
        paymentMethod:
          successData.paymentMethod,
        transactionId:
          successData.transactionId,
        date: successData.date,
      }}
    />
  );
}

// -------------------------------------------------------------------------
// Main page
// -------------------------------------------------------------------------

return (
  <div className="min-h-screen bg-[#F7F5EF] pb-28 font-sans antialiased sm:pb-10">

    {/* ------------------------------------------------------------------ */}
    {/* Header */}
    {/* ------------------------------------------------------------------ */}

    <header className="sticky top-0 z-30 border-b border-[#0A362A] bg-gradient-to-br from-[#0F4A38] to-[#0A362A] shadow-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              window.history.back()
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-sm"
            />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              দান করুন
            </h1>

            <p className="text-sm text-emerald-100/80">
              আপনার দান একটি সুন্দর ভবিষ্যৎ
              গড়তে সহায়তা করবে
            </p>
          </div>

        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-sm sm:flex">

          <FontAwesomeIcon
            icon={faHeart}
            className="text-xs text-red-300"
          />

          <span>
            সওয়াবের নিয়তে
          </span>

        </div>

      </div>
    </header>

    {/* ------------------------------------------------------------------ */}
    {/* Main */}
    {/* ------------------------------------------------------------------ */}

    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Error */}

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Amount */}
        {/* ---------------------------------------------------------------- */}

        <section className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-emerald-900/10 px-5 py-4 sm:px-6">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-900/5 text-[#0F4A38]">
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#16241D]">
                ১. দানের পরিমাণ
              </h2>

              <p className="text-sm text-[#5A6B62]">
                আপনার পছন্দের পরিমাণ নির্বাচন করুন
              </p>
            </div>

          </div>

          <div className="space-y-4 p-5 sm:p-6">

            {/* Preset amounts */}

            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">

              {donationAmounts.map(
                (value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      handleAmountSelect(
                        value
                      )
                    }
                    className={`rounded-xl border py-3 text-base font-bold transition-all active:scale-95 ${amount === value &&
                        !customAmount
                        ? "border-[#0F4A38] bg-[#0F4A38] text-white"
                        : "border-emerald-900/10 bg-[#FAF8F5] text-[#16241D] hover:border-[#0F4A38]"
                      }`}
                  >
                    ৳
                    {formatBanglaAmount(
                      value
                    )}
                  </button>
                )
              )}

            </div>

            {/* Custom amount */}

            <div>

              <label className="mb-1.5 block text-sm font-semibold text-[#16241D]">
                অথবা নিজের পরিমাণ লিখুন
              </label>

              <div className="flex items-center rounded-xl border border-emerald-900/10 bg-[#FAF8F5] px-4 transition focus-within:border-[#0F4A38] focus-within:ring-2 focus-within:ring-emerald-900/10">

                <span className="text-lg font-bold text-[#0F4A38]">
                  ৳
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  value={
                    customAmount
                      ? toBanglaNumber(
                        customAmount
                      )
                      : ""
                  }
                  onChange={
                    handleCustomAmount
                  }
                  placeholder="যেমন: ১৫০০"
                  className="w-full bg-transparent px-3 py-3 text-base font-bold text-[#16241D] outline-none"
                />

              </div>

            </div>

            {/* Selected amount */}

            <div className="flex items-center justify-between rounded-xl bg-emerald-900/5 px-4 py-3">

              <span className="text-sm font-semibold text-[#5A6B62]">
                নির্বাচিত দানের পরিমাণ
              </span>

              <span className="text-lg font-extrabold text-[#0F4A38]">
                ৳
                {selectedAmount > 0
                  ? formatBanglaAmount(
                    selectedAmount
                  )
                  : "০"}
              </span>

            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Purpose */}
        {/* ---------------------------------------------------------------- */}

        <section className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">

          <div className="border-b border-emerald-900/10 px-5 py-4 sm:px-6">

            <h2 className="text-base font-bold text-[#16241D]">
              ২. দানের উদ্দেশ্য
            </h2>

            <p className="text-sm text-[#5A6B62]">
              আপনার দানটি কোন খাতে ব্যবহার করা হবে?
            </p>

          </div>

          <div className="p-5 sm:p-6">

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

              {donationPurposes.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setPurpose(item)
                    }
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-semibold transition-all ${purpose === item
                        ? "border-[#0F4A38] bg-emerald-900/5 text-[#0F4A38]"
                        : "border-emerald-900/10 bg-[#FAF8F5] text-[#16241D] hover:border-[#0F4A38]"
                      }`}
                  >
                    <span>
                      {item}
                    </span>

                    {purpose === item && (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                      />
                    )}
                  </button>
                )
              )}

            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Payment */}
        {/* ---------------------------------------------------------------- */}

        <section className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">

          <div className="border-b border-emerald-900/10 px-5 py-4 sm:px-6">

            <h2 className="text-base font-bold text-[#16241D]">
              ৩. পেমেন্ট পদ্ধতি
            </h2>

            <p className="text-sm text-[#5A6B62]">
              আপনার সুবিধামতো একটি পদ্ধতি নির্বাচন করুন
            </p>

          </div>

          <div className="space-y-5 p-5 sm:p-6">

            {/* Payment methods */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {paymentMethods.map(
                (method) => {
                  const selected =
                    paymentMethod ===
                    method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        handlePaymentMethodChange(
                          method.id
                        )
                      }
                      className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${selected
                          ? "border-[#0F4A38] bg-emerald-900/5"
                          : "border-emerald-900/10 bg-[#FAF8F5] hover:border-[#0F4A38]"
                        }`}
                    >

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${method.color}`}
                      >
                        <FontAwesomeIcon
                          icon={method.icon}
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-[#16241D]">
                          {method.title}
                        </p>

                        <p className="mt-0.5 text-xs text-[#5A6B62]">
                          {method.description}
                        </p>

                      </div>

                      {selected && (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-[#0F4A38]"
                        />
                      )}

                    </button>
                  );
                }
              )}

            </div>

            {/* ------------------------------------------------------------ */}
            {/* bKash / Nagad */}
            {/* ------------------------------------------------------------ */}

            {(paymentMethod ===
              "bkash" ||
              paymentMethod ===
              "nagad") && (
                <div className="space-y-4 rounded-xl border border-emerald-900/10 bg-[#FCFBF8] p-4 sm:p-5">

                  <div className="flex items-center justify-between gap-3 border-b border-emerald-900/10 pb-3">

                    <div>

                      <span className="text-xs font-bold uppercase tracking-wider text-[#75857B]">
                        {paymentMethod ===
                          "bkash"
                          ? "বিকাশ"
                          : "নগদ"}{" "}
                        পার্সোনাল নম্বর
                      </span>

                      <p className="text-lg font-extrabold text-[#16241D]">
                        {paymentMethod ===
                          "bkash"
                          ? merchantBkashNumber
                          : merchantNagadNumber}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyNumber(
                          paymentMethod ===
                            "bkash"
                            ? merchantBkashNumber
                            : merchantNagadNumber
                        )
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-900/10 px-3 py-1.5 text-sm font-semibold text-[#0F4A38] hover:bg-emerald-900/5"
                    >

                      <FontAwesomeIcon
                        icon={
                          copiedNumber
                            ? faCheck
                            : faCopy
                        }
                      />

                      <span>
                        {copiedNumber
                          ? "কপি হয়েছে"
                          : "কপি করুন"}
                      </span>

                    </button>

                  </div>

                  {/* Payment instructions */}

                  <div className="rounded-lg bg-emerald-900/5 p-3 text-sm">

                    <p className="mb-2 flex items-center gap-1.5 font-bold text-[#0F4A38]">

                      <FontAwesomeIcon
                        icon={faInfoCircle}
                      />

                      পেমেন্ট করার নিয়ম

                    </p>

                    <ol className="list-inside list-decimal space-y-1 text-[#5A6B62]">

                      <li>
                        আপনার{" "}
                        {paymentMethod ===
                          "bkash"
                          ? "bKash"
                          : "Nagad"}{" "}
                        অ্যাপে যান।
                      </li>

                      <li>
                        Send Money নির্বাচন করুন।
                      </li>

                      <li>
                        উপরের নম্বরে টাকা পাঠান।
                      </li>

                      <li>
                        পেমেন্ট সফল হলে Transaction ID নিচে লিখুন।
                      </li>

                    </ol>

                  </div>

                  {/* Sender + Transaction */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>

                      <label className="mb-1.5 block text-sm font-semibold text-[#16241D]">
                        আপনার{" "}
                        {paymentMethod ===
                          "bkash"
                          ? "বিকাশ"
                          : "নগদ"}{" "}
                        নম্বর
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={senderNumber}
                        onChange={(e) =>
                          setSenderNumber(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        maxLength={11}
                        placeholder="017XXXXXXXX"
                        className="w-full rounded-lg border border-emerald-900/10 px-3 py-3 text-sm font-medium text-[#16241D] outline-none focus:border-[#0F4A38] focus:ring-2 focus:ring-emerald-900/10"
                      />

                    </div>

                    <div>

                      <label className="mb-1.5 block text-sm font-semibold text-[#16241D]">
                        Transaction ID{" "}
                        <span className="text-[#C0392B]">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) =>
                          setTransactionId(
                            e.target.value.toUpperCase()
                          )
                        }
                        placeholder="যেমন: 9J7A6K8L2M"
                        className="w-full rounded-lg border border-emerald-900/10 px-3 py-3 text-sm font-bold tracking-wider text-[#16241D] outline-none focus:border-[#0F4A38] focus:ring-2 focus:ring-emerald-900/10"
                      />

                    </div>

                  </div>

                </div>
              )}

            {/* ------------------------------------------------------------ */}
            {/* Bank */}
            {/* ------------------------------------------------------------ */}

            {paymentMethod === "bank" && (
              <div className="space-y-3 rounded-xl border border-emerald-900/10 bg-emerald-900/5 p-4 sm:p-5">

                <p className="border-b border-emerald-900/10 pb-2 font-bold text-[#0F4A38]">
                  ব্যাংক অ্যাকাউন্টের বিবরণ
                </p>

                {[
                  [
                    "ব্যাংকের নাম",
                    "ইসলামী ব্যাংক বাংলাদেশ",
                  ],
                  [
                    "অ্যাকাউন্ট নাম",
                    "KMRF Foundation",
                  ],
                  [
                    "অ্যাকাউন্ট নম্বর",
                    "2050123456789",
                  ],
                  [
                    "শাখা",
                    "ধানমন্ডি শাখা, ঢাকা",
                  ],
                ].map(
                  ([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg bg-white px-3 py-2"
                    >

                      <div className="text-xs font-semibold text-[#75857B]">
                        {label}
                      </div>

                      <div className="font-bold text-[#16241D]">
                        {value}
                      </div>

                    </div>
                  )
                )}

              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* Cash */}
            {/* ------------------------------------------------------------ */}

            {paymentMethod === "cash" && (
              <div className="rounded-xl border border-[#A6791E]/20 bg-[#A6791E]/10 p-4 text-sm text-[#5A6B62]">

                <p className="mb-1 flex items-center gap-1.5 font-bold text-[#A6791E]">

                  <FontAwesomeIcon
                    icon={faInfoCircle}
                  />

                  সরাসরি নগদ প্রদান

                </p>

                অনুগ্রহ করে অফিস চলাকালীন সময়ে আমাদের
                অফিসে এসে দান প্রদান করুন। রসিদ সংগ্রহ
                করতে ভুলবেন না।

              </div>
            )}

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Donor */}
        {/* ---------------------------------------------------------------- */}

        <section className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">

          <div className="space-y-4 p-5 sm:p-6">

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) =>
                  setAnonymous(
                    e.target.checked
                  )
                }
                className="mt-1 h-4 w-4 accent-[#0F4A38]"
              />

              <div>

                <span className="block text-sm font-bold text-[#16241D]">
                  বেনামে দান করতে চাই
                </span>

                <span className="block text-sm text-[#5A6B62]">
                  পাবলিক ড্যাশবোর্ডে আপনার নাম গোপন রাখা হবে
                </span>

              </div>

            </label>

            <label className="flex cursor-pointer items-start gap-3 border-t border-emerald-900/10 pt-4">

              <input
                type="checkbox"
                checked={agree}
                onChange={(e) =>
                  setAgree(
                    e.target.checked
                  )
                }
                className="mt-1 h-4 w-4 accent-[#0F4A38]"
              />

              <span className="text-sm leading-relaxed text-[#5A6B62]">
                আমি নিশ্চিত করছি যে প্রদত্ত তথ্য সঠিক এবং
                প্রতিষ্ঠানের শর্তাবলীতে সম্মত।
              </span>

            </label>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Trust */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2 text-sm font-medium text-[#75857B]">

          <span className="flex items-center gap-1.5">

            <FontAwesomeIcon
              icon={faShieldHalved}
              className="text-[#0F4A38]"
            />

            নিরাপদ ও যাচাইকৃত লেনদেন

          </span>

          <span className="flex items-center gap-1.5">

            <FontAwesomeIcon
              icon={faLock}
              className="text-[#0F4A38]"
            />

            আপনার তথ্য সুরক্ষিত থাকবে

          </span>

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Submit */}
        {/* ---------------------------------------------------------------- */}

        <button
          type="submit"
          disabled={submitting}
          className="hidden w-full items-center justify-center gap-2.5 rounded-xl bg-[#0F4A38] py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#0A362A] disabled:cursor-not-allowed disabled:opacity-60 sm:flex"
        >

          <FontAwesomeIcon
            icon={faHandHoldingHeart}
          />

          {submitting
            ? "প্রক্রিয়া চলছে..."
            : `৳${selectedAmount > 0
              ? formatBanglaAmount(
                selectedAmount
              )
              : "০"
            } দান সম্পন্ন করুন`}

        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Submit */}
        {/* ---------------------------------------------------------------- */}

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-emerald-900/10 bg-white/95 px-4 py-3 backdrop-blur-md sm:hidden">

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0F4A38] py-3.5 text-base font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >

            <FontAwesomeIcon
              icon={faHandHoldingHeart}
            />

            {submitting
              ? "প্রক্রিয়া চলছে..."
              : `৳${selectedAmount > 0
                ? formatBanglaAmount(
                  selectedAmount
                )
                : "০"
              } দান সম্পন্ন করুন`}

          </button>

        </div>

      </form>

    </main>
  </div>
);
}

