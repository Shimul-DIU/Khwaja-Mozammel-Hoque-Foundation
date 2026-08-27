import pool from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";

const toInteger = (value) => {
  if (value === "" || value === undefined || value === null) {
    return 0;
  }

  const number = Number(value);

  return Number.isNaN(number) ? 0 : number;
};

const toBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  return value === true || value === "true";
};

// Accepts a real array, a JSON-stringified array (sent via FormData),
// or nothing — always returns a plain JS array for pg to serialize
// into a Postgres array literal.
const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};


/*
|--------------------------------------------------------------------------
| CREATE DEVOTEE
|--------------------------------------------------------------------------
*/

export const createDevotee = asyncHandler(async (req, res) => {
  const {
    kmrfId,
    purpose,
    region,
    designation,

    name,
    fatherName,
    spouseName,

    country,
    division,
    district,
    ps,
    union,
    po,
    postCode,
    village,
    street,
    dob,

    religion,
    bloodGroup,
    profession,
    nationality,
    email,
    contactNo,

    idType,
    idNumber,

    gender,
    maritalStatus,

    sonCount,
    daughterCount,

    widow,
    widower,
    divorced,
    passedAway,
    securityVolunteer,

    education,

    followerMozammel,
    followerYunus,
    otherNesbot,
    otherNesbotDetail,

    joiningDate,

    joinSadka,

    khademName,
    coordinatorName,
  } = req.body;

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "নাম আবশ্যক।",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Photo
  |--------------------------------------------------------------------------
  */

  const photoUrl = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL INSERT
  |--------------------------------------------------------------------------
  */

  const query = `
    INSERT INTO devotees (
      purpose,
      region,
      designation,

      name,
      father_name,
      spouse_name,

      photo_url,

      country,
      division,
      district,
      ps,
      union,
      po,
      post_code,
      village,
      street,
      dob,

      religion,
      blood_group,
      profession,
      nationality,
      email,
      contact_no,

      id_type,
      id_number,

      gender,
      marital_status,

      son_count,
      daughter_count,

      widow,
      widower,
      divorced,
      passed_away,
      security_volunteer,

      education,

      follower_mozammel,
      follower_yunus,
      other_nesbot,
      other_nesbot_detail,

      joining_date,

      join_sadka,

      khadem_name,
      coordinator_name,

      kmrf_id
    )

    VALUES (
      $1, $2, $3,
      $4, $5, $6,
      $7,
      $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
      $18, $19, $20, $21, $22, $23,
      $24, $25,
      $26, $27,
      $28, $29,
      $30, $31, $32, $33, $34,
      $35,
      $36, $37, $38, $39,
      $40,
      $41,
      $42, $43,
      $44
    )

    RETURNING *;
  `;

  const values = [
    purpose || null,
    region || null,
    designation || null,

    name.trim(),
    fatherName || null,
    spouseName || null,

    photoUrl,

    country || "বাংলাদেশ",
    division || null,
    district || null,
    ps || null,
    union || null,
    po || null,
    postCode || null,
    village || null,
    street || null,
    parseArrayField(dob),

    religion || null,
    bloodGroup || null,
    profession || null,
    nationality || "বাংলাদেশি",
    email || null,
    contactNo || null,

    idType || "",
    parseArrayField(idNumber),

    gender || "",
    maritalStatus || "",

    toInteger(sonCount),
    toInteger(daughterCount),

    toBoolean(widow),
    toBoolean(widower),
    toBoolean(divorced),
    toBoolean(passedAway),
    toBoolean(securityVolunteer),

    education || "",

    toBoolean(followerMozammel),
    toBoolean(followerYunus),
    toBoolean(otherNesbot),
    otherNesbotDetail || null,

    joiningDate || null,

    toBoolean(joinSadka),

    khademName || null,
    coordinatorName || null,

    parseArrayField(kmrfId),
  ];

  const result = await pool.query(query, values);

  const devotee = result.rows[0];

  return res.status(201).json({
    success: true,
    message: "ভক্তের নিবন্ধন সফলভাবে সংরক্ষণ করা হয়েছে।",
    data: devotee,
  });
});


/*
|--------------------------------------------------------------------------
| GET ALL DEVOTEES
|--------------------------------------------------------------------------
*/

export const getAllDevotees = asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT *
    FROM devotees
    ORDER BY created_at DESC
  `);

  return res.status(200).json({
    success: true,
    count: result.rows.length,
    data: result.rows,
  });
});


/*
|--------------------------------------------------------------------------
| GET SINGLE DEVOTEE
|--------------------------------------------------------------------------
*/

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `
      SELECT *
      FROM devotees
      WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "ভক্তের তথ্য পাওয়া যায়নি।",
    });
  }

  return res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});


/*
|--------------------------------------------------------------------------
| UPDATE DEVOTEE
|--------------------------------------------------------------------------
*/

export const updateDevotee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    kmrfId,
    purpose,
    region,
    designation,
    name,
    fatherName,
    spouseName,
    country,
    division,
    district,
    ps,
    union,
    po,
    postCode,
    village,
    street,
    dob,
    religion,
    bloodGroup,
    profession,
    nationality,
    email,
    contactNo,
    idType,
    idNumber,
    gender,
    maritalStatus,
    sonCount,
    daughterCount,
    widow,
    widower,
    divorced,
    passedAway,
    securityVolunteer,
    education,
    followerMozammel,
    followerYunus,
    otherNesbot,
    otherNesbotDetail,
    joiningDate,
    joinSadka,
    khademName,
    coordinatorName,
  } = req.body;

  const existing = await pool.query(
    `SELECT * FROM devotees WHERE id = $1`,
    [id]
  );

  if (existing.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "ভক্তের তথ্য পাওয়া যায়নি।",
    });
  }

  let photoUrl = existing.rows[0].photo_url;

  if (req.file) {
    photoUrl = `/uploads/${req.file.filename}`;
  }

  const query = `
    UPDATE devotees
    SET
      purpose = $1,
      region = $2,
      designation = $3,

      name = $4,
      father_name = $5,
      spouse_name = $6,

      photo_url = $7,

      country = $8,
      division = $9,
      district = $10,
      ps = $11,
      union = $12,
      po = $13,
      post_code = $14,
      village = $15,
      street = $16,
      dob = $17,

      religion = $18,
      blood_group = $19,
      profession = $20,
      nationality = $21,
      email = $22,
      contact_no = $23,

      id_type = $24,
      id_number = $25,

      gender = $26,
      marital_status = $27,

      son_count = $28,
      daughter_count = $29,

      widow = $30,
      widower = $31,
      divorced = $32,
      passed_away = $33,
      security_volunteer = $34,

      education = $35,

      follower_mozammel = $36,
      follower_yunus = $37,
      other_nesbot = $38,
      other_nesbot_detail = $39,

      joining_date = $40,

      join_sadka = $41,

      khadem_name = $42,
      coordinator_name = $43,

      kmrf_id = $44

    WHERE id = $45

    RETURNING *;
  `;

  const values = [
    purpose || null,
    region || null,
    designation || null,

    name?.trim() || null,
    fatherName || null,
    spouseName || null,

    photoUrl,

    country || "বাংলাদেশ",
    division || null,
    district || null,
    ps || null,
    union || null,
    po || null,
    postCode || null,
    village || null,
    street || null,
    parseArrayField(dob),

    religion || null,
    bloodGroup || null,
    profession || null,
    nationality || "বাংলাদেশি",
    email || null,
    contactNo || null,

    idType || "",
    parseArrayField(idNumber),

    gender || "",
    maritalStatus || "",

    toInteger(sonCount),
    toInteger(daughterCount),

    toBoolean(widow),
    toBoolean(widower),
    toBoolean(divorced),
    toBoolean(passedAway),
    toBoolean(securityVolunteer),

    education || "",

    toBoolean(followerMozammel),
    toBoolean(followerYunus),
    toBoolean(otherNesbot),
    otherNesbotDetail || null,

    joiningDate || null,

    toBoolean(joinSadka),

    khademName || null,
    coordinatorName || null,

    parseArrayField(kmrfId),

    id,
  ];

  const result = await pool.query(query, values);

  return res.status(200).json({
    success: true,
    message: "তথ্য সফলভাবে আপডেট করা হয়েছে।",
    data: result.rows[0],
  });
});


/*
|--------------------------------------------------------------------------
| DELETE DEVOTEE
|--------------------------------------------------------------------------
*/

export const deleteDevotee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `
      DELETE FROM devotees
      WHERE id = $1
      RETURNING id
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "ভক্তের তথ্য পাওয়া যায়নি।",
    });
  }

  return res.status(200).json({
    success: true,
    message: "ভক্তের তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
  });
});