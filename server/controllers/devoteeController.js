import pool from "../config/db.js";
import bcrypt from "bcrypt";

const parseArrayField = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => item !== null && item !== undefined && item !== "");
    return filtered.length > 0 ? filtered : null;
  }

  const values = String(value).split(",").map((item) => item.trim()).filter(Boolean);
  return values.length > 0 ? values : null;
};

const toInteger = (value) => {
  if (value === undefined || value === null || value === "") return 0;
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
};

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1" || value === 1) return true;
  return false;
};

export const createDevotee = async (req, res) => {
  try {
    const {
      purpose, region, designation, name, fatherName, spouseName, country, division,
      district, ps, union, po, postCode, village, street, dob, religion, bloodGroup,
      profession, nationality, email, password, contactNo, idType, idNumber, gender,
      maritalStatus, sonCount, daughterCount, widow, widower, divorced, passedAway,
      securityVolunteer, education, followerMozammel, followerYunus, otherNesbot,
      otherNesbotDetail, joiningDate, joinSadka, khademName, coordinatorName
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "নাম আবশ্যক।" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" });
    }

    const normalizedEmail = email?.trim().toLowerCase() || null;
    if (normalizedEmail) {
      const emailExists = await pool.query(`SELECT kmrf_id FROM devotees WHERE email = $1`, [normalizedEmail]);
      if (emailExists.rows.length > 0) {
        return res.status(409).json({ success: false, message: "এই Email দিয়ে ইতিমধ্যে একজন ভক্ত নিবন্ধিত আছেন।" });
      }
    }

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const hashedPassword = await bcrypt.hash(password, 12);

    const query = `
      INSERT INTO devotees (
        purpose, region, designation, name, father_name, spouse_name, photo_url,
        country, division, district, ps, union_name, po, post_code, village, street,
        dob, religion, blood_group, profession, nationality, email, password, contact_no,
        id_type, id_number, gender, marital_status, son_count, daughter_count,
        widow, widower, divorced, passed_away, security_volunteer, education,
        follower_mozammel, follower_yunus, other_nesbot, other_nesbot_detail,
        joining_date, join_sadka, khadem_name, coordinator_name
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44
      ) RETURNING *;
    `;

    const values = [
      purpose || null, region || null, designation || null, name.trim(),
      fatherName || null, spouseName || null, photoUrl,
      country || "বাংলাদেশ", division || null, district || null, ps || null,
      union || null, po || null, postCode || null, village || null, street || null,
      parseArrayField(dob), religion || null, bloodGroup || null, profession || null,
      nationality || "বাংলাদেশি", normalizedEmail, hashedPassword, contactNo || null,
      idType || null, parseArrayField(idNumber), gender || null, maritalStatus || null,
      toInteger(sonCount), toInteger(daughterCount),
      toBoolean(widow), toBoolean(widower), toBoolean(divorced), toBoolean(passedAway),
      toBoolean(securityVolunteer), education || null,
      toBoolean(followerMozammel), toBoolean(followerYunus), toBoolean(otherNesbot),
      otherNesbotDetail || null, joiningDate || null, toBoolean(joinSadka),
      khademName || null, coordinatorName || null
    ];

    const result = await pool.query(query, values);
    const devotee = result.rows[0];
    delete devotee.password;

    return res.status(201).json({
      success: true,
      message: "ভক্তের নিবন্ধন সফলভাবে সংরক্ষণ করা হয়েছে।",
      data: devotee
    });
  } catch (error) {
    console.error("Create devotee error:", error);
    return res.status(500).json({
      success: false,
      message: "ভক্তের তথ্য সংরক্ষণ করতে সমস্যা হয়েছে।",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const loginDevotee = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const result = await pool.query(`SELECT * FROM devotees WHERE email = $1`, [normalizedEmail]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const devotee = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, devotee.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const kmrfId = devotee.kmrf_id;
    if (!kmrfId) {
      return res.status(500).json({ success: false, message: "প্রোফাইল আইডি পাওয়া যায়নি।" });
    }

    const { password: _, ...userData } = devotee;
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { ...userData, kmrf_id: kmrfId },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllDevotees = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM devotees ORDER BY created_at DESC`);
    const devotees = result.rows.map(({ password, ...rest }) => rest);
    return res.status(200).json({ success: true, count: devotees.length, data: devotees });
  } catch (error) {
    console.error("Get all devotees error:", error);
    return res.status(500).json({ success: false, message: "ভক্তদের তথ্য পাওয়া যায়নি।" });
  }
};

export const getSingleDevotee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || ["null", "undefined"].includes(String(id).toLowerCase())) {
      return res.status(400).json({ success: false, message: "ভক্তের আইডি প্রয়োজন।" });
    }

    const result = await pool.query(`SELECT * FROM devotees WHERE kmrf_id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "ভক্তের তথ্য পাওয়া যায়নি।" });
    }
    const { password, ...userData } = result.rows[0];
    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Get single devotee error:", error);
    return res.status(500).json({ success: false, message: "ভক্তের তথ্য পাওয়া যায়নি।" });
  }
};

export const updateDevotee = async (req, res) => {
  try {
    const { kmrfId } = req.params;
    const {
      purpose, region, designation, name, fatherName, spouseName, country, division,
      district, ps, union, po, postCode, village, street, dob, religion, bloodGroup,
      profession, nationality, email, contactNo, idType, idNumber, gender,
      maritalStatus, sonCount, daughterCount, widow, widower, divorced, passedAway,
      securityVolunteer, education, followerMozammel, followerYunus, otherNesbot,
      otherNesbotDetail, joiningDate, joinSadka, khademName, coordinatorName
    } = req.body;

    const existing = await pool.query(`SELECT * FROM devotees WHERE kmrf_id = $1`, [kmrfId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: "ভক্তের তথ্য পাওয়া যায়নি।" });
    }

    const normalizedEmail = email?.trim().toLowerCase() || null;
    if (normalizedEmail) {
      const emailExists = await pool.query(
        `SELECT kmrf_id FROM devotees WHERE email = $1 AND kmrf_id != $2`,
        [normalizedEmail, kmrfId]
      );
      if (emailExists.rows.length > 0) {
        return res.status(409).json({ success: false, message: "এই Email অন্য একজন ভক্ত ব্যবহার করছেন।" });
      }
    }

    let photoUrl = existing.rows[0].photo_url;
    if (req.file) photoUrl = `/uploads/${req.file.filename}`;

    const query = `
      UPDATE devotees SET
        purpose = $1, region = $2, designation = $3, name = $4, father_name = $5,
        spouse_name = $6, photo_url = $7, country = $8, division = $9, district = $10,
        ps = $11, union_name = $12, po = $13, post_code = $14, village = $15,
        street = $16, dob = $17, religion = $18, blood_group = $19, profession = $20,
        nationality = $21, email = $22, contact_no = $23, id_type = $24, id_number = $25,
        gender = $26, marital_status = $27, son_count = $28, daughter_count = $29,
        widow = $30, widower = $31, divorced = $32, passed_away = $33,
        security_volunteer = $34, education = $35, follower_mozammel = $36,
        follower_yunus = $37, other_nesbot = $38, other_nesbot_detail = $39,
        joining_date = $40, join_sadka = $41, khadem_name = $42, coordinator_name = $43
      WHERE kmrf_id = $44 RETURNING *;
    `;

    const values = [
      purpose || null, region || null, designation || null, name?.trim() || null,
      fatherName || null, spouseName || null, photoUrl,
      country || "বাংলাদেশ", division || null, district || null, ps || null,
      union || null, po || null, postCode || null, village || null, street || null,
      parseArrayField(dob), religion || null, bloodGroup || null, profession || null,
      nationality || "বাংলাদেশি", normalizedEmail, contactNo || null,
      idType || null, parseArrayField(idNumber), gender || null, maritalStatus || null,
      toInteger(sonCount), toInteger(daughterCount),
      toBoolean(widow), toBoolean(widower), toBoolean(divorced), toBoolean(passedAway),
      toBoolean(securityVolunteer), education || null,
      toBoolean(followerMozammel), toBoolean(followerYunus), toBoolean(otherNesbot),
      otherNesbotDetail || null, joiningDate || null, toBoolean(joinSadka),
      khademName || null, coordinatorName || null, kmrfId
    ];

    const result = await pool.query(query, values);
    const devotee = result.rows[0];
    delete devotee.password;

    return res.status(200).json({
      success: true,
      message: "তথ্য সফলভাবে আপডেট করা হয়েছে।",
      data: devotee
    });
  } catch (error) {
    console.error("Update devotee error:", error);
    return res.status(500).json({
      success: false,
      message: "ভক্তের তথ্য আপডেট করতে সমস্যা হয়েছে।",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const deleteDevotee = async (req, res) => {
  try {
    const { kmrfId } = req.params;
    const result = await pool.query(`DELETE FROM devotees WHERE kmrf_id = $1 RETURNING id`, [kmrfId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "ভক্তের তথ্য পাওয়া যায়নি।" });
    }
    return res.status(200).json({ success: true, message: "ভক্তের তথ্য সফলভাবে মুছে ফেলা হয়েছে।" });
  } catch (error) {
    console.error("Delete devotee error:", error);
    return res.status(500).json({ success: false, message: "ভক্তের তথ্য মুছে ফেলতে সমস্যা হয়েছে।" });
  }
};