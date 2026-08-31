
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faDownload,
  faHouse,
  faHeart,
  faCopy,
  faCheck,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export interface PaymentSuccessProps {
  data: {
    donorName?: string;
    amount: string | number;
    purpose: string;
    paymentMethod: string;
    transactionId?: string | null;
    date?: string;
  };

  onHomeClick?: () => void;
  onDownloadReceipt?: () => void;
}

// English number -> Bangla number
const toBanglaNumber = (value: string | number) => {
  const banglaDigits: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return String(value)
    .replace(/\d/g, (digit) => banglaDigits[digit])
    .replace(/,/g, "৹");
};

// Amount formatting
const formatAmount = (amount: string | number) => {
  const numericAmount = Number(
    String(amount).replace(/[^\d]/g, "")
  );

  if (!numericAmount || numericAmount <= 0) {
    return "০";
  }

  return numericAmount
    .toLocaleString("en-US")
    .replace(/\d/g, (digit) => {
      const banglaDigits: Record<string, string> = {
        "0": "০",
        "1": "১",
        "2": "২",
        "3": "৩",
        "4": "৪",
        "5": "৫",
        "6": "৬",
        "7": "৭",
        "8": "৮",
        "9": "৯",
      };

      return banglaDigits[digit];
    });
};

// Payment method display name
const getPaymentMethodName = (method: string) => {
  const methods: Record<string, string> = {
    bkash: "বিকাশ",
    nagad: "নগদ",
    bank: "ব্যাংক ট্রান্সফার",
    cash: "সরাসরি (অফিস)",
  };

  return methods[method] || method;
};

export default function PaymentSuccess({
  data,
  onHomeClick,
  onDownloadReceipt,
}: PaymentSuccessProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyTrx = async () => {
    if (!data.transactionId) return;

    try {
      await navigator.clipboard.writeText(
        data.transactionId
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Transaction ID কপি করা যায়নি।");
    }
  };

  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
      return;
    }

    window.print();
  };

  const amount = formatAmount(data.amount);

  const paymentMethod = getPaymentMethodName(
    data.paymentMethod
  );

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-8 font-sans selection:bg-emerald-100 sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-[rgba(15,74,56,0.12)] bg-white p-5 text-center shadow-xl sm:p-8">

        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-5xl"
          />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-black text-[#1A2E26]">
          জাযাকাল্লাহু খাইরান!
        </h2>

        <p className="mt-2 text-xs font-medium leading-relaxed text-[#556B61]">
          আপনার দান সফলভাবে গৃহীত হয়েছে।
          আল্লাহ আপনার এই অবদানে বরকত ও উত্তম
          প্রতিদান দান করুন।
        </p>

        {/* Receipt */}
        <div className="mt-6 space-y-3 rounded-2xl border border-[rgba(15,74,56,0.12)] bg-[#FAF8F5] p-4 text-left">

          {/* Receipt Header */}
          <div className="flex items-center justify-between border-b border-[rgba(15,74,56,0.12)] pb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
              <FontAwesomeIcon
                icon={faReceipt}
                className="text-emerald-700"
              />

              ডিজিটাল রসিদ
            </span>

            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
              সফল
            </span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-gray-500">
              দানের পরিমাণ
            </span>

            <span className="text-xl font-black text-[#0F4A38]">
              ৳{amount}
            </span>
          </div>

          {/* Purpose */}
          <div className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-xs font-medium text-gray-500">
              দানের উদ্দেশ্য
            </span>

            <span className="text-right text-xs font-bold text-[#1A2E26]">
              {data.purpose}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-gray-500">
              পেমেন্ট মাধ্যম
            </span>

            <span className="text-right text-xs font-bold text-[#1A2E26]">
              {paymentMethod}
            </span>
          </div>

          {/* Donor */}
          {data.donorName && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-gray-500">
                দাতার নাম
              </span>

              <span className="text-right text-xs font-bold text-[#1A2E26]">
                {data.donorName}
              </span>
            </div>
          )}

          {/* Date */}
          {data.date && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-gray-500">
                তারিখ
              </span>

              <span className="text-right text-xs font-semibold text-gray-700">
                {data.date}
              </span>
            </div>
          )}

          {/* Transaction ID */}
          {data.transactionId && (
            <div className="flex items-center justify-between gap-3 border-t border-[rgba(15,74,56,0.12)] pt-3">
              <span className="shrink-0 text-xs font-medium text-gray-500">
                ট্রানজেকশন আইডি
              </span>

              <button
                type="button"
                onClick={handleCopyTrx}
                className="flex min-w-0 items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-emerald-50 px-2 py-1 text-xs font-bold text-[#0F4A38] transition hover:bg-emerald-100 active:scale-95"
              >
                <span className="truncate font-mono">
                  {data.transactionId}
                </span>

                <FontAwesomeIcon
                  icon={copied ? faCheck : faCopy}
                  className="shrink-0 text-[10px]"
                />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">

          {/* Download */}
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[rgba(15,74,56,0.20)] py-3 text-xs font-bold text-[#0F4A38] transition hover:bg-emerald-50 active:scale-95"
          >
            <FontAwesomeIcon icon={faDownload} />

            <span>
              রসিদ ডাউনলোড করুন
            </span>
          </button>

          {/* Home */}
          <button
            type="button"
            onClick={
              onHomeClick ||
              (() => {
                window.location.href = "/";
              })
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0F4A38] py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0A362A] active:scale-95"
          >
            <FontAwesomeIcon icon={faHouse} />

            <span>
              হোমপেজে ফিরে যান
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-[10px] text-red-400"
          />

          <span>
            আমাদের সাথে থাকার জন্য ধন্যবাদ
          </span>
        </div>
      </div>
    </div>
  );
}

