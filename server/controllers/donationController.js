import pool from "../config/db.js";

const allowedPaymentMethods = [
  "bkash",
  "nagad",
  "bank",
  "cash",
];

const allowedStatuses = [
  "pending",
  "verified",
  "rejected",
];

/* -------------------------------------------------------------------------- */
/* Create Donation                                                            */
/* -------------------------------------------------------------------------- */

export const createDonation = async (req, res) => {
  try {
    const {
      kmrfId,
      amount,
      purpose,
      paymentMethod,
      senderNumber,
      transactionId,
      anonymous,
    } = req.body;

    /* ------------------------------ Validation ----------------------------- */

    if (!kmrfId || !kmrfId.trim()) {
      return res.status(400).json({
        success: false,
        message: "KMRF ID is required.",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid donation amount is required.",
      });
    }

    if (!purpose || !purpose.trim()) {
      return res.status(400).json({
        success: false,
        message: "Donation purpose is required.",
      });
    }

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    /* ------------------------- Check KMRF ID ------------------------- */

    const devoteeResult = await pool.query(
      `
        SELECT
          kmrf_id,
          name,
          email,
          contact_no
        FROM devotees
        WHERE kmrf_id = $1
        LIMIT 1
      `,
      [kmrfId.trim()]
    );

    if (devoteeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid KMRF ID. Devotee not found.",
      });
    }

    /* ----------------------- Transaction Validation ----------------------- */

    if (
      paymentMethod === "bkash" ||
      paymentMethod === "nagad"
    ) {
      if (!transactionId || !transactionId.trim()) {
        return res.status(400).json({
          success: false,
          message: "Transaction ID is required for bKash/Nagad.",
        });
      }
    }

    /* ---------------------------- Insert --------------------------------- */

    const query = `
      INSERT INTO donations (
        kmrf_id,
        amount,
        purpose,
        payment_method,
        sender_number,
        transaction_id,
        anonymous
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      kmrfId.trim(),
      Number(amount),
      purpose.trim(),
      paymentMethod,
      senderNumber?.trim() || null,
      transactionId
        ? transactionId.trim().toUpperCase()
        : null,
      Boolean(anonymous),
    ];

    const result = await pool.query(query, values);

    const donation = result.rows[0];
    const devotee = devoteeResult.rows[0];

    /* ------------------------- Response ---------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Donation submitted successfully.",
      donation: {
        id: donation.id,
        kmrfId: donation.kmrf_id,

        // Anonymous হলে frontend চাইলে নাম hide করতে পারবে
        donorName: donation.anonymous
          ? null
          : devotee.name,

        amount: donation.amount,
        purpose: donation.purpose,
        paymentMethod: donation.payment_method,
        senderNumber: donation.sender_number,
        transactionId: donation.transaction_id,
        anonymous: donation.anonymous,
        status: donation.status,
        createdAt: donation.created_at,
        updatedAt: donation.updated_at,

        email: devotee.email,
        phone: devotee.contact_no,
      },
    });
  } catch (error) {
    console.error("Create donation error:", error);

    /* ---------------------- Duplicate transaction ----------------------- */

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "এই Transaction ID ইতোমধ্যে ব্যবহার করা হয়েছে।",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Donation submit করতে সমস্যা হয়েছে।",
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Donations                                                          */
/* -------------------------------------------------------------------------- */

export const getDonations = async (req, res) => {
  try {
    const { kmrfId } = req.query;

    let query = `
      SELECT
        d.id,

        d.kmrf_id AS "kmrfId",

        CASE
          WHEN d.anonymous = TRUE THEN NULL
          ELSE v.name
        END AS "donorName",

        d.amount,

        d.purpose,

        d.payment_method AS "paymentMethod",

        d.sender_number AS "senderNumber",

        d.transaction_id AS "transactionId",

        d.anonymous,

        d.status,

        d.created_at AS "createdAt",

        d.updated_at AS "updatedAt",

        v.email AS "email",

        v.contact_no AS "phone"

      FROM donations d

      LEFT JOIN devotees v
        ON d.kmrf_id = v.kmrf_id
    `;

    const values = [];

    /* ------------------------- KMRF ID Filter ----------------------------- */

    if (kmrfId && kmrfId.trim()) {
      query += `
        WHERE d.kmrf_id = $1
      `;

      values.push(kmrfId.trim());
    }

    /* --------------------------- Order ----------------------------------- */

    query += `
      ORDER BY d.created_at DESC
    `;

    const result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      donations: result.rows,
    });
  } catch (error) {
    console.error("Get donations error:", error);

    return res.status(500).json({
      success: false,
      message: "Donations load করতে সমস্যা হয়েছে।",
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Donation By ID                                                         */
/* -------------------------------------------------------------------------- */

export const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        d.id,

        d.kmrf_id AS "kmrfId",

        CASE
          WHEN d.anonymous = TRUE THEN NULL
          ELSE v.name
        END AS "donorName",

        d.amount,

        d.purpose,

        d.payment_method AS "paymentMethod",

        d.sender_number AS "senderNumber",

        d.transaction_id AS "transactionId",

        d.anonymous,

        d.status,

        d.created_at AS "createdAt",

        d.updated_at AS "updatedAt",

        v.email AS "email",

        v.contact_no AS "phone"

      FROM donations d

      LEFT JOIN devotees v
        ON d.kmrf_id = v.kmrf_id

      WHERE d.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      donation: result.rows[0],
    });
  } catch (error) {
    console.error("Get donation error:", error);

    return res.status(500).json({
      success: false,
      message: "Donation load করতে সমস্যা হয়েছে।",
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Donation Status                                                     */
/* -------------------------------------------------------------------------- */

export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    /* --------------------------- Validation ------------------------------- */

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid donation status. Use pending, verified or rejected.",
      });
    }

    /* ----------------------------- Update -------------------------------- */

    const query = `
      UPDATE donations

      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP

      WHERE id = $2

      RETURNING *
    `;

    const result = await pool.query(query, [
      status,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    const donation = result.rows[0];

    /* ----------------------- Get Devotee Info ----------------------------- */

    const devoteeResult = await pool.query(
      `
        SELECT
          name,
          email,
          contact_no
        FROM devotees
        WHERE kmrf_id = $1
        LIMIT 1
      `,
      [donation.kmrf_id]
    );

    const devotee = devoteeResult.rows[0] || null;

    return res.status(200).json({
      success: true,
      message: "Donation status updated.",

      donation: {
        id: donation.id,
        kmrfId: donation.kmrf_id,

        donorName:
          donation.anonymous
            ? null
            : devotee?.name || null,

        amount: donation.amount,
        purpose: donation.purpose,
        paymentMethod: donation.payment_method,
        senderNumber: donation.sender_number,
        transactionId: donation.transaction_id,
        anonymous: donation.anonymous,

        status: donation.status,

        createdAt: donation.created_at,
        updatedAt: donation.updated_at,

        email: devotee?.email || null,
        phone: devotee?.contact_no || null,
      },
    });
  } catch (error) {
    console.error("Update donation status error:", error);

    return res.status(500).json({
      success: false,
      message: "Status update করতে সমস্যা হয়েছে।",
    });
  }
};