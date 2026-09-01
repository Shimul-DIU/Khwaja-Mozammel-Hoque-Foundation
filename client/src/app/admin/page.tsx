"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  HandHeart,
  FileEdit,
  Settings,
  Search,
  Check,
  X,
  Eye,
  ChevronRight,
  LogOut,
  Menu,
  Plus,
  Trash2,
  Moon,
  CreditCard,
  Banknote,
  Smartphone,
  RefreshCw,
  CircleDollarSign,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Status = "Pending" | "Approved" | "Rejected";

interface Scholarship {
  id: string;
  name: string;
  institution: string;
  program: string;
  email: string;
  phone: string;
  date: string;
  status: Status;
}

interface Sadka {
  id: string;
  name: string;
  reason: string;
  amount: string;
  email: string;
  phone: string;
  date: string;
  status: Status;
}

interface Donation {
  _id?: string;
  id?: string;

  kmrfId?: string;

  donorName?: string;
  name?: string;

  amount: number | string;

  purpose: string;

  paymentMethod: string;

  transactionId?: string | null;

  senderNumber?: string | null;

  anonymous?: boolean;

  date?: string;

  createdAt?: string;

  updatedAt?: string;

  status?: Status;

  email?: string;

  phone?: string;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const STATUS_STYLES: Record<Status, string> = {
  Pending:
    "bg-amber-50 text-amber-700 border-amber-200",

  Approved:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Rejected:
    "bg-rose-50 text-rose-700 border-rose-200",
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getApiUrl = () => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  return configuredUrl.replace(/\/$/, "");
};

const formatAmount = (value: number | string) => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "৳0";
  }

  return `৳${new Intl.NumberFormat("en-BD").format(
    numericValue
  )}`;
};

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* -------------------------------------------------------------------------- */
/* Donation Status Mapping                                                    */
/* -------------------------------------------------------------------------- */

const normalizeStatus = (
  status?: string
): Status => {
  if (
    status === "Approved" ||
    status === "verified"
  ) {
    return "Approved";
  }

  if (
    status === "Rejected" ||
    status === "rejected"
  ) {
    return "Rejected";
  }

  return "Pending";
};

/* -------------------------------------------------------------------------- */
/* Backend Donation -> Frontend Donation                                      */
/* -------------------------------------------------------------------------- */

const mapDonation = (row: any): Donation => {
  return {
    id:
      row.id !== undefined && row.id !== null
        ? String(row.id)
        : undefined,

    _id:
      row._id !== undefined && row._id !== null
        ? String(row._id)
        : row.id !== undefined && row.id !== null
          ? String(row.id)
          : undefined,

    kmrfId:
      row.kmrf_id ??
      row.kmrfId ??
      "",

    donorName:
      row.donor_name ??
      row.donorName ??
      row.name ??
      undefined,

    name:
      row.name ??
      row.donor_name ??
      row.donorName ??
      undefined,

    amount: row.amount ?? 0,

    purpose: row.purpose ?? "",

    paymentMethod:
      row.payment_method ??
      row.paymentMethod ??
      "",

    senderNumber:
      row.sender_number ??
      row.senderNumber ??
      null,

    transactionId:
      row.transaction_id ??
      row.transactionId ??
      null,

    anonymous: Boolean(row.anonymous),

    status: normalizeStatus(row.status),

    date:
      row.created_at ??
      row.date ??
      row.createdAt ??
      "",

    createdAt:
      row.created_at ??
      row.createdAt ??
      row.date ??
      "",

    updatedAt:
      row.updated_at ??
      row.updatedAt ??
      "",

    email: row.email ?? undefined,

    phone: row.phone ?? undefined,
  };
};

/* -------------------------------------------------------------------------- */
/* Donation Name                                                              */
/* -------------------------------------------------------------------------- */

const getDonationName = (
  donation: Donation
) => {
  if (donation.anonymous) {
    return "Anonymous Donor";
  }

  return (
    donation.donorName ||
    donation.name ||
    "Unknown Donor"
  );
};

/* -------------------------------------------------------------------------- */
/* Donation Date                                                              */
/* -------------------------------------------------------------------------- */

const getDonationDate = (
  donation: Donation
) => {
  return (
    donation.date ||
    donation.createdAt ||
    ""
  );
};

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  sub,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-stone-900">
            {value}
          </p>

          {sub && (
            <p
              className={`mt-1 text-xs font-medium ${accent || "text-stone-500"
                }`}
            >
              {sub}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: Status;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]
        }`}
    >
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Payment Icon                                                               */
/* -------------------------------------------------------------------------- */

function PaymentIcon({
  method,
}: {
  method: string;
}) {
  const value = method.toLowerCase();

  if (
    value === "bkash" ||
    value === "nagad"
  ) {
    return (
      <Smartphone className="h-4 w-4" />
    );
  }

  if (value === "bank") {
    return (
      <Banknote className="h-4 w-4" />
    );
  }

  if (value === "cash") {
    return (
      <Banknote className="h-4 w-4" />
    );
  }

  return (
    <CreditCard className="h-4 w-4" />
  );
}

/* -------------------------------------------------------------------------- */
/* Donation Table                                                             */
/* -------------------------------------------------------------------------- */

function DonationsTable({
  rows,
  onUpdateStatus,
  onView,
}: {
  rows: Donation[];
  onUpdateStatus: (
    id: string,
    status: Status
  ) => void;
  onView: (row: Donation) => void;
}) {
  const [query, setQuery] = useState("");

  const [filter, setFilter] =
    useState<"All" | Status>("All");

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const name =
        getDonationName(row);

      const searchText = [
        name,
        row.id,
        row._id,
        row.kmrfId,
        row.transactionId,
        row.purpose,
        row.paymentMethod,
        row.email,
        row.phone,
        row.senderNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        searchText.includes(
          query.toLowerCase()
        );

      const matchesFilter =
        filter === "All" ||
        normalizeStatus(row.status) ===
        filter;

      return (
        matchesQuery &&
        matchesFilter
      );
    });
  }, [rows, query, filter]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-900">
            Donation Payments
          </h2>

          <p className="mt-0.5 text-xs text-stone-500">
            User payment submissions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search donation..."
              className="w-64 rounded-lg border border-stone-200 bg-stone-50 py-2 pl-8 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as
                | "All"
                | Status
              )
            }
            className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          >
            <option value="All">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-3 font-medium">
                Donor
              </th>

              <th className="px-4 py-3 font-medium">
                Amount
              </th>

              <th className="px-4 py-3 font-medium">
                Purpose
              </th>

              <th className="px-4 py-3 font-medium">
                Payment
              </th>

              <th className="px-4 py-3 font-medium">
                Transaction ID
              </th>

              <th className="px-4 py-3 font-medium">
                Date
              </th>

              <th className="px-4 py-3 font-medium">
                Status
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => {
              const rowId =
                row._id ||
                row.id ||
                "";

              const status =
                normalizeStatus(
                  row.status
                );

              return (
                <tr
                  key={rowId}
                  className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-stone-900">
                        {getDonationName(
                          row
                        )}
                      </p>

                      {row.kmrfId && (
                        <p className="mt-0.5 font-mono text-[10px] text-stone-400">
                          KMRF:{" "}
                          {row.kmrfId}
                        </p>
                      )}

                      {row.email && (
                        <p className="mt-0.5 text-[10px] text-stone-400">
                          {row.email}
                        </p>
                      )}

                      {row.phone && (
                        <p className="text-[10px] text-stone-400">
                          {row.phone}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-emerald-700">
                      {formatAmount(
                        row.amount
                      )}
                    </span>
                  </td>

                  <td className="max-w-[180px] truncate px-4 py-3 text-stone-600">
                    {row.purpose || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 font-medium capitalize text-stone-700">
                      <PaymentIcon
                        method={
                          row.paymentMethod ||
                          ""
                        }
                      />

                      {row.paymentMethod ||
                        "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-stone-500">
                      {row.transactionId ||
                        "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(
                      getDonationDate(
                        row
                      )
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge
                      status={status}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onView(row)
                        }
                        className="rounded-md border border-stone-200 p-1.5 text-stone-500 transition hover:bg-stone-100"
                        title="View details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            rowId,
                            "Approved"
                          )
                        }
                        disabled={
                          status ===
                          "Approved"
                        }
                        className="rounded-md border border-stone-200 p-1.5 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Approve"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            rowId,
                            "Rejected"
                          )
                        }
                        disabled={
                          status ===
                          "Rejected"
                        }
                        className="rounded-md border border-stone-200 p-1.5 text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Reject"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-stone-400"
                >
                  No donation payments
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Donation Detail Drawer                                                     */
/* -------------------------------------------------------------------------- */

function DonationDetailDrawer({
  record,
  onClose,
  onUpdateStatus,
}: {
  record: Donation | null;
  onClose: () => void;
  onUpdateStatus: (
    id: string,
    status: Status
  ) => void;
}) {
  if (!record) return null;

  const recordId =
    record._id ||
    record.id ||
    "";

  const status =
    normalizeStatus(record.status);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/30"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <div>
            <p className="font-mono text-xs text-stone-400">
              {recordId}
            </p>

            <h3 className="text-lg font-semibold text-stone-900">
              Donation Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Donation Amount
            </p>

            <p className="mt-1 text-3xl font-bold text-emerald-800">
              {formatAmount(
                record.amount
              )}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Donor Name
              </p>

              <p className="mt-1 font-medium text-stone-800">
                {getDonationName(
                  record
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                KMRF ID
              </p>

              <p className="mt-1 font-mono text-sm text-stone-800">
                {record.kmrfId ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Purpose
              </p>

              <p className="mt-1 text-stone-800">
                {record.purpose || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Payment Method
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium capitalize text-stone-800">
                <PaymentIcon
                  method={
                    record.paymentMethod ||
                    ""
                  }
                />

                {record.paymentMethod ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Transaction ID
              </p>

              <p className="mt-1 break-all font-mono text-sm font-semibold text-stone-800">
                {record.transactionId ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Sender Number
              </p>

              <p className="mt-1 text-stone-800">
                {record.senderNumber ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Email
              </p>

              <p className="mt-1 text-stone-800">
                {record.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Phone
              </p>

              <p className="mt-1 text-stone-800">
                {record.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Date
              </p>

              <p className="mt-1 text-stone-800">
                {formatDate(
                  getDonationDate(
                    record
                  )
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">
                Status
              </p>

              <div className="mt-1">
                <StatusBadge
                  status={status}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t border-stone-100 px-5 py-4">
          <button
            type="button"
            disabled={
              status === "Approved"
            }
            onClick={() =>
              onUpdateStatus(
                recordId,
                "Approved"
              )
            }
            className="flex-1 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Approve
          </button>

          <button
            type="button"
            disabled={
              status === "Rejected"
            }
            onClick={() =>
              onUpdateStatus(
                recordId,
                "Rejected"
              )
            }
            className="flex-1 rounded-lg border border-rose-200 px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Applications Table                                                         */
/* -------------------------------------------------------------------------- */

function ApplicationsTable({
  title,
  rows,
  onUpdateStatus,
  onView,
  extraColumn,
}: {
  title: string;
  rows: Scholarship[] | Sadka[];
  onUpdateStatus: (
    id: string,
    status: Status
  ) => void;
  onView: (
    row: Scholarship | Sadka
  ) => void;
  extraColumn: {
    label: string;
    key: "institution" | "reason";
  };
}) {
  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState<"All" | Status>("All");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesQuery =
        r.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        r.id
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );

      const matchesFilter =
        filter === "All" ||
        r.status === filter;

      return (
        matchesQuery &&
        matchesFilter
      );
    });
  }, [rows, query, filter]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-stone-900">
          {title}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search by name or ID"
              className="w-56 rounded-lg border border-stone-200 bg-stone-50 py-2 pl-8 pr-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as
                | "All"
                | Status
              )
            }
            className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          >
            <option value="All">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-3 font-medium">
                ID
              </th>

              <th className="px-4 py-3 font-medium">
                Name
              </th>

              <th className="px-4 py-3 font-medium">
                {extraColumn.label}
              </th>

              <th className="px-4 py-3 font-medium">
                Date
              </th>

              <th className="px-4 py-3 font-medium">
                Status
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60"
              >
                <td className="px-4 py-3 font-mono text-xs text-stone-500">
                  {row.id}
                </td>

                <td className="px-4 py-3 font-medium text-stone-900">
                  {row.name}
                </td>

                <td className="max-w-[220px] truncate px-4 py-3 text-stone-600">
                  {extraColumn.key === "institution"
                    ? "institution" in row
                      ? row.institution
                      : ""
                    : "reason" in row
                      ? row.reason
                      : ""}
                </td>

                <td className="px-4 py-3 text-stone-500">
                  {row.date}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge
                    status={row.status}
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onView(row)
                      }
                      className="rounded-md border border-stone-200 p-1.5 text-stone-500 hover:bg-stone-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onUpdateStatus(
                          row.id,
                          "Approved"
                        )
                      }
                      className="rounded-md border border-stone-200 p-1.5 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onUpdateStatus(
                          row.id,
                          "Rejected"
                        )
                      }
                      className="rounded-md border border-stone-200 p-1.5 text-rose-600 hover:bg-rose-50"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-stone-400"
                >
                  No applications
                  match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Content Manager                                                            */
/* -------------------------------------------------------------------------- */

function ContentManager({
  toast,
}: {
  toast: (
    message: string
  ) => void;
}) {
  const [hero, setHero] =
    useState({
      title:
        "Serving humanity through the light of Sufism",

      subtitle:
        "KMRF supports education, relief, and spiritual welfare across communities.",
    });

  const [about, setAbout] =
    useState(
      "Kutubul Masayekh Rahmania Foundation (KMRF) is a Sufi-based charitable organization dedicated to education, poverty relief, and community welfare, guided by the teachings of our elders."
    );

  const [programs, setPrograms] =
    useState([
      "Scholarship Fund",
      "Sadka-e-Zaria Relief",
      "Orphan Sponsorship",
      "Community Iftar",
    ]);

  const [newProgram, setNewProgram] =
    useState("");

  const addProgram = () => {
    if (!newProgram.trim()) return;

    setPrograms([
      ...programs,
      newProgram.trim(),
    ]);

    setNewProgram("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">
          Hero section
        </h2>

        <p className="mt-0.5 text-sm text-stone-500">
          This is the first thing
          visitors see on the homepage.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Title
            </label>

            <input
              value={hero.title}
              onChange={(e) =>
                setHero({
                  ...hero,
                  title: e.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Subtitle
            </label>

            <textarea
              value={hero.subtitle}
              onChange={(e) =>
                setHero({
                  ...hero,
                  subtitle:
                    e.target.value,
                })
              }
              rows={2}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">
          About us
        </h2>

        <textarea
          value={about}
          onChange={(e) =>
            setAbout(e.target.value)
          }
          rows={4}
          className="mt-3 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
        />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">
          Programs
        </h2>

        <ul className="mt-3 space-y-2">
          {programs.map(
            (program, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-sm"
              >
                <span className="text-stone-800">
                  {program}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPrograms(
                      programs.filter(
                        (_, idx) =>
                          idx !== i
                      )
                    )
                  }
                  className="text-stone-400 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            )
          )}
        </ul>

        <div className="mt-3 flex gap-2">
          <input
            value={newProgram}
            onChange={(e) =>
              setNewProgram(
                e.target.value
              )
            }
            placeholder="Add a new program"
            className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          />

          <button
            type="button"
            onClick={addProgram}
            className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            toast(
              "Content updated"
            )
          }
          className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Admin Dashboard                                                       */
/* -------------------------------------------------------------------------- */

export default function KmrfAdminDashboard() {
  const [section, setSection] =
    useState("overview");

  const [
    scholarship,
    setScholarship,
  ] = useState<Scholarship[]>([]);

  const [
    loadingScholarship,
    setLoadingScholarship,
  ] = useState(false);

  const [
    scholarshipError,
    setScholarshipError,
  ] = useState("");

  const [sadka, setSadka] =
    useState<Sadka[]>([]);

  const [
    loadingSadka,
    setLoadingSadka,
  ] = useState(false);

  const [
    sadkaError,
    setSadkaError,
  ] = useState("");

  const [
    donations,
    setDonations,
  ] = useState<Donation[]>([]);

  const [
    loadingDonations,
    setLoadingDonations,
  ] = useState(false);

  const [
    donationError,
    setDonationError,
  ] = useState("");

  const [
    detail,
    setDetail,
  ] = useState<
    Scholarship |
    Sadka |
    Donation |
    null
  >(null);

  const [
    detailType,
    setDetailType,
  ] = useState<
    | "scholarship"
    | "sadka"
    | "donation"
    | null
  >(null);

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    toastMsg,
    setToastMsg,
  ] = useState("");

  /* ---------------------------------------------------------------------- */
  /* Fetch Scholarship                                                       */
  /* ---------------------------------------------------------------------- */

  const fetchScholarship =
    async () => {
      try {
        setLoadingScholarship(true);
        setScholarshipError("");

        setScholarship([]);
      } catch (err) {
        console.error(
          "Fetch scholarship error:",
          err
        );

        setScholarshipError(
          err instanceof Error
            ? err.message
            : "Scholarship load করতে সমস্যা হয়েছে।"
        );
      } finally {
        setLoadingScholarship(
          false
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Fetch Sadka                                                             */
  /* ---------------------------------------------------------------------- */

  const fetchSadka =
    async () => {
      try {
        setLoadingSadka(true);
        setSadkaError("");

        setSadka([]);
      } catch (err) {
        console.error(
          "Fetch sadka error:",
          err
        );

        setSadkaError(
          err instanceof Error
            ? err.message
            : "Sadka load করতে সমস্যা হয়েছে।"
        );
      } finally {
        setLoadingSadka(false);
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Fetch Donations                                                         */
  /* ---------------------------------------------------------------------- */

  const fetchDonations =
    async () => {
      try {
        setLoadingDonations(true);
        setDonationError("");

        const res = await fetch(
          `${getApiUrl()}/donations`,
          {
            cache: "no-store",
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
            "Donation data load করা যায়নি।"
          );
        }

        const list =
          Array.isArray(
            data?.donations
          )
            ? data.donations
            : Array.isArray(
              data?.data
            )
              ? data.data
              : Array.isArray(data)
                ? data
                : [];

        setDonations(
          list.map(mapDonation)
        );
      } catch (err) {
        console.error(
          "Fetch donations error:",
          err
        );

        setDonations([]);
        setDonationError("Backend server unavailable.");
      } finally {
        setLoadingDonations(
          false
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Initial Load                                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    fetchScholarship();
    fetchSadka();
    fetchDonations();
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Toast                                                                   */
  /* ---------------------------------------------------------------------- */

  const showToast = (
    message: string
  ) => {
    setToastMsg(message);

    setTimeout(() => {
      setToastMsg("");
    }, 2200);
  };

  /* ---------------------------------------------------------------------- */
  /* Scholarship Status                                                      */
  /* ---------------------------------------------------------------------- */

  const updateScholarshipStatus =
    async (
      id: string,
      status: Status
    ) => {
      try {
        const res = await fetch(
          `${getApiUrl()}/scholarship/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
            "Status update failed"
          );
        }

        setScholarship(
          (prev) =>
            prev.map((r) =>
              r.id === id
                ? {
                  ...r,
                  status,
                }
                : r
            )
        );

        setDetail(null);

        showToast(
          `Scholarship ${status.toLowerCase()} হয়েছে`
        );
      } catch (err) {
        console.error(err);

        showToast(
          "Scholarship status update করতে সমস্যা হয়েছে।"
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Sadka Status                                                            */
  /* ---------------------------------------------------------------------- */

  const updateSadkaStatus =
    async (
      id: string,
      status: Status
    ) => {
      try {
        const res = await fetch(
          `${getApiUrl()}/sadka/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
            "Status update failed"
          );
        }

        setSadka(
          (prev) =>
            prev.map((r) =>
              r.id === id
                ? {
                  ...r,
                  status,
                }
                : r
            )
        );

        setDetail(null);

        showToast(
          `Sadka ${status.toLowerCase()} হয়েছে`
        );
      } catch (err) {
        console.error(err);

        showToast(
          "Sadka status update করতে সমস্যা হয়েছে।"
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Donation Status                                                         */
  /* ---------------------------------------------------------------------- */

  const updateDonationStatus =
    async (
      id: string,
      status: Status
    ) => {
      try {
        /*
          Frontend status
              Approved -> Backend verified
              Rejected -> Backend rejected
              Pending  -> Backend pending
        */

        let backendStatus =
          "pending";

        if (
          status === "Approved"
        ) {
          backendStatus = "verified";
        }

        if (
          status === "Rejected"
        ) {
          backendStatus = "rejected";
        }

        const res = await fetch(
          `${getApiUrl()}/donations/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status:
                backendStatus,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
            "Donation status update failed"
          );
        }

        setDonations(
          (prev) =>
            prev.map((donation) =>
              donation.id === id ||
                donation._id === id
                ? {
                  ...donation,
                  status,
                }
                : donation
            )
        );

        setDetail(null);

        showToast(
          `Donation ${status.toLowerCase()} হয়েছে`
        );
      } catch (err) {
        console.error(
          "Donation status update error:",
          err
        );

        showToast(
          err instanceof Error
            ? err.message
            : "Donation status update করতে সমস্যা হয়েছে।"
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* Donation Statistics                                                     */
  /* ---------------------------------------------------------------------- */

  const donationStats =
    useMemo(() => {
      const totalAmount =
        donations.reduce(
          (sum, d) =>
            sum +
            Number(
              d.amount || 0
            ),
          0
        );

      const pending =
        donations.filter(
          (d) =>
            normalizeStatus(
              d.status
            ) === "Pending"
        ).length;

      const approved =
        donations.filter(
          (d) =>
            normalizeStatus(
              d.status
            ) === "Approved"
        ).length;

      const rejected =
        donations.filter(
          (d) =>
            normalizeStatus(
              d.status
            ) === "Rejected"
        ).length;

      return {
        totalAmount,
        total:
          donations.length,
        pending,
        approved,
        rejected,
      };
    }, [donations]);

  /* ---------------------------------------------------------------------- */
  /* Application Statistics                                                  */
  /* ---------------------------------------------------------------------- */

  const pendingApplicationCount =
    scholarship.filter(
      (r) =>
        r.status === "Pending"
    ).length +
    sadka.filter(
      (r) =>
        r.status === "Pending"
    ).length;

  const approvedApplicationCount =
    scholarship.filter(
      (r) =>
        r.status === "Approved"
    ).length +
    sadka.filter(
      (r) =>
        r.status === "Approved"
    ).length;

  const totalApplicationCount =
    scholarship.length +
    sadka.length;

  /* ---------------------------------------------------------------------- */
  /* Approved Donation Amount                                                */
  /* ---------------------------------------------------------------------- */

  const approvedDonationAmount =
    donations
      .filter(
        (d) =>
          normalizeStatus(
            d.status
          ) === "Approved"
      )
      .reduce(
        (sum, d) =>
          sum +
          Number(
            d.amount || 0
          ),
        0
      );

  /* ---------------------------------------------------------------------- */
  /* Navigation                                                              */
  /* ---------------------------------------------------------------------- */

  const navItems = [
    {
      key: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      key: "donations",
      label: "Donations",
      icon: CircleDollarSign,
    },
    {
      key: "scholarship",
      label: "Scholarship",
      icon: GraduationCap,
    },
    {
      key: "sadka",
      label: "Sadka-e-Zaria",
      icon: HandHeart,
    },
    {
      key: "content",
      label: "Content",
      icon: FileEdit,
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-emerald-950 text-emerald-50 transition-transform duration-200 md:static md:translate-x-0 ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
          }`}
      >
        <div className="flex items-center gap-2 border-b border-emerald-900/60 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 text-amber-300">
            <Moon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide">
              KMRF Admin
            </p>

            <p className="text-[11px] text-emerald-300/70">
              Foundation dashboard
            </p>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map(
            ({
              key,
              label,
              icon: Icon,
            }) => (
              <button
                type="button"
                key={key}
                onClick={() => {
                  setSection(key);
                  setSidebarOpen(
                    false
                  );
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${section === key
                  ? "border-l-2 border-amber-400 bg-emerald-900/70 font-medium text-white"
                  : "border-l-2 border-transparent text-emerald-100/70 hover:bg-emerald-900/40"
                  }`}
              >
                <Icon className="h-4 w-4" />

                {label}

                {key ===
                  "overview" &&
                  pendingApplicationCount +
                  donationStats.pending >
                  0 && (
                    <span className="ml-auto rounded-full bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-950">
                      {pendingApplicationCount +
                        donationStats.pending}
                    </span>
                  )}

                {key ===
                  "donations" &&
                  donationStats.total >
                  0 && (
                    <span className="ml-auto rounded-full bg-emerald-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {
                        donationStats.total
                      }
                    </span>
                  )}
              </button>
            )
          )}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-emerald-900/60 px-5 py-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-emerald-100/70 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-stone-900/30 md:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Main */}

      <div className="flex-1">
        {/* Header */}

        <header className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 md:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1 text-sm text-stone-500">
              <span>
                KMRF Admin
              </span>

              <ChevronRight className="h-3.5 w-3.5" />

              <span className="font-medium text-stone-800">
                {
                  navItems.find(
                    (n) =>
                      n.key ===
                      section
                  )?.label
                }
              </span>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-800">
            SM
          </div>
        </header>

        <main className="p-5">
          {/* ========================================================== */}
          {/* OVERVIEW                                                   */}
          {/* ========================================================== */}

          {section ===
            "overview" && (
              <div className="space-y-5">
                {/* Application Stats */}

                <div>
                  <h2 className="mb-3 text-sm font-semibold text-stone-700">
                    Application Overview
                  </h2>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                      label="Total applications"
                      value={
                        totalApplicationCount
                      }
                      icon={
                        FileEdit
                      }
                    />

                    <StatCard
                      label="Pending review"
                      value={
                        pendingApplicationCount
                      }
                      sub={
                        pendingApplicationCount >
                          0
                          ? "Needs attention"
                          : "All caught up"
                      }
                      accent="text-amber-600"
                      icon={
                        RefreshCw
                      }
                    />

                    <StatCard
                      label="Approved"
                      value={
                        approvedApplicationCount
                      }
                      sub="Across both programs"
                      accent="text-emerald-600"
                      icon={
                        Check
                      }
                    />

                    <StatCard
                      label="Sadka-e-Zaria"
                      value={
                        sadka.length
                      }
                      sub="This cycle"
                      icon={
                        HandHeart
                      }
                    />
                  </div>
                </div>

                {/* Donation Stats */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-stone-700">
                      Donation Overview
                    </h2>

                    <button
                      type="button"
                      onClick={
                        fetchDonations
                      }
                      disabled={
                        loadingDonations
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50 disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${loadingDonations
                          ? "animate-spin"
                          : ""
                          }`}
                      />

                      Refresh
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                      label="Total donated"
                      value={formatAmount(
                        donationStats.totalAmount
                      )}
                      sub={`${donationStats.total} payments`}
                      accent="text-emerald-600"
                      icon={
                        CircleDollarSign
                      }
                    />

                    <StatCard
                      label="Total payments"
                      value={
                        donationStats.total
                      }
                      sub="All donations"
                      icon={
                        CreditCard
                      }
                    />

                    <StatCard
                      label="Pending donations"
                      value={
                        donationStats.pending
                      }
                      sub={
                        donationStats.pending >
                          0
                          ? "Needs review"
                          : "All caught up"
                      }
                      accent="text-amber-600"
                      icon={
                        RefreshCw
                      }
                    />

                    <StatCard
                      label="Approved donations"
                      value={
                        donationStats.approved
                      }
                      sub={`${formatAmount(
                        approvedDonationAmount
                      )} approved`}
                      accent="text-emerald-600"
                      icon={
                        Check
                      }
                    />
                  </div>
                </div>

                {/* Donation Error */}

                {donationError && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {donationError}

                    <button
                      type="button"
                      onClick={
                        fetchDonations
                      }
                      className="ml-3 underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {/* Recent Donations */}

                <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                    <div>
                      <h2 className="text-base font-semibold text-stone-900">
                        Recent Donations
                      </h2>

                      <p className="mt-0.5 text-xs text-stone-500">
                        Latest user payment
                        submissions
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSection(
                          "donations"
                        )
                      }
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      View all
                    </button>
                  </div>

                  {loadingDonations ? (
                    <div className="flex items-center justify-center px-5 py-10 text-sm text-stone-400">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                      donations...
                    </div>
                  ) : donations.length ===
                    0 ? (
                    <div className="px-5 py-10 text-center text-sm text-stone-400">
                      No donation
                      payment found.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-50">
                      {[
                        ...donations,
                      ]
                        .sort(
                          (a, b) =>
                            new Date(
                              getDonationDate(
                                b
                              )
                            ).getTime() -
                            new Date(
                              getDonationDate(
                                a
                              )
                            ).getTime()
                        )
                        .slice(0, 5)
                        .map(
                          (
                            donation
                          ) => {
                            const id =
                              donation._id ||
                              donation.id ||
                              "";

                            return (
                              <button
                                type="button"
                                key={id}
                                onClick={() => {
                                  setDetail(
                                    donation
                                  );

                                  setDetailType(
                                    "donation"
                                  );
                                }}
                                className="w-full px-5 py-4 text-left transition hover:bg-stone-50"
                              >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                                      <CircleDollarSign className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-semibold text-stone-800">
                                        {getDonationName(
                                          donation
                                        )}
                                      </p>

                                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-stone-400">
                                        <span className="truncate">
                                          {
                                            donation.purpose
                                          }
                                        </span>

                                        <span>
                                          ·
                                        </span>

                                        <span className="truncate">
                                          {formatDate(
                                            getDonationDate(
                                              donation
                                            )
                                          )}
                                        </span>
                                      </div>

                                      {donation.transactionId && (
                                        <p className="mt-0.5 truncate font-mono text-[10px] text-stone-400">
                                          TXN:{" "}
                                          {
                                            donation.transactionId
                                          }
                                        </p>
                                      )}

                                      {(donation.email ||
                                        donation.phone) && (
                                          <p className="mt-0.5 truncate text-[10px] text-stone-400">
                                            {donation.email && (
                                              <span>
                                                {
                                                  donation.email
                                                }
                                              </span>
                                            )}

                                            {donation.email &&
                                              donation.phone && (
                                                <span>
                                                  {" "}
                                                  ·{" "}
                                                </span>
                                              )}

                                            {donation.phone && (
                                              <span>
                                                {
                                                  donation.phone
                                                }
                                              </span>
                                            )}
                                          </p>
                                        )}
                                    </div>
                                  </div>

                                  <div className="ml-auto flex shrink-0 items-center gap-3">
                                    <span className="text-sm font-bold text-emerald-700">
                                      {formatAmount(
                                        donation.amount
                                      )}
                                    </span>

                                    <StatusBadge
                                      status={normalizeStatus(
                                        donation.status
                                      )}
                                    />
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
                    </div>
                  )}
                </div>

                {/* Recent Applications */}

                <div className="rounded-xl border border-stone-200 bg-white">
                  <div className="border-b border-stone-100 px-5 py-4">
                    <h2 className="text-base font-semibold text-stone-900">
                      Recent Applications
                    </h2>
                  </div>

                  <ul className="divide-y divide-stone-50">
                    {[
                      ...scholarship,
                      ...sadka,
                    ]
                      .sort(
                        (a, b) =>
                          new Date(
                            b.date
                          ).getTime() -
                          new Date(
                            a.date
                          ).getTime()
                      )
                      .slice(0, 5)
                      .map((r) => (
                        <li
                          key={r.id}
                          className="flex items-center justify-between px-5 py-3 text-sm"
                        >
                          <div>
                            <p className="font-medium text-stone-800">
                              {r.name}
                            </p>

                            <p className="text-xs text-stone-400">
                              {r.id} ·{" "}
                              {r.date}
                            </p>
                          </div>

                          <StatusBadge
                            status={
                              r.status
                            }
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

          {/* ========================================================== */}
          {/* DONATIONS                                                   */}
          {/* ========================================================== */}

          {section ===
            "donations" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <StatCard
                    label="Total donated"
                    value={formatAmount(
                      donationStats.totalAmount
                    )}
                    icon={
                      CircleDollarSign
                    }
                  />

                  <StatCard
                    label="Payments"
                    value={
                      donationStats.total
                    }
                    icon={
                      CreditCard
                    }
                  />

                  <StatCard
                    label="Pending"
                    value={
                      donationStats.pending
                    }
                    accent="text-amber-600"
                    icon={
                      RefreshCw
                    }
                  />

                  <StatCard
                    label="Approved"
                    value={
                      donationStats.approved
                    }
                    accent="text-emerald-600"
                    icon={
                      Check
                    }
                  />
                </div>

                {donationError && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {donationError}
                  </div>
                )}

                {loadingDonations ? (
                  <div className="flex items-center justify-center py-10 text-stone-400">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                    donations...
                  </div>
                ) : (
                  <DonationsTable
                    rows={donations}
                    onUpdateStatus={
                      updateDonationStatus
                    }
                    onView={(row) => {
                      setDetail(
                        row
                      );

                      setDetailType(
                        "donation"
                      );
                    }}
                  />
                )}
              </div>
            )}

          {/* ========================================================== */}
          {/* SCHOLARSHIP                                               */}
          {/* ========================================================== */}

          {section ===
            "scholarship" && (
              <div className="space-y-4">
                {scholarshipError && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {
                      scholarshipError
                    }
                  </div>
                )}

                {loadingScholarship ? (
                  <div className="flex items-center justify-center py-10 text-stone-400">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                    scholarship...
                  </div>
                ) : (
                  <ApplicationsTable
                    title="Scholarship applications"
                    rows={
                      scholarship
                    }
                    extraColumn={{
                      label: "Institution",
                      key: "institution",
                    }}
                    onUpdateStatus={
                      updateScholarshipStatus
                    }
                    onView={(row) => {
                      setDetail(
                        row
                      );

                      setDetailType(
                        "scholarship"
                      );
                    }}
                  />
                )}
              </div>
            )}

          {/* ========================================================== */}
          {/* SADKA                                                     */}
          {/* ========================================================== */}

          {section ===
            "sadka" && (
              <div className="space-y-4">
                {sadkaError && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {sadkaError}
                  </div>
                )}

                {loadingSadka ? (
                  <div className="flex items-center justify-center py-10 text-stone-400">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading Sadka
                    requests...
                  </div>
                ) : (
                  <ApplicationsTable
                    title="Sadka-e-Zaria requests"
                    rows={sadka}
                    extraColumn={{
                      label: "Reason",
                      key: "reason",
                    }}
                    onUpdateStatus={
                      updateSadkaStatus
                    }
                    onView={(row) => {
                      setDetail(
                        row
                      );

                      setDetailType(
                        "sadka"
                      );
                    }}
                  />
                )}
              </div>
            )}

          {/* ========================================================== */}
          {/* CONTENT                                                    */}
          {/* ========================================================== */}

          {section ===
            "content" && (
              <ContentManager
                toast={
                  showToast
                }
              />
            )}

          {/* ========================================================== */}
          {/* SETTINGS                                                   */}
          {/* ========================================================== */}

          {section ===
            "settings" && (
              <div className="rounded-xl border border-stone-200 bg-white p-5">
                <h2 className="text-base font-semibold text-stone-900">
                  Admin profile
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Basic settings for
                  this dashboard.
                </p>

                <div className="mt-4 grid max-w-md grid-cols-1 gap-3">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Name
                    </label>

                    <input
                      defaultValue="Shimul Mia"
                      className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Email
                    </label>

                    <input
                      defaultValue="admin@kmrf.org"
                      className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        "Profile updated"
                      )
                    }
                    className="mt-2 w-fit rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* DONATION DETAIL                                              */}
      {/* ============================================================ */}

      {detail &&
        detailType ===
        "donation" && (
          <DonationDetailDrawer
            record={
              detail as Donation
            }
            onClose={() =>
              setDetail(null)
            }
            onUpdateStatus={
              updateDonationStatus
            }
          />
        )}

      {/* ============================================================ */}
      {/* SCHOLARSHIP / SADKA DETAIL                                   */}
      {/* ============================================================ */}

      {detail &&
        detailType !==
        "donation" && (
          <div
            className="fixed inset-0 z-40 flex justify-end bg-stone-900/30"
            onClick={() =>
              setDetail(null)
            }
          >
            <div
              className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                <div>
                  <p className="font-mono text-xs text-stone-400">
                    {
                      (
                        detail as
                        | Scholarship
                        | Sadka
                      ).id
                    }
                  </p>

                  <h3 className="text-lg font-semibold text-stone-900">
                    {
                      (
                        detail as
                        | Scholarship
                        | Sadka
                      ).name
                    }
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDetail(null)
                  }
                  className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    {detailType ===
                      "scholarship"
                      ? "Institution"
                      : "Reason"}
                  </p>

                  <p className="mt-1 text-stone-800">
                    {detailType ===
                      "scholarship"
                      ? (
                        detail as Scholarship
                      ).institution
                      : (
                        detail as Sadka
                      ).reason}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Email
                  </p>

                  <p className="mt-1 text-stone-800">
                    {
                      (
                        detail as
                        | Scholarship
                        | Sadka
                      ).email
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Phone
                  </p>

                  <p className="mt-1 text-stone-800">
                    {
                      (
                        detail as
                        | Scholarship
                        | Sadka
                      ).phone
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Submitted
                  </p>

                  <p className="mt-1 text-stone-800">
                    {
                      (
                        detail as
                        | Scholarship
                        | Sadka
                      ).date
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Current status
                  </p>

                  <div className="mt-1">
                    <StatusBadge
                      status={
                        (
                          detail as
                          | Scholarship
                          | Sadka
                        ).status
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 border-t border-stone-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      detailType ===
                      "scholarship"
                    ) {
                      updateScholarshipStatus(
                        (
                          detail as Scholarship
                        ).id,
                        "Approved"
                      );
                    } else {
                      updateSadkaStatus(
                        (
                          detail as Sadka
                        ).id,
                        "Approved"
                      );
                    }
                  }}
                  className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      detailType ===
                      "scholarship"
                    ) {
                      updateScholarshipStatus(
                        (
                          detail as Scholarship
                        ).id,
                        "Rejected"
                      );
                    } else {
                      updateSadkaStatus(
                        (
                          detail as Sadka
                        ).id,
                        "Rejected"
                      );
                    }
                  }}
                  className="flex-1 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Toast */}

      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-[60] rounded-lg bg-stone-900 px-4 py-2.5 text-sm text-white shadow-lg">
          {toastMsg}
        </div>
      )}
    </div>
  );
}